// Hello World
import { SITE, absoluteUrl } from '@/lib/site';

export const siteMetadata = ({
  title = 'ViraWeb — Sites, sistemas sob medida, automação com IA e marketing',
  description = 'Criamos sites, sistemas sob medida, automações com IA no WhatsApp e campanhas de tráfego pago. Diagnóstico gratuito pelo WhatsApp.',
  url = SITE.url,
  image = absoluteUrl('/favicon.png'),
  keywords = ['sistemas sob medida', 'criação de sites', 'automação whatsapp', 'tráfego pago'],
} = {}) => ({
  title,
  description,
  url,
  image,
  keywords,
});
