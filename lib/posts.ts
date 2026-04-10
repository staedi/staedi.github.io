import "server-only"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type ArticlePost = {
    title: string
    description: string
    link: string
    uid: string
    date: string
    tag?: string
}

function shuffleArray<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5)
}

export function getArticlePosts(limit?: number): ArticlePost[] {
    const blogDir = path.join(process.cwd(), "content/posts")

    const slugs = fs
        .readdirSync(blogDir, { withFileTypes: true })
        .filter((f) => f.isFile() && f.name.endsWith('.mdx'))
        .map((f) => f.name.replace(/\.mdx$/, ""))

    const posts: ArticlePost[] = slugs.map((slug, i) => {
        const filePath = path.join(blogDir, `${slug}.mdx`)
        const raw = fs.readFileSync(filePath, "utf-8")
        const { data } = matter(raw)

        return {
            uid: `article-${i + 1}`,
            title: data.title.replaceAll('`', '') ?? slug,
            description: data.description.replaceAll('`', '') ?? "",
            date: data.date ?? "1970-01-01",
            tag: data.tag.replaceAll('`', ''),
            link: `/posts/${slug}`,
        }
    })

    const sorted = posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return limit ? sorted.slice(0, limit) : sorted
}

export function getRandomPosts(count = 4): ArticlePost[] {
    const all = getArticlePosts()
    return shuffleArray(all).slice(0, count)
}