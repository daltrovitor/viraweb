/** @type {import('next').NextConfig} */
const nextConfig = {
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
    return [
      { source: "/pacote", destination: "/propostas", permanent: true },
      { source: "/proposta", destination: "/propostas", permanent: true },
      { source: "/criacao-de-sites", destination: "/cases/pagina-de-lancamento", permanent: true },
      { source: "/chatbot-whatsapp", destination: "/cases/virabot", permanent: true },
      { source: "/marketing-digital", destination: "/cases/painel-de-aquisicao", permanent: true },
      { source: "/checkout/:path*", destination: "https://odonto.viraweb.dev.br/checkout/:path*", permanent: true },
      { source: "/:locale/checkout/:path*", destination: "https://odonto.viraweb.dev.br/:locale/checkout/:path*", permanent: true },
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

