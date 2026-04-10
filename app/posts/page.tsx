// import Link from 'next/link'
import { getArticlePosts } from '@/lib/posts'
import { ArticleList } from '@/components/ui/article-list'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Articles',
    description: 'Notes on NLP, data engineering, and miscellaneous things.',
}

export default function ArticlePage() {
    const posts = getArticlePosts()

    return (
        <section>
            <ArticleList posts={posts} perPage={5} />
        </section>
    )
}