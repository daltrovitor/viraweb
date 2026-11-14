// Hello World
import { track } from '@vercel/analytics';

/** Where on the page a contact button lives. */
export type ContactLocation =
  | 'nav'
  | 'hero'
  | 'service'
  | 'package'
  | 'product'
  | 'faq'
  | 'contact'
  | 'sticky'
  | 'footer';

/**
 * Records a click on a contact button through the Vercel Analytics already in
 * use on the site. Only the button's location is sent — never the message text
 * or anything about the visitor — so the redesign's effect on contacts can be
 * measured instead of guessed.
 */
export function trackContact(location: ContactLocation, detail?: string): void {
  try {
    track('contact_click', detail ? { location, detail } : { location });
  } catch {
    // Analytics must never get in the way of the visitor reaching WhatsApp.
  }
}
