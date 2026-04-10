'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          min park
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          NLP and Data Analytics
        </TextEffect>
      </div>
      <nav className="flex items-center gap-4">
        <Link
          href="/"
          className={`text-sm transition-colors ${pathname === '/'
            ? 'text-black dark:text-white'
            : 'text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white'
            }`}
        >
          Home
        </Link>
        <Link
          href="/posts"
          className={`text-sm transition-colors ${pathname.startsWith('/posts')
            ? 'text-black dark:text-white'
            : 'text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white'
            }`}
        >
          Articles
        </Link>
      </nav>

    </header>
  )
}
