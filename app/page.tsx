import { getArticlePosts, getRandomPosts } from '@/lib/posts'
import Home from './home'

// export const dynamic = 'force-dynamic'

export default function Personal() {
  const posts = getArticlePosts(5)
  return <Home posts={posts} />
}
