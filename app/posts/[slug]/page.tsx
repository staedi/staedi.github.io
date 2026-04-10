import { notFound } from "next/navigation"
import { getArticlePosts } from "@/lib/posts"
import type { Metadata } from "next"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const posts = getArticlePosts()
    return posts.map((post) => ({ slug: post.link.split("/posts/")[1] }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const posts = getArticlePosts()
    const post = posts.find((p) => p.link === `/posts/${slug}`)
    if (!post) return {}
    return {
        title: post.title,
        description: post.description,
    }
}

export default async function ArticlePostPage({ params }: Props) {
    const { slug } = await params
    const posts = getArticlePosts()
    const post = posts.find((p) => p.link === `/posts/${slug}`)
    if (!post) notFound()

    let Content
    try {
        const mod = await import(`@/content/posts/${slug}.mdx`)
        Content = mod.default
    } catch {
        notFound()
    }

    return (
        <article className="prose prose-zinc dark:prose-invert max-w-none">
            <h1>{post.title}</h1>
            {post.date && (
                <p className="not-prose text-sm text-zinc-400 dark:text-zinc-500 -mt-4 mb-8">
                    {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                    {post.tag && (
                        <span className="ml-3 text-zinc-400 dark:text-zinc-500">
                            {post.tag}
                        </span>
                    )}
                </p>
            )}
            <Content />
        </article>
    )
}