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
        hostname: '**.viraweb.dev.br',
      },
      {
        // Testimonial avatars
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
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
    // Legacy Odonto checkout redirects apply to the main site only; the Factory
    // and Operations hosts own their own /checkout paths.
    const mainOnly = [
      { type: "host", value: "(?!factory\\.|ops\\.).*" },
    ]
    return [
      {
        source: "/checkout/:path*",
        has: mainOnly,
        destination: "https://odonto.viraweb.dev.br/checkout/:path*",
        permanent: true,
      },
      {
        source: "/:locale/checkout/:path*",
        has: mainOnly,
        destination: "https://odonto.viraweb.dev.br/:locale/checkout/:path*",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ops\\..*" }],
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "same-origin" },
        ],
      },
    ]
  },
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
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
}

export default nextConfig

