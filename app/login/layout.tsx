import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inteken | YDG Portaal',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
