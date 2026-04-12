import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontak YDG | Digitale Bemarkingsagentskap Kaapstad',
  description:
    "Kontak Your Digital Guy in Kaapstad. Stuur ons 'n boodskap of WhatsApp ons direk op 067 813 1033. Ons reageer binne een besigheidsdag.",
  openGraph: {
    title: 'Kontak YDG | Your Digital Guy Kaapstad',
    description:
      "Kontak ons vir digitale bemarkingsdienste in Kaapstad. WhatsApp, e-pos of kontakvorm — ons reageer vinnig.",
    url: 'https://yourdigitalguy.co.za/kontak',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontak YDG',
    description: 'Kontak Your Digital Guy vir digitale bemarkingsdienste in Kaapstad.',
  },
}

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
