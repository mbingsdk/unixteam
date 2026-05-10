/** @type {import('next').NextConfig} */
const nextConfig = {
  // 'output: export' hanya aktif saat build production (gh-pages).
  // Saat 'next dev', tidak di-set → API routes jalan normal.
  ...(process.env.NEXT_EXPORT === '1' ? { output: 'export' } : {}),

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
