'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Menu, X, ChevronDown } from 'lucide-react'

const dienste = [
  { label: 'Google Ads',           href: '/dienste/google-ads' },
  { label: 'SEO',                  href: '/dienste/seo' },
  { label: 'Google My Business',   href: '/dienste/google-my-business' },
  { label: 'META Advertensies',    href: '/dienste/meta-ads' },
  { label: 'WhatsApp Oplossings',  href: '/dienste/whatsapp' },
  { label: 'Webontwikkeling',      href: '/dienste/webontwikkeling' },
  { label: 'AI Oplossings',        href: '/dienste/ai-oplossings' },
  { label: 'BI Verslagdoening',    href: '/dienste/bi-verslagdoening' },
  { label: 'API Ontwikkeling',     href: '/dienste/api-ontwikkeling' },
  { label: 'Grafiese Ontwerp',     href: '/dienste/grafiese-ontwerp' },
]

const navLinks = [
  { label: 'Dienste',   href: '/dienste',   dropdown: dienste },
  { label: 'Produkte',  href: '/produkte' },
  { label: 'Oor Ons',   href: '/oor-ons' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Kontak',    href: '/kontak' },
]

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [scrolled,        setScrolled]        = useState(false)
  const [mobileOpen,      setMobileOpen]      = useState(false)
  const [activeDropdown,  setActiveDropdown]  = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isAdmin   = (session?.user as any)?.role === 'ADMIN'
  const isTeam    = (session?.user as any)?.role === 'TEAM'
  const isLoggedIn = !!session?.user

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white border-b border-[#E2E2E2] shadow-[0_1px_0_0_#E2E2E2]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-ydg flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-10">
          <span
            className="font-grotesk text-2xl font-bold tracking-[-0.05em] text-[#0A0A0A]"
            style={{ letterSpacing: '-0.05em' }}
          >
            YD<span className="text-[#0057FF]">G</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                  pathname.startsWith(link.href) && link.href !== '/'
                    ? 'text-[#0057FF]'
                    : 'text-[#0A0A0A] hover:text-[#0057FF]'
                }`}
              >
                {link.label}
                {link.dropdown && (
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                )}
              </Link>

              {/* Dropdown */}
              {link.dropdown && activeDropdown === link.label && (
                <div className="absolute top-full left-0 w-56 bg-white border border-[#E2E2E2] py-2 shadow-lg">
                  {link.dropdown.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-[#0A0A0A] hover:bg-[#F4F4F4] hover:text-[#0057FF] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {(isAdmin || isTeam) && (
                <Link href="/admin" className="btn btn-outline text-xs py-2 px-3">
                  Admin
                </Link>
              )}
              <Link href="/portaal" className="btn btn-primary text-xs py-2 px-4">
                My Portaal
              </Link>
            </>
          ) : (
            <>
              <Link href="/teken-in" className="btn btn-outline text-xs py-2 px-3">
                Teken In
              </Link>
              <Link href="/kwotasie" className="btn btn-primary text-xs py-2 px-4">
                Kry 'n Kwotasie
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-[#0A0A0A]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E2E2E2] px-6 py-6">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-sm font-medium border-b border-[#F4F4F4] ${
                    pathname.startsWith(link.href) ? 'text-[#0057FF]' : 'text-[#0A0A0A]'
                  }`}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="pl-4 py-1">
                    {link.dropdown.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm text-[#8C8C8C] hover:text-[#0057FF]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex flex-col gap-3 mt-6">
            {isLoggedIn ? (
              <Link href="/portaal" className="btn btn-primary w-full justify-center">
                My Portaal
              </Link>
            ) : (
              <>
                <Link href="/teken-in" className="btn btn-outline w-full justify-center">
                  Teken In
                </Link>
                <Link href="/kwotasie" className="btn btn-primary w-full justify-center">
                  Kry 'n Kwotasie
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
