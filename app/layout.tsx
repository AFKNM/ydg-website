import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AIChatWidget } from '@/components/sections/AIChatWidget'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'Your Digital Guy | Digitale Oplossings vir Sakeondernemings',
    template: '%s | Your Digital Guy',
  },
  description:
    'YDG bied wêreldklas digitale dienste: Google Ads, SEO, META-advertensies, webontwikkeling, AI-oplossings, en meer — spesiaal vir Afrikaanse kleinsakeondernemings.',
  keywords: [
    'digitale bemarking', 'Google Ads', 'SEO', 'webontwikkeling',
    'digitale dienste', 'AI oplossings', 'META advertensies', 'WhatsApp besigheid',
    'Your Digital Guy', 'YDG', 'Suid-Afrika', 'Afrikaans',
  ],
  authors: [{ name: 'Your Digital Guy', url: 'https://yourdigitalguy.co.za' }],
  creator: 'YDG',
  metadataBase: new URL('https://yourdigitalguy.co.za'),
  openGraph: {
    type: 'website',
    locale: 'af_ZA',
    alternateLocale: 'en_ZA',
    url: 'https://yourdigitalguy.co.za',
    siteName: 'Your Digital Guy',
    title: 'Your Digital Guy | Digitale Oplossings',
    description: 'AI-aangedrewe digitale dienste vir die moderne sakewereld.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Digital Guy',
    description: 'AI-aangedrewe digitale dienste vir Afrikaanse sakeondernemings.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? '',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="af" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <AIChatWidget />
        </Providers>
      </body>
    </html>
  )
}
