/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: "/checkout/:path*",
        destination: "https://gds.viraweb.online/checkout/:path*",
        permanent: true,
      },
      {
        source: "/:locale/checkout/:path*",
        destination: "https://gds.viraweb.online/:locale/checkout/:path*",
        permanent: true,
      },
    ]
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
}

export default nextConfig
