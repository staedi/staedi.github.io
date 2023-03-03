const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  defaultShowCopyCode: true,
  readingTime: true,
  // optional: add `unstable_staticImage: true` to enable Nextra's auto image import
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   loader: 'akamai',
  //   path: '',
  // },
  // assetPrefix: './',
  // any configs you need
}

// module.exports = withNextra(nextConfig)
module.exports = {
  ...withNextra(nextConfig),
  images: {
    unoptimized: true,
  }
};