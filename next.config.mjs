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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
  },
  compiler: {
    removeConsole: {
      exclude: ['error'], // Remove logs and warnings, keep errors
    },
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
    reactCompiler: true,
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "clsx",
      "tailwind-merge",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-slot",
      "@radix-ui/react-label",
      "@radix-ui/react-select",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-dialog"
    ],
    scrollRestoration: true,
  },
  cssChunking: 'strict',
}

export default nextConfig

