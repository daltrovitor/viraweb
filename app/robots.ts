// Hello World
import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

/**
 * Crawlers that feed AI answers. Search and user-triggered fetchers (the ones
 * that decide whether a site can be cited) come first; training crawlers follow.
 * Everything is already allowed by the wildcard rule — naming them makes the
 * intent explicit and survives a future tightening of that rule.
 */
const AI_AGENTS = [
  // OpenAI
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  // Anthropic
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google (Gemini grounding / training control token)
  'Google-Extended',
  // Others
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'CCBot',
  'Bytespider',
  'cohere-ai',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_AGENTS, allow: '/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
