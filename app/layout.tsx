import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Navigation from '@/components/Navigation'
import ScrollToTop from '@/components/ui/ScrollToTop';
import Footer from '@/components/Footer'
import StructuredData, { generateOrganizationSchema, generateWebSiteSchema } from '@/components/StructuredData'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/Theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });

const BASE_URL = 'https://unixteam.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'UNIX-TEAM | Gaming-Tech Community',
    template: '%s | UNIX-TEAM',
  },
  description:
    'UNIX-TEAM adalah komunitas gaming dan teknologi yang membangun pengalaman Roblox, tools, dan script inovatif.',
  keywords: [
    'UNIX-TEAM',
    'gaming community',
    'Roblox',
    'tech community',
    'Indonesia',
    'Discord',
    'game development',
    'Roblox scripts',
    'Roblox tools',
    'Lua script',
    'Komunitas gaming Indonesia',
    'Komunitas teknologi Indonesia',
  ],
  authors: [{ name: 'UNIX-TEAM', url: BASE_URL }],
  creator: 'UNIX-TEAM',
  publisher: 'UNIX-TEAM',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: BASE_URL,
    siteName: 'UNIX-TEAM',
    title: 'UNIX-TEAM | Gaming-Tech Community',
    description:
      'UNIX-TEAM adalah komunitas gaming dan teknologi yang membangun pengalaman Roblox, tools, dan script inovatif.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'UNIX-TEAM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNIX-TEAM',
    description: 'Gaming-Tech Community Indonesia',
    site: '@unixteam',
    creator: '@unixteam',
    images: [`${BASE_URL}/og-image.png`],
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
  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${_geist.variable} ${_geistMono.variable}`} suppressHydrationWarning>
      <head>
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateWebSiteSchema()} />
      </head>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}