import { Highlighter } from '@/components/ui/highlighter'
import { createFileRoute } from '@tanstack/react-router'
import { RiGithubLine, RiTwitterLine } from 'react-icons/ri'

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: 'Randynamic Studio - We make something people want',
      },
      {
        name: 'description',
        content: 'Discover innovative software products by Randynamic Studio: Browserfly AI browser extension, PandocX file converter, and Notepal WeChat reading notes sync tool.',
      },
      {
        property: 'og:title',
        content: 'Randynamic Studio - We make something people want',
      },
      {
        property: 'og:description',
        content: 'Discover innovative software products by Randynamic Studio: Browserfly AI browser extension, PandocX file converter, and Notepal WeChat reading notes sync tool.',
      },
      {
        property: 'og:url',
        content: 'https://randynamic.org',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://randynamic.org',
      },
    ],
  }),
})

const products = [
  {
    title: "Browserfly",
    icon: "/images/browserfly-icon.png",
    url: "https://browserfly.app",
    description: "AI browser extension",
  },
  {
    title: "PandocX",
    icon: "/images/pandocx-icon.png",
    url: "/pandocx",
    description: "A lightweight file converter (pandoc GUI)",
  },
  {
    title: "Notepal",
    icon: "/images/notepal-icon.png",
    url: "https://notepal.randynamic.org",
    description: "一键同步微信读书笔记"
  },
  {
    title: "CC Mate",
    icon: "/images/ccmate-icon.png",
    url: "/ccmate",
    description: "GUI for Claude Code",
  }
]

function ProductCard({ product }: { product: typeof products[number] }) {
  const isExternal = product.url.startsWith('http')
  
  return (
    <a 
      href={product.url} 
      className='block' 
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={`Learn more about ${product.title}: ${product.description}`}
    >
      <article className='bg-zinc-50 p-4 rounded-lg space-y-1 flex items-center gap-4 hover:bg-zinc-100 transition-colors'>
        <img 
          src={product.icon} 
          alt={`${product.title} logo`} 
          className='w-8 h-8 rounded-lg'
          loading="lazy"
        />
        <div>
          <h3 className='font-bold text-sm'>{product.title}</h3>
          <p className='text-sm text-gray-500'>{product.description}</p>
        </div>
      </article>
    </a>
  )
}

function App() {
  return (
    <main className='space-y-24 md:space-y-24 px-6 md:px-0'>
      <header className='text-center text-4xl font-bold pt-24 md:pt-48 space-y-4'>
        <div>
          <img src="/icon-512.png" alt="Randynamic Studio logo" className='w-16 h-16 inline-block ' />
        </div>
        <h1 className='text-xl md:text-4xl'>We <Highlighter color="#ffd1dc">
          make something people want
        </Highlighter></h1>
      </header>

      <section className='max-w-[640px] mx-auto space-y-4' aria-label="Our Products">
        <h2 className="sr-only">Our Products</h2>
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </section>

      <footer className='flex justify-center gap-4' role="contentinfo">
        <a 
          href="https://twitter.com/randyloop" 
          target='_blank' 
          rel="noopener noreferrer"
          aria-label="Follow us on Twitter"
        >
          <RiTwitterLine size={24} className='text-gray-500 hover:text-gray-900 transition-colors' />
        </a>

        <a 
          href="https://github.com/djyde" 
          target='_blank'
          rel="noopener noreferrer"
          aria-label="View our GitHub profile"
        >
          <RiGithubLine size={24} className='text-gray-500 hover:text-gray-900 transition-colors' />
        </a>
      </footer>
    </main>
  )
}
