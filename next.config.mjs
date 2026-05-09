/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: '',
  trailingSlash: true,
  serverExternalPackages: [],
  reactStrictMode: false,
}

export default nextConfig
