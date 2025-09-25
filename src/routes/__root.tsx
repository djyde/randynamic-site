import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Randynamic Studio - We make something people want',
      },
      {
        name: 'description',
        content: 'Randynamic Studio creates innovative software products including Browserfly (AI browser extension), PandocX (file converter), and Notepal (WeChat reading notes sync).',
      },
      {
        name: 'keywords',
        content: 'software development, AI tools, browser extension, file converter, pandoc, markdown, productivity tools, indie maker',
      },
      {
        name: 'author',
        content: 'Randy Lu',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      // Open Graph tags
      {
        property: 'og:title',
        content: 'Randynamic Studio - We make something people want',
      },
      {
        property: 'og:description',
        content: 'Randynamic Studio creates innovative software products including Browserfly (AI browser extension), PandocX (file converter), and Notepal (WeChat reading notes sync).',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://randynamic.org',
      },
      {
        property: 'og:image',
        content: 'https://randynamic.org/icon-512.png',
      },
      {
        property: 'og:image:alt',
        content: 'Randynamic Studio Logo',
      },
      {
        property: 'og:site_name',
        content: 'Randynamic Studio',
      },
      // Twitter Card tags
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:site',
        content: '@randyloop',
      },
      {
        name: 'twitter:creator',
        content: '@randyloop',
      },
      {
        name: 'twitter:title',
        content: 'Randynamic Studio - We make something people want',
      },
      {
        name: 'twitter:description',
        content: 'Randynamic Studio creates innovative software products including Browserfly (AI browser extension), PandocX (file converter), and Notepal.',
      },
      {
        name: 'twitter:image',
        content: 'https://randynamic.org/og.png',
      },
      // Additional SEO tags
      {
        name: 'theme-color',
        content: '#ffffff',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'canonical',
        href: 'https://randynamic.org',
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/icon-512.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Randynamic Studio",
    "url": "https://randynamic.org",
    "logo": "https://randynamic.org/icon-512.png",
    "description": "Randynamic Studio creates innovative software products including Browserfly (AI browser extension), PandocX (file converter), and Notepal (WeChat reading notes sync).",
    "founder": {
      "@type": "Person",
      "name": "Randy Lu",
      "sameAs": [
        "https://twitter.com/randyloop",
        "https://github.com/djyde"
      ]
    },
    "sameAs": [
      "https://twitter.com/randyloop",
      "https://github.com/djyde"
    ],
    "products": [
      {
        "@type": "SoftwareApplication",
        "name": "Browserfly",
        "description": "AI browser extension",
        "url": "https://browserfly.app",
        "applicationCategory": "BrowserApplication"
      },
      {
        "@type": "SoftwareApplication",
        "name": "PandocX",
        "description": "A lightweight file converter (pandoc GUI)",
        "url": "https://randynamic.org/pandocx",
        "applicationCategory": "UtilityApplication"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Notepal",
        "description": "一键同步微信读书笔记",
        "url": "https://notepal.randynamic.org",
        "applicationCategory": "ProductivityApplication"
      }
    ]
  }

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <TanstackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
