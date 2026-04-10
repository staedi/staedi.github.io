// next.config.mjs
import createMDX from '@next/mdx'

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-frontmatter', 'remark-gfm'],
  },
})

export default withMDX(nextConfig)