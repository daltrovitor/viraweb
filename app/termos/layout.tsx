// Hello World
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { buildMetadata } from "@/lib/seo"

// The page itself is a client component, so its metadata lives in this server layout.
export const metadata: Metadata = buildMetadata({
  title: "Termos de uso — ViraWeb",
  description:
    "Termos de uso da ViraWeb: condições dos serviços de criação de sites, sistemas sob medida, automações e gestão digital.",
  path: "/termos",
})

export default function TermosLayout({ children }: { children: ReactNode }) {
  return children
}
