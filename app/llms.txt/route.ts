// Hello World
import { buildLlmsTxt } from '@/lib/llms';

// Prerendered at build time from the same content modules as the home page.
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
