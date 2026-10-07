import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getHostKind, isInternalPath, rewritePath } from "@/lib/hosts"

/** Supabase stores the session in cookies named `sb-<ref>-auth-token[.n]`. */
function hasSessionCookie(request: NextRequest): boolean {
  return request.cookies.getAll().some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"))
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const kind = getHostKind(request.headers.get("host"))

  // Internal route trees are only reachable through the rewrite below.
  if (isInternalPath(pathname)) {
    return new NextResponse(null, { status: 404 })
  }

  if (kind === "factory") {
    if (pathname.startsWith("/api/")) return NextResponse.next()
    return NextResponse.rewrite(new URL(`${rewritePath("factory", pathname)}${search}`, request.url))
  }

  if (kind === "ops") {
    if (pathname.startsWith("/api/")) return NextResponse.next()
    // Fast gate only; real authorization (session + role + RLS) is enforced server-side.
    if (pathname !== "/login" && !hasSessionCookie(request)) {
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      url.search = ""
      return NextResponse.redirect(url)
    }
    const response = NextResponse.rewrite(new URL(`${rewritePath("ops", pathname)}${search}`, request.url))
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
