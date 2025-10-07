import { createServerFn } from "@tanstack/react-start";
import {
  Octokit
} from "octokit";
import { z } from "zod";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly ttl: number;

  constructor(ttlMs: number = 30 * 60 * 1000) { // 30 minutes default
    this.ttl = ttlMs;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  // Optional: method to clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

const releaseInfoCache = new MemoryCache(30 * 60 * 1000); // 30 minutes

export const getTauriReleaseInfo = createServerFn()
  .inputValidator(z.object({ owner: z.string(), repo: z.string() }))
  .handler(async ({ data }) => {
    const cacheKey = `${data.owner}/${data.repo}`;

    // Try to get from cache first
    const cachedData = releaseInfoCache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const octokit = new Octokit()

    const versionLink = `https://github.com/${data.owner}/${data.repo}/releases/latest/download/latest.json`

    try {
      // Fetch the latest.json for platform URLs and version info
      const versionsResponse = await fetch(versionLink)
      const versionsJson = await versionsResponse.json() as {
        version: string
        notes: string,
        pub_date: string,
        platforms: {
          'darwin-aarch64': {
            url: string
          },
          'darwin-x86_64': {
            url: string
          },
        }
      }

      // Get the latest release from GitHub API to fetch asset sizes
      const { data: release } = await octokit.rest.repos.getLatestRelease({
        owner: data.owner,
        repo: data.repo
      })

      // Create a map of asset URLs to their sizes and names
      const assetSizeMap = new Map<string, { size: number; name: string }>()
      release.assets.forEach(asset => {
        assetSizeMap.set(asset.browser_download_url, {
          size: asset.size,
          name: asset.name
        })
      })

      // Combine platform URLs from latest.json with asset sizes from GitHub API
      const platformsWithSizes: Record<string, { url: string; size: number; name: string }> = {}

      Object.entries(versionsJson.platforms).forEach(([platform, info]) => {
        const assetInfo = assetSizeMap.get(info.url)
        platformsWithSizes[platform] = {
          url: info.url,
          size: assetInfo?.size || 0,
          name: assetInfo?.name || 'Unknown'
        }
      })

      const result = {
        versions: {
          version: versionsJson.version,
          notes: versionsJson.notes,
          pub_date: versionsJson.pub_date,
          platforms: platformsWithSizes
        },
      };

      // Cache the result
      releaseInfoCache.set(cacheKey, result);

      return result;
    } catch (error) {
      console.error('Failed to fetch release data:', error)
      // Fallback to empty data if API fails
      const fallbackResult = {
        versions: {
          version: 'N/A',
          notes: '',
          pub_date: '',
          platforms: {}
        }
      };

      // Cache the fallback result with a shorter TTL (5 minutes)
      releaseInfoCache.set(cacheKey, fallbackResult);

      return fallbackResult;
    }
  })