'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Heart,
  AlertTriangle,
  Users,
  User,
  LogOut,
  Menu,
  X,
  Activity,
} from 'lucide-react'

interface NavLink {
  href: string
  label: string
  icon: React.ReactNode
  description: string
}

const navLinks: NavLink[] = [
  {
    href: '/',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    description: 'Main health monitoring',
  },
  {
    href: '/sensors',
    label: 'Sensors',
    icon: <Activity className="h-5 w-5" />,
    description: 'Gyroscope & Accelerometer',
  },
  {
    href: '/metrics',
    label: 'Health Metrics',
    icon: <Heart className="h-5 w-5" />,
    description: 'Detailed readings',
  },
  {
    href: '/alerts',
    label: 'Alerts',
    icon: <AlertTriangle className="h-5 w-5" />,
    description: 'Health warnings',
  },
  {
    href: '/health-personnel',
    label: 'Health Personnel',
    icon: <Users className="h-5 w-5" />,
    description: 'Doctor access',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: <User className="h-5 w-5" />,
    description: 'Personal info',
  },
]

export function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-border md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold">
              HS
            </div>
            <span className="font-bold text-foreground">HealthSync</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-10 w-10"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-40 md:hidden transform transition-transform duration-300 overflow-y-auto pt-20',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-lg font-bold text-sidebar-foreground">HealthSync Pro</h1>
          <p className="text-xs text-muted-foreground font-medium">v1.0 Medical</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 py-6 px-4 font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/40'
                  )}
                >
                  {link.icon}
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold">{link.label}</div>
                  </div>
                  {isActive && <div className="w-1 h-6 bg-primary-foreground rounded-r" />}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border bg-gradient-to-t from-sidebar/50 to-transparent">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-red-50/50 hover:text-red-600 transition-colors font-medium"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </>
  )
}
