const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://viraweb.online'

export default function handler() {
	return {
		rules: [
			{
				userAgent: ['*'],
				allow: '/',
			},
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
	}
}
