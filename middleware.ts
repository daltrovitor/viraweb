import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Redirect checkout routes to the main app domain (gds.viraweb.online)
  // This handles cases where Stripe redirects back to gdc after payment
  if (pathname.includes("/checkout")) {
    const url = new URL(`https://gds.viraweb.online${pathname}${search}`)
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
}
