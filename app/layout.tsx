import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MobileNav } from '@/components/mobile-nav'
import { SidebarNav } from '@/components/sidebar-nav'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Health Monitoring Dashboard',
  description: 'Professional, production-ready medical monitoring system for tracking patient health metrics with real-time alerts, sensor data visualization, and healthcare team coordination',
  keywords: ['health monitoring', 'medical dashboard', 'patient care', 'vital signs', 'gyroscope', 'accelerometer'],
  authors: [{ name: 'Joy Joseph Team' }],
  creator: 'Joy Joseph',
  publisher: 'Joy Joseph',
  generator: 'healthmonitoring.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://healthsync.app',
    title: 'Health Monitoring Dashboard',
    description: 'Professional medical monitoring system for tracking patient health metrics with real-time alerts',
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
    <html lang="en">
      <body className={`font-sans antialiased bg-background`}>
        {/* Mobile Navigation */}
        <MobileNav />
        
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <SidebarNav />
        </div>
        
        {/* Content with proper spacing for mobile */}
        <div className="pt-20 md:pt-0 md:ml-64">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
