/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Next.js 13+ automatically supports src directory
  experimental: {
    // Not needed for basic src support
  },
  images: {
    // Configure for your assets
    domains: ['web3privacy.info', 'ui-avatars.com', 'cdn.prod.website-files.com', 'waku.org'],
  },
}

export default nextConfig
