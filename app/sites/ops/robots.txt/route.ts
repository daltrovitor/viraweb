// Hello World
export const dynamic = 'force-static';

/** Operations is private: nothing here may be crawled. */
export function GET() {
  return new Response('User-agent: *\nDisallow: /\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
  });
}
