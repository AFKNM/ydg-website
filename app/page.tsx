import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { WhyYDGSection } from '@/components/sections/WhyYDGSection'
import { AISection } from '@/components/sections/AISection'
import { StatsSection } from '@/components/sections/StatsSection'
import { CTASection } from '@/components/sections/CTASection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YDG — Your Digital Guy | Digitale Bemarking & Webontwikkeling Kaapstad',
  description:
    'YDG bied professionele digitale bemarkingsdienste in Kaapstad: Google Ads, SEO, META-advertensies, webontwikkeling en AI-oplossings vir Suid-Afrikaanse sakeondernemings.',
  openGraph: {
    title: 'YDG — Your Digital Guy | Digitale Bemarking Kaapstad',
    description:
      'Professionele digitale bemarkingsdienste: Google Ads, SEO, META, webontwikkeling en AI. Kaapstad, Suid-Afrika.',
    url: 'https://yourdigitalguy.co.za',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YDG — Your Digital Guy | Digitale Bemarking Kaapstad',
    description: 'Google Ads, SEO, META, webontwikkeling en AI-oplossings vir SA sakeondernemings.',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Your Digital Guy',
  alternateName: 'YDG',
  url: 'https://yourdigitalguy.co.za',
  telephone: '+27678131033',
  email: 'hallo@yourdigitalguy.co.za',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cape Town',
    addressRegion: 'Western Cape',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -33.9249,
    longitude: 18.4241,
  },
  areaServed: {
    '@type': 'Country',
    name: 'South Africa',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  description:
    "YDG — Your Digital Guy bied professionele digitale bemarkingsdienste in Kaapstad: Google Ads, SEO, META-advertensies, webontwikkeling en AI-oplossings.",
  priceRange: '$$',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AISection />
      <WhyYDGSection />
      <CTASection />
    </>
  )
}
