import { createServerFn } from "@tanstack/react-start";
import {
  Octokit
} from "octokit";
import { z } from "zod";

export const getTauriReleaseInfo = createServerFn()
  .inputValidator(z.object({ owner: z.string(), repo: z.string() }))
  .handler(async ({ data }) => {
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

      return {
        versions: {
          version: versionsJson.version,
          notes: versionsJson.notes,
          pub_date: versionsJson.pub_date,
          platforms: platformsWithSizes
        },
      }
    } catch (error) {
      console.error('Failed to fetch release data:', error)
      // Fallback to empty data if API fails
      return {
        versions: {
          version: 'N/A',
          notes: '',
          pub_date: '',
          platforms: {}
        }
      }
    }
  })