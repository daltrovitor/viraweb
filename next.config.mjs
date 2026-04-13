/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.viraweb.online',
      },
    ],
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
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "clsx",
      "tailwind-merge",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-slot"
    ],
    scrollRestoration: true,
  },

}

export default nextConfig
