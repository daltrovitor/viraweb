// Hello World
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/** Legacy checkout links from the former Odonto product keep resolving on its own domain. */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  if (pathname.includes("/checkout")) {
    return NextResponse.redirect(new URL(`https://odonto.viraweb.dev.br${pathname}${search}`), 301)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
}
