'use client'

import { useState } from 'react'
import { SidebarNav } from '@/components/sidebar-nav'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  AlertTriangle,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
} from 'lucide-react'

interface PatientProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  bloodType: string
  address: string
  city: string
  state: string
  zipCode: string
  medicalIdNumber: string
  emergencyContactName: string
  emergencyContactPhone: string
  allergies: string[]
  medications: string[]
  chronicConditions: string[]
  insuranceProvider: string
  insurancePolicyNumber: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<PatientProfile>({
    firstName: 'Joy',
    lastName: 'Joseph',
    email: 'john.joseph@gmail.com',
    phone: '+234 812 749 4841',
    dateOfBirth: '1995-03-15',
    gender: 'Female',
    bloodType: 'O+',
    address: 'Gonin Gora',
    city: 'Kaduna',
    state: 'Kaduna State',
    zipCode: '941022',
    medicalIdNumber: 'MED-2024-089456',
    emergencyContactName: 'Samson Adeniyi',
    emergencyContactPhone: '+234 808n876 5350',
    allergies: ['Penicillin', 'Shellfish'],
    medications: ['Metformin 500mg', 'Lisinopril 10mg'],
    chronicConditions: ['Type 2 Diabetes', 'Hypertension'],
    insuranceProvider: 'Blue Shield',
    insurancePolicyNumber: 'BS-892456789',
  })

  const [tempProfile, setTempProfile] = useState(profile)
  const [newAllergy, setNewAllergy] = useState('')
  const [newMedication, setNewMedication] = useState('')
  const [newCondition, setNewCondition] = useState('')

  const handleEditClick = () => {
    setTempProfile(profile)
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    setProfile(tempProfile)
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
  }

  const handleInputChange = (
    field: keyof PatientProfile,
    value: string
  ) => {
    setTempProfile({ ...tempProfile, [field]: value })
  }

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setTempProfile({
        ...tempProfile,
        allergies: [...tempProfile.allergies, newAllergy],
      })
      setNewAllergy('')
    }
  }

  const removeAllergy = (allergy: string) => {
    setTempProfile({
      ...tempProfile,
      allergies: tempProfile.allergies.filter((a) => a !== allergy),
    })
  }

  const addMedication = () => {
    if (newMedication.trim()) {
      setTempProfile({
        ...tempProfile,
        medications: [...tempProfile.medications, newMedication],
      })
      setNewMedication('')
    }
  }

  const removeMedication = (medication: string) => {
    setTempProfile({
      ...tempProfile,
      medications: tempProfile.medications.filter((m) => m !== medication),
    })
  }

  const addCondition = () => {
    if (newCondition.trim()) {
      setTempProfile({
        ...tempProfile,
        chronicConditions: [...tempProfile.chronicConditions, newCondition],
      })
      setNewCondition('')
    }
  }

  const removeCondition = (condition: string) => {
    setTempProfile({
      ...tempProfile,
      chronicConditions: tempProfile.chronicConditions.filter(
        (c) => c !== condition
      ),
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 md:p-8">
        {/* Header with Enhanced Design */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                Patient Profile
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Manage your personal and medical health information securely
              </p>
            </div>
            {!isEditing ? (
              <Button
                size="sm"
                className="gap-2 w-full md:w-auto md:size-lg"
                onClick={handleEditClick}
              >
                <Edit2 className="h-4 md:h-5 w-4 md:w-5" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2 md:gap-3 w-full">
                <Button
                  size="sm"
                  className="gap-2 flex-1 md:flex-none md:size-lg"
                  onClick={handleSaveClick}
                >
                  <Save className="h-4 md:h-5 w-4 md:w-5" />
                  <span className="hidden md:inline">Save Changes</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-transparent flex-1 md:flex-none md:size-lg"
                  onClick={handleCancelClick}
                >
                  <X className="h-4 md:h-5 w-4 md:w-5" />
                  <span className="hidden md:inline">Cancel</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Profile Summary Card */}
              <Card className="border-2 border-border bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                  <CardTitle className="text-primary">Profile Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {profile.firstName} {profile.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ID: {profile.medicalIdNumber}
                      </p>
                      <Badge className="mt-2">{profile.bloodType}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3 py-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium text-foreground">
                          {profile.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium text-foreground">
                          {profile.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Date of Birth</p>
                        <p className="text-sm font-medium text-foreground">
                          {new Date(profile.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Edit Form */}
              {isEditing ? (
                <Card className="border-2 border-border bg-gradient-to-br from-background to-card">
                  <CardHeader>
                    <CardTitle className="text-primary">Edit Personal Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          First Name
                        </label>
                        <Input
                          value={tempProfile.firstName}
                          onChange={(e) =>
                            handleInputChange('firstName', e.target.value)
                          }
                          className="border border-border"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Last Name
                        </label>
                        <Input
                          value={tempProfile.lastName}
                          onChange={(e) =>
                            handleInputChange('lastName', e.target.value)
                          }
                          className="border border-border"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email
                      </label>
                      <Input
                        value={tempProfile.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        type="email"
                        className="border border-border"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone
                      </label>
                      <Input
                        value={tempProfile.phone}
                        onChange={(e) =>
                          handleInputChange('phone', e.target.value)
                        }
                        className="border border-border"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Gender
                        </label>
                        <select
                          value={tempProfile.gender}
                          onChange={(e) =>
                            handleInputChange('gender', e.target.value)
                          }
                          className="w-full border border-border rounded-lg px-3 py-2 bg-background text-foreground text-sm"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Blood Type
                        </label>
                        <select
                          value={tempProfile.bloodType}
                          onChange={(e) =>
                            handleInputChange('bloodType', e.target.value)
                          }
                          className="w-full border border-border rounded-lg px-3 py-2 bg-background text-foreground text-sm"
                        >
                          <option>O+</option>
                          <option>O-</option>
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>AB+</option>
                          <option>AB-</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {/* Address Card */}
              <Card className="border-2 border-border bg-gradient-to-br from-background to-card">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        placeholder="Street Address"
                        value={tempProfile.address}
                        onChange={(e) =>
                          handleInputChange('address', e.target.value)
                        }
                        className="border border-border"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="City"
                          value={tempProfile.city}
                          onChange={(e) =>
                            handleInputChange('city', e.target.value)
                          }
                          className="border border-border"
                        />
                        <Input
                          placeholder="State"
                          value={tempProfile.state}
                          onChange={(e) =>
                            handleInputChange('state', e.target.value)
                          }
                          className="border border-border"
                        />
                      </div>
                      <Input
                        placeholder="ZIP Code"
                        value={tempProfile.zipCode}
                        onChange={(e) =>
                          handleInputChange('zipCode', e.target.value)
                        }
                        className="border border-border"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <p className="text-foreground">{profile.address}</p>
                      <p className="text-foreground">
                        {profile.city}, {profile.state} {profile.zipCode}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Medical History Tab */}
          <TabsContent value="medical" className="mt-6 space-y-6">
            {/* Allergies */}
            <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Allergies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profile.allergies.map((allergy) => (
                    <Badge
                      key={allergy}
                      className="bg-red-100 text-red-700 flex items-center gap-2 px-3 py-1"
                    >
                      {allergy}
                      {isEditing && (
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeAllergy(allergy)}
                        />
                      )}
                    </Badge>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-3">
                    <Input
                      placeholder="Add new allergy..."
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') addAllergy()
                      }}
                      className="border border-border"
                    />
                    <Button
                      onClick={addAllergy}
                      size="sm"
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medications */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Current Medications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {profile.medications.map((medication) => (
                    <div
                      key={medication}
                      className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
                    >
                      <span className="text-sm text-foreground">{medication}</span>
                      {isEditing && (
                        <X
                          className="h-4 w-4 cursor-pointer text-red-600"
                          onClick={() => removeMedication(medication)}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-3">
                    <Input
                      placeholder="Add new medication..."
                      value={newMedication}
                      onChange={(e) => setNewMedication(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') addMedication()
                      }}
                      className="border border-border"
                    />
                    <Button
                      onClick={addMedication}
                      size="sm"
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chronic Conditions */}
            <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
              <CardHeader>
                <CardTitle className="text-yellow-600">Chronic Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {profile.chronicConditions.map((condition) => (
                    <div
                      key={condition}
                      className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
                    >
                      <span className="text-sm text-foreground">{condition}</span>
                      {isEditing && (
                        <X
                          className="h-4 w-4 cursor-pointer text-red-600"
                          onClick={() => removeCondition(condition)}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-3">
                    <Input
                      placeholder="Add new condition..."
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') addCondition()
                      }}
                      className="border border-border"
                    />
                    <Button
                      onClick={addCondition}
                      size="sm"
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Contact Tab */}
          <TabsContent value="emergency" className="mt-6">
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white max-w-2xl">
              <CardHeader>
                <CardTitle className="text-orange-600">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Contact Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={tempProfile.emergencyContactName}
                      onChange={(e) =>
                        handleInputChange('emergencyContactName', e.target.value)
                      }
                      className="border border-border"
                    />
                  ) : (
                    <p className="text-foreground">{profile.emergencyContactName}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Contact Phone
                  </label>
                  {isEditing ? (
                    <Input
                      value={tempProfile.emergencyContactPhone}
                      onChange={(e) =>
                        handleInputChange('emergencyContactPhone', e.target.value)
                      }
                      className="border border-border"
                    />
                  ) : (
                    <p className="text-foreground">{profile.emergencyContactPhone}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="mt-6">
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white max-w-2xl">
              <CardHeader>
                <CardTitle className="text-green-600">Insurance Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Insurance Provider
                  </label>
                  {isEditing ? (
                    <Input
                      value={tempProfile.insuranceProvider}
                      onChange={(e) =>
                        handleInputChange('insuranceProvider', e.target.value)
                      }
                      className="border border-border"
                    />
                  ) : (
                    <p className="text-foreground">{profile.insuranceProvider}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Policy Number
                  </label>
                  {isEditing ? (
                    <Input
                      value={tempProfile.insurancePolicyNumber}
                      onChange={(e) =>
                        handleInputChange('insurancePolicyNumber', e.target.value)
                      }
                      className="border border-border"
                    />
                  ) : (
                    <p className="text-foreground">{profile.insurancePolicyNumber}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
