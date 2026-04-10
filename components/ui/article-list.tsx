'use client'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { type ArticlePost } from '@/lib/posts'

type Props = {
    posts: ArticlePost[]
    perPage?: number
    maxPageButtons?: number
}

const TAG_COLORS: Record<string, string> = {
    project: 'text-blue-500 dark:text-blue-400',
    note: 'text-zinc-400 dark:text-zinc-500',
}

function getPageWindow(current: number, total: number, max: number): number[] {
    const block = Math.floor((current - 1) / max)
    const start = block * max + 1
    const end = Math.min(start + max - 1, total)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function ArticleList({ posts, perPage = 10, maxPageButtons = 10 }: Props) {
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)

    const fuse = useMemo(
        () =>
            new Fuse(posts, {
                keys: ['title', 'description'],
                threshold: 0.4,
                minMatchCharLength: 2,
            }),
        [posts]
    )

    const results = useMemo(() => {
        return query.trim() ? fuse.search(query).map((r) => r.item) : posts
    }, [query, fuse, posts])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setPage(1)
    }

    const totalPages = Math.ceil(results.length / perPage)
    const paginated = results.slice((page - 1) * perPage, page * perPage)
    const pageWindow = getPageWindow(page, totalPages, maxPageButtons)

    const showPrev = pageWindow[0] > 1
    const showNext = pageWindow[pageWindow.length - 1] < totalPages

    return (
        <div>
            {/* Section heading + search bar on same line */}
            <div className="mb-6 flex items-center justify-between gap-4">
                <h1 className="text-sm font-medium text-black dark:text-white">
                    Articles
                </h1>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="w-36 rounded-md border border-zinc-200 bg-transparent px-2.5 py-1 text-xs text-black placeholder-zinc-400 outline-none transition-all focus:w-48 focus:border-zinc-400 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-600"
                />
            </div>

            {/* Results */}
            {paginated.length === 0 ? (
                <p className="text-sm text-zinc-400 dark:text-zinc-600">
                    No posts found.
                </p>
            ) : (
                <div className="space-y-5">
                    {paginated.map((post) => (
                        <Link
                            key={post.uid}
                            href={post.link}
                            className="group flex flex-col gap-1 no-underline"
                        >
                            <span className="text-base font-medium text-black transition-colors group-hover:text-zinc-600 dark:text-white dark:group-hover:text-zinc-300">
                                {post.title}
                            </span>
                            <div className="flex items-center gap-2">
                                {post.tag && (
                                    <span
                                        className={`text-sm ${TAG_COLORS[post.tag] ?? 'text-zinc-400'}`}
                                    >
                                        {post.tag}
                                    </span>
                                )}
                                <span className="text-sm tabular-nums text-zinc-400 dark:text-zinc-500">
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                {post.description}
                            </p>
                        </Link>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-1">
                    {/* Prev */}
                    {showPrev && (
                        <button
                            onClick={() => setPage(pageWindow[0] - 1)}
                            className="rounded-md px-2.5 py-1 text-sm text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
                        >
                            ←
                        </button>
                    )}

                    {/* Page buttons */}
                    {pageWindow.map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`rounded-md px-2.5 py-1 text-sm transition-colors ${p === page
                                ? 'font-medium text-black dark:text-white'
                                : 'text-zinc-400 hover:text-black dark:text-zinc-500 dark:hover:text-white'
                                }`}
                        >
                            {p}
                        </button>
                    ))}

                    {/* Next */}
                    {showNext && (
                        <button
                            onClick={() => setPage(pageWindow[pageWindow.length - 1] + 1)}
                            className="rounded-md px-2.5 py-1 text-sm text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
                        >
                            →
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}