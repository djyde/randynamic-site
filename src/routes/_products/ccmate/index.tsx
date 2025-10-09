import { Highlighter } from '@/components/ui/highlighter'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router'
import { ChevronDownIcon, DownloadIcon } from 'lucide-react'
import { getTauriReleaseInfo } from '@/lib/actions'
import { RiBuildingLine, RiGithubLine, RiTwitterXLine } from 'react-icons/ri'
import screenshot1 from './images/screen-1.png'
import screenshot3 from './images/screen-3.png'
import screenshot2 from './images/screen-2.png'
import screenshot4 from './images/screen-4.png'
import screenshot5 from './images/screen-5.png'
import screenshot6 from './images/screen-6.png'
import iconPath from './icon.png'

import './main.css'

export const Route = createFileRoute('/_products/ccmate/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'CC Mate - GUI for Claude Code | Randynamic Studio',
      },
      {
        name: 'description',
        content: 'CC Mate is a GUI for Claude Code. It allows you to manage your Claude Code settings and MCP servers with a beautiful GUI.',
      },
      {
        name: 'keywords',
        content: 'ccmate, claude code, mcp, mcp server, mcp management, claude code settings, claude code config, claude code gui',
      },
      {
        property: 'og:title',
        content: 'CC Mate - GUI for Claude Code',
      },
      {
        property: 'og:description',
        content: 'CC Mate is a GUI for Claude Code. It allows you to manage your Claude Code settings with a beautiful GUI.',
      },
      {
        property: 'og:url',
        content: 'https://randynamic.org/ccmate',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'CC Mate - GUI for Claude Code',
      },
      {
        name: 'twitter:description',
        content: 'CC Mate is a GUI for Claude Code. It allows you to manage your Claude Code settings with a beautiful GUI.',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://randynamic.org/ccmate',
      },
    ],
  }),
  loader: async () => {
    const releaseInfo = await getTauriReleaseInfo({
      data: {
        owner: "djyde",
        repo: "ccmate-release"
      }
    })
    return {
      releaseInfo
    }
    // return {
    //   releaseInfo: {
    //     versions: {
    //       platforms: {
    //         'darwin-aarch64': {
    //           url: 'https://github.com/djyde/ccmate-release/releases/download/v1.0.0/ccmate-v1.0.0-arm64.dmg'
    //         }
    //       }
    //     }
    //   }
    // }
  }
})

const links = [
  {
    icon: <RiBuildingLine className="size-4" />,
    url: "/",
    label: "Randynamic Studio",
  },
  {
    icon: <RiTwitterXLine className="size-4" />,
    url: "https://x.com/randyloop",
  },
]

// Helper function to format file sizes
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

// Helper function to get platform display name
function getPlatformDisplayName(platform: string): string {
  switch (platform) {
    case 'darwin-aarch64':
      return 'macOS (Apple Silicon)'
    case 'darwin-x86_64':
      return 'macOS (Intel)'
    default:
      return platform
  }
}

// Platform selector component
function PlatformSelector() {
  const { releaseInfo } = useLoaderData({ from: '/_products/ccmate/' })
  const versions = releaseInfo.versions

  if (!versions.platforms || Object.keys(versions.platforms).length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="inline-flex items-center gap-2 bg-[#C15F3C] hover:bg-[#C15F3C]/90">
          <DownloadIcon className="size-4" />
          Download
          <ChevronDownIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-64">
        {Object.entries(versions.platforms).map(([platform, info]) => (
          <DropdownMenuItem key={platform} asChild>
            <a
              href={info.url}
              className="inline-flex w-full cursor-pointer items-center justify-between"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{getPlatformDisplayName(platform)}</span>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(info.size)}
                </span>
              </div>
              <DownloadIcon className="size-4" />
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


function RouteComponent() {
  return (
    <div className=''>
      <nav role="navigation" aria-label="Main navigation">
        <div className='px-4 max-w-[960px] mx-auto py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <img className='w-6 h-6 rounded-full' src={iconPath} alt="CC Mate logo" />
              <Link to="/ccmate" className='font-medium'>CC Mate</Link>
            </div>
            <div className='flex items-center gap-4'>
              {links.map((link) => (
                <Link
                  key={link.url}
                  to={link.url}
                  target={link.url.startsWith('http') ? '_blank' : '_self'}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors gap-2'
                  aria-label={link.label}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className='space-y-12 '>
        <header className='text-center text-4xl md:text-6xl font-bold pt-24 space-y-8 text-balance max-w-[960px] mx-auto'>
          <h1 className='text-balance'>
            Configure your <Highlighter color="#C15F3C" >
              <span className='text-zinc-50'>Claude Code</span>
            </Highlighter> without pain
          </h1>

          <p className='text-zinc-500 text-lg md:text-xl font-normal text-balance'>
            Manage your Claude Code on a beautiful GUI
          </p>
        </header>


        <section className='flex justify-center' aria-label="Download section">
          <div className='flex flex-col items-center gap-4'>
            <PlatformSelector />
            {/* <p className='text-sm text-gray-500'>
              It's free during beta
            </p> */}
          </div>
        </section>

        <div className='space-y-36 my-32'>
          <section className='flex flex-col md:flex-row px-8 md:px-0 max-w-[960px] mx-auto items-center gap-12' aria-label="Application screenshot">
            <div className='space-y-4 flex-1'>
              <h2 className='font-bold text-2xl'>Config switcher</h2>
              <p>
                You can create multiple configs and switch between them easily.
              </p>
            </div>
            <div className='flex-2'>
              <img
                src={screenshot1}
                className='w-[720px] max-w-full border-2 rounded-xl'
                alt="CC Mate application interface showing config switcher"
                loading="lazy"
              />
            </div>
          </section>

          <section className='flex flex-col px-8 md:px-0 max-w-[960px] mx-auto items-center md:flex-row-reverse justify-between gap-12' aria-label="Application screenshot">
            <div className='space-y-4 flex-1'>
              <h2 className='font-bold text-2xl'>Easy to config</h2>
              <p>
                Edit Claude Code settings with a GUI.
              </p>
              <p>
                Easily set up your own AI models for Claude Code.
              </p>
              <div>

              </div>
            </div>
            <div className='flex-2'>
              <img
                src={screenshot3}
                className='w-[720px] max-w-full border-2 rounded-xl'
                alt="CC Mate application interface showing easy to config"
                loading="lazy"
              />
            </div>
          </section>

          <section className='flex flex-col md:flex-row px-8 md:px-0 max-w-[960px] mx-auto items-center gap-12' aria-label="Application screenshot">
            <div className='space-y-4 flex-1'>
              <h2 className='font-bold text-2xl'>Usage monitor</h2>
              <p>
                Check the token usage of your Claude Code.
              </p>
            </div>
            <div className='flex-2'>
              <img
                src={screenshot6}
                className='w-[720px] max-w-full border-2 rounded-xl'
                alt="CC Mate application interface showing usage monitor"
                loading="lazy"
              />
            </div>
          </section>

          <section className='flex flex-col md:flex-row-reverse px-8 md:px-0 max-w-[960px] mx-auto items-center gap-12' aria-label="Application screenshot">
            <div className='space-y-4 flex-1'>
              <h2 className='font-bold text-2xl'>MCP Management</h2>
              <p>
                Manage your MCP servers in an easy way.
              </p>
            </div>
            <div className='flex-2'>
              <img
                src={screenshot5}
                className='w-[720px] max-w-full border-2 rounded-xl'
                alt="CC Mate application interface showing MCP management"
                loading="lazy"
              />
            </div>
          </section>


        </div>

        <section className='flex justify-center' aria-label="Download section">
          <div className='flex flex-col items-center gap-4'>
            <PlatformSelector />
            {/* <p className='text-sm text-gray-500'>
              It's free during beta
            </p> */}
          </div>
        </section>

        <footer className='py-12'>
          <div className='max-w-[960px] mx-auto text-center text-sm text-muted-foreground'>
            <p>
              Made with ❤️ by <Link to="/">Randynamic Studio</Link>
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}