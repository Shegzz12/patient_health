'use client'

import { useState } from 'react'
import { SidebarNav } from '@/components/sidebar-nav'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Users,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  AlertTriangle,
  Send,
  Eye,
} from 'lucide-react'

interface Doctor {
  id: string
  name: string
  specialty: string
  email: string
  phone: string
  available: boolean
  responseTime: string
  lastSeen: string
  status: 'active' | 'offline' | 'busy'
  imageUrl?: string
}

interface Message {
  id: string
  doctorId: string
  timestamp: Date
  message: string
  type: 'alert' | 'message' | 'prescription'
  priority: 'high' | 'normal'
  read: boolean
}

export default function HealthPersonnelPage() {
  const [doctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Practitioner',
      email: 'sarah.johnson@hospital.com',
      phone: '+234 808 876 5350',
      available: true,
      responseTime: '< 5 minutes',
      lastSeen: '2 minutes ago',
      status: 'active',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      email: 'michael.chen@hospital.com',
      phone: '+234 808 876 5350',
      available: true,
      responseTime: '10-15 minutes',
      lastSeen: '15 minutes ago',
      status: 'active',
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Infectious Disease',
      email: 'emily.rodriguez@hospital.com',
      phone: '+234 808 876 5350',
      available: false,
      responseTime: '30+ minutes',
      lastSeen: '1 hour ago',
      status: 'busy',
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Emergency Medicine',
      email: 'james.wilson@hospital.com',
      phone: '+234 808 876 5350',
      available: true,
      responseTime: '< 10 minutes',
      lastSeen: '5 minutes ago',
      status: 'active',
    },
  ])

  const [messages] = useState<Message[]>([
    {
      id: '1',
      doctorId: '1',
      timestamp: new Date(Date.now() - 10 * 60000),
      message:
        'Patient blood oxygen is critically low. Recommend immediate oxygen therapy.',
      type: 'alert',
      priority: 'high',
      read: true,
    },
    {
      id: '2',
      doctorId: '2',
      timestamp: new Date(Date.now() - 30 * 60000),
      message:
        'Heart rate elevated. Patient should rest and avoid strenuous activities.',
      type: 'message',
      priority: 'normal',
      read: true,
    },
    {
      id: '3',
      doctorId: '1',
      timestamp: new Date(Date.now() - 2 * 3600000),
      message:
        'Continue monitoring vitals. Schedule follow-up appointment next week.',
      type: 'message',
      priority: 'normal',
      read: false,
    },
  ])

  const [selectedDoctor, setSelectedDoctor] = useState<string>(doctors[0].id)
  const [messageText, setMessageText] = useState('')

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log(`[v0] Sending message to doctor ${selectedDoctor}:`, messageText)
      setMessageText('')
    }
  }

  const availableDoctors = doctors.filter((d) => d.available)
  const unreadMessages = messages.filter((m) => !m.read).length

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    offline: 'bg-gray-100 text-gray-700',
    busy: 'bg-yellow-100 text-yellow-700',
  }

  const statusDotColors = {
    active: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-yellow-500',
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 md:p-8">
        {/* Header with Enhanced Design */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                Healthcare Team Portal
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Direct communication and real-time coordination with health professionals
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700 px-3 md:px-4 py-2 text-xs md:text-sm font-bold w-fit">
              <Users className="h-4 w-4 mr-1" />
              {availableDoctors.length} Available
            </Badge>
          </div>
        </div>

        {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8">
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Available Doctors</p>
                  <p className="text-3xl font-bold text-green-600">{availableDoctors.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Doctors</p>
                  <p className="text-3xl font-bold text-blue-600">{doctors.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Messages</p>
                  <p className="text-3xl font-bold text-purple-600">{messages.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Unread</p>
                  <p className="text-3xl font-bold text-red-600">{unreadMessages}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="doctors" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="doctors">Available Doctors</TabsTrigger>
            <TabsTrigger value="messaging">
              Messages ({unreadMessages} unread)
            </TabsTrigger>
          </TabsList>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="mt-6 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {doctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className={`border-2 bg-gradient-to-br hover:shadow-lg transition-all duration-300 relative ${
                    doctor.available
                      ? 'border-green-200 from-green-50 to-white'
                      : 'border-yellow-200 from-yellow-50 to-white'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {doctor.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                statusDotColors[doctor.status]
                              }`}
                            />
                            <Badge className={statusColors[doctor.status]}>
                              {doctor.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {doctor.specialty}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Contact Info */}
                    <div className="space-y-2 py-3 px-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm text-foreground">{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm text-foreground">{doctor.phone}</span>
                      </div>
                    </div>

                    {/* Availability Info */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Response Time</p>
                        <p className="font-semibold text-foreground">
                          {doctor.responseTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Seen</p>
                        <p className="font-semibold text-foreground">
                          {doctor.lastSeen}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {doctor.available ? (
                        <>
                          <Button
                            className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => setSelectedDoctor(doctor.id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            Message
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 gap-2 bg-transparent"
                          >
                            <Phone className="h-4 w-4" />
                            Call
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          disabled
                        >
                          Currently Unavailable
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messaging Tab */}
          <TabsContent value="messaging" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
              {/* Messages List */}
              <div className="col-span-2 space-y-3">
                {messages.length > 0 ? (
                  messages.map((msg) => {
                    const doctor = doctors.find((d) => d.id === msg.doctorId)
                    return (
                      <Card
                        key={msg.id}
                        className={`border-2 ${
                          msg.type === 'alert'
                            ? 'border-red-200 bg-gradient-to-br from-red-50 to-white'
                            : 'border-border bg-gradient-to-br from-background to-card'
                        }`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">
                                {doctor?.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {doctor?.specialty}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {msg.type === 'alert' && (
                                <Badge className="bg-red-100 text-red-700">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Alert
                                </Badge>
                              )}
                              {msg.priority === 'high' && (
                                <Badge className="bg-red-100 text-red-700">High</Badge>
                              )}
                              {!msg.read && (
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-foreground mb-3">{msg.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {msg.timestamp.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    )
                  })
                ) : (
                  <Card className="border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                    <CardContent className="py-8">
                      <p className="text-center text-muted-foreground">
                        No messages yet
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Send Message Section */}
              <div>
                <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent sticky top-8 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-primary text-xl">Compose Message</CardTitle>
                    <CardDescription className="mt-2">
                      To: <span className="font-semibold text-foreground">
                        {doctors.find((d) => d.id === selectedDoctor)?.name || 'Select a doctor'}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Doctor Selection */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Select Doctor
                      </label>
                      <select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {doctors.filter((d) => d.available).map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialty}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Input */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Message
                      </label>
                      <Textarea
                        placeholder="Type your message here..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="w-full border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none"
                        rows={6}
                      />
                    </div>

                    {/* Send Button */}
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>

                    {/* Quick Actions */}
                    <div className="pt-4 border-t border-border space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">
                        QUICK ACTIONS
                      </p>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2 text-sm bg-transparent"
                        onClick={() =>
                          setMessageText('Need urgent medical consultation regarding my health status.')
                        }
                      >
                        <AlertTriangle className="h-4 w-4" />
                        Urgent Consultation
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2 text-sm bg-transparent"
                        onClick={() =>
                          setMessageText('Can I get a prescription for my current condition?')
                        }
                      >
                        <Eye className="h-4 w-4" />
                        Request Prescription
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
