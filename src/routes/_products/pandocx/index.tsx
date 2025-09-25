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
import { FaGithub } from 'react-icons/fa'
import { RiBuildingLine } from 'react-icons/ri'

export const Route = createFileRoute('/_products/pandocx/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'PandocX - Lightweight File Converter | Randynamic Studio',
      },
      {
        name: 'description',
        content: 'PandocX is a lightweight file converter for Markdown, Word, ePub, and more. Based on pandoc with a beautiful GUI. Convert files locally with ease.',
      },
      {
        name: 'keywords',
        content: 'file converter, pandoc, markdown, word, epub, document conversion, pandoc gui, markdown converter, file format converter',
      },
      {
        property: 'og:title',
        content: 'PandocX - Lightweight File Converter',
      },
      {
        property: 'og:description',
        content: 'PandocX is a lightweight file converter for Markdown, Word, ePub, and more. Based on pandoc with a beautiful GUI. Convert files locally with ease.',
      },
      {
        property: 'og:url',
        content: 'https://randynamic.org/pandocx',
      },
      {
        property: 'og:image',
        content: 'https://randynamic.org/images/pandocx-screenshot.png',
      },
      {
        property: 'og:image:alt',
        content: 'PandocX file converter application screenshot',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'PandocX - Lightweight File Converter',
      },
      {
        name: 'twitter:description',
        content: 'PandocX is a lightweight file converter for Markdown, Word, ePub, and more. Based on pandoc with a beautiful GUI.',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://randynamic.org/pandocx',
      },
    ],
  }),
  loader: async () => {
    const releaseInfo = await getTauriReleaseInfo({
      data: {
        versionLink: "https://github.com/djyde/PandocX/releases/latest/download/latest.json"
      }
    })
    return {
      releaseInfo
    }
  }
})

const iconPath = "/images/pandocx-icon.png"

const links = [
  {
    icon: <RiBuildingLine className="size-4" />,
    url: "/",
    label: "Randynamic Studio",
  },
  {
    icon: <FaGithub className="size-4" />,
    url: "https://github.com/djyde/PandocX",
    label: "Source",
  }
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
  const { releaseInfo } = useLoaderData({ from: '/_products/pandocx/' })
  const versions = releaseInfo.versions

  if (!versions.platforms || Object.keys(versions.platforms).length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="inline-flex items-center gap-2">
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
    <div>
      <nav role="navigation" aria-label="Main navigation">
        <div className='px-4 md:px-48 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <img className='w-6 h-6 rounded-full' src={iconPath} alt="PandocX logo" />
              <Link to="/pandocx" className='font-medium'>PandocX</Link>
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

      <main className='space-y-12'>
        <header className='text-center text-4xl font-bold pt-24 space-y-4 text-balance'>
          <h1>
            A lightweight <Highlighter action="highlight" color="green">
              <span className='text-zinc-50 p-2'>
                file converter
              </span>
            </Highlighter>
          </h1>

          <p className='text-zinc-500 text-sm font-normal text-balance'>
            Convert files between Markdown, Word, ePub, and more. Based on pandoc. All running locally.
          </p>
        </header>

        <section className='flex justify-center' aria-label="Application screenshot">
          <img 
            src="/images/pandocx-screenshot.png" 
            className='w-[720px] max-w-full' 
            alt="PandocX application interface showing file conversion options and drag-and-drop functionality"
            loading="lazy"
          />
        </section>

        <section className='flex justify-center' aria-label="Download section">
          <div className='flex flex-col items-center gap-4'>
            <PlatformSelector />
            <p className='text-sm text-gray-500'>
              It's free during beta
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}