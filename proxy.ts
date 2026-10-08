import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getHostKind, isInternalPath, rewritePath } from "@/lib/hosts"
import { refreshSession } from "@/lib/supabase/proxy"

/** Files in /public (manifest, llms.txt…) are shared by every host; robots and sitemaps are per host. */
const PUBLIC_FILE = /\.[a-z0-9]+$/i
const PER_HOST_FILES = new Set(["/robots.txt", "/sitemap.xml"])

/** Paths on the Operations host that are reachable without a session. */
const OPS_PUBLIC = new Set(["/login", "/robots.txt"])

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const kind = getHostKind(request.headers.get("host"))

  // Internal route trees are only reachable through the rewrites below.
  if (isInternalPath(pathname)) {
    return new NextResponse(null, { status: 404 })
  }

  if (kind !== "main" && PUBLIC_FILE.test(pathname) && !PER_HOST_FILES.has(pathname)) {
    return NextResponse.next()
  }

  if (kind === "factory") {
    if (pathname.startsWith("/api/")) return NextResponse.next()
    const target = new URL(`${rewritePath("factory", pathname)}${search}`, request.url)
    const { response } = await refreshSession(request, () => NextResponse.rewrite(target, { request }))
    return response
  }

  if (kind === "ops") {
    if (pathname.startsWith("/api/")) return NextResponse.next()
    const target = new URL(`${rewritePath("ops", pathname)}${search}`, request.url)
    const { response, userId } = await refreshSession(request, () => NextResponse.rewrite(target, { request }))

    // First gate only; role checks (requireRole) and RLS run server-side on every page and action.
    if (!userId && !OPS_PUBLIC.has(pathname)) {
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      url.search = pathname === "/" ? "" : `?next=${encodeURIComponent(pathname)}`
      return NextResponse.redirect(url)
    }
    response.headers.set("X-Robots-Tag", "noindex, nofollow")
    response.headers.set("Cache-Control", "private, no-store")
    return response
  }

  // Main site: legacy rule, Stripe returns for Vira Web Odonto land on odonto.viraweb.dev.br.
  if (pathname.includes("/checkout")) {
    const url = new URL(`https://odonto.viraweb.dev.br${pathname}${search}`)
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
}
