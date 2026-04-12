import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Kry 'n Gratis Kwotasie | Digitale Bemarking Kaapstad — YDG",
  description:
    "Kry 'n gratis, persoonlike kwotasie vir Google Ads, SEO, webontwikkeling en meer. Geen verbintenis — net 'n eerlike gesprek oor wat jou besigheid nodig het. YDG, Kaapstad.",
  openGraph: {
    title: "Gratis Kwotasie | YDG — Your Digital Guy",
    description:
      "Kry 'n gratis kwotasie vir digitale bemarkingsdienste in Kaapstad. Google Ads, SEO, webontwikkeling en meer.",
    url: 'https://yourdigitalguy.co.za/kwotasie',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gratis Kwotasie | YDG",
    description: "Kry 'n gratis kwotasie vir digitale bemarkingsdienste. Geen verbintenis.",
  },
}

export default function KwotasieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
