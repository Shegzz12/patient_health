'use client'

import React from "react"

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
    description: 'Patient info',
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold shadow-lg">
            HS
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">HealthSync</h1>
            <p className="text-xs text-muted-foreground font-medium">v1.0 Pro</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link href={link.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={cn(
                      'w-full justify-start gap-3 py-6 px-4 font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-primary'
                    )}
                  >
                    {link.icon}
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold">{link.label}</div>
                    </div>
                    {isActive && <div className="w-1 h-6 bg-primary-foreground rounded-r" />}
                  </Button>
                </Link>
                <p className={cn(
                  'text-xs px-4 py-1.5 font-medium',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}>
                  {link.description}
                </p>
              </li>
            )
          })}
        </ul>
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
        <div className="mt-4 pt-4 border-t border-sidebar-border space-y-1 text-center">
          <p className="text-xs text-muted-foreground font-semibold">
            HealthSync Pro
          </p>
          <p className="text-xs text-muted-foreground">
            v1.0 • Medical Grade
          </p>
        </div>
      </div>
    </aside>
  )
}
