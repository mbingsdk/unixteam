import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'UNIX-TEAM | Gaming-Tech Community',
  description: 'UNIX-TEAM is a premium gaming and technology community building innovative Roblox experiences, tools, and scripts.',
  metadataBase: new URL('https://unixteam.my.id'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://unixteam.my.id',
    title: 'UNIX-TEAM | Gaming-Tech Community',
    description: 'UNIX-TEAM is a premium gaming and technology community',
    siteName: 'UNIX-TEAM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNIX-TEAM',
    description: 'Gaming-Tech Community',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_geist.variable} ${_geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
