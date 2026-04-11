import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { WhyYDGSection } from '@/components/sections/WhyYDGSection'
import { AISection } from '@/components/sections/AISection'
import { StatsSection } from '@/components/sections/StatsSection'
import { CTASection } from '@/components/sections/CTASection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Digital Guy | AI-Aangedrewe Digitale Dienste',
  description:
    'YDG bied wêreldklas digitale dienste: Google Ads, SEO, META-advertensies, webontwikkeling, AI-oplossings — spesiaal vir Afrikaanse kleinsakeondernemings.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AISection />
      <WhyYDGSection />
      <CTASection />
    </>
  )
}
