import { Highlighter } from '@/components/ui/highlighter'
import { createFileRoute, Link } from '@tanstack/react-router'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { RiGithubLine, RiTwitterLine } from 'react-icons/ri'

export const Route = createFileRoute('/')({
  component: App,
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
  }
]

function ProductCard({ product }: { product: typeof products[number] }) {
  return (
    <a href={product.url} className='block' target='_blank'>
      <div className='bg-zinc-50 p-4 rounded-lg space-y-1 flex items-center gap-4 hover:bg-zinc-100 transition-colors'>
        <img src={product.icon} alt={product.title} className='w-8 h-8 rounded-lg' />
        <div>
          <h3 className='font-bold text-sm'>{product.title}</h3>
          <p className='text-sm text-gray-500'>{product.description}</p>
        </div>
      </div>
    </a>
  )
}

function App() {
  return (
    <div className='space-y-24 md:space-y-24 px-6 md:px-0'>
      <section className='text-center text-4xl font-bold pt-24 md:pt-48 space-y-4'>
        <div>
          <img src="/icon-512.png" alt="logo" className='w-16 h-16 inline-block ' />
        </div>
        <h1 className='text-xl md:text-4xl'>We <Highlighter color="#ffd1dc">
          make something people want
        </Highlighter></h1>
      </section>

      <section className='max-w-[640px] mx-auto space-y-4'>

        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </section>

      <section className='flex justify-center gap-4'>
        <a href="https://twitter.com/randyloop" target='_blank'>
          <RiTwitterLine size={24} className='text-gray-500 hover:text-gray-900 transition-colors' />
        </a>

        <a href="https://github.com/djyde" target='_blank'>
          <RiGithubLine size={24} className='text-gray-500 hover:text-gray-900 transition-colors' />
        </a>
      </section>
    </div>
  )
}
