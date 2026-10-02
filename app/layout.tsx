import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Figtree } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree' })

export const metadata: Metadata = {
  title: {
    default: 'AgriGuard — Smart Farming Assistant',
    template: '%s · AgriGuard',
  },
  description:
    'AgriGuard helps farmers detect crop diseases, check weather, get crop recommendations, track market prices and ask farming questions.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8f2' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1d15' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={figtree.variable}>
      <body className="min-h-dvh font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10">{children}</main>
          <footer className="border-t">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground md:flex-row md:justify-between md:px-6">
              <p>AgriGuard — built for farmers.</p>
              <p>Advice is for guidance only. Consult your local agriculture officer for critical decisions.</p>
            </div>
          </footer>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
