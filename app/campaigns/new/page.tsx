"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Mail, Upload, AlertCircle } from "lucide-react"
import { createCampaignAction } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export default function NewCampaign() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target)
      const result = await createCampaignAction(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Campaign created successfully",
        })
        router.push("/")
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create campaign",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Phishing Simulation</h1>
        <p className="text-muted-foreground mt-2">Design a phishing simulation campaign for educational purposes.</p>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "border border-input bg-background"}`}
          >
            1
          </div>
          <div className={`h-px w-12 ${step >= 2 ? "bg-primary" : "bg-border"}`} />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "border border-input bg-background"}`}
          >
            2
          </div>
          <div className={`h-px w-12 ${step >= 3 ? "bg-primary" : "bg-border"}`} />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "border border-input bg-background"}`}
          >
            3
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Step {step} of 3</div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>Set up the basic information for your phishing simulation campaign.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" name="name" placeholder="Q2 Security Awareness Training" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Brief description of the campaign's purpose and goals"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" name="startDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" name="endDate" type="date" required />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={() => setStep(2)}>
                  Next: Email Template
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Email Template</CardTitle>
              <CardDescription>Design the phishing email that will be sent to participants.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="template">
                <TabsList className="mb-4">
                  <TabsTrigger value="template">Use Template</TabsTrigger>
                  <TabsTrigger value="custom">Custom Email</TabsTrigger>
                </TabsList>

                <TabsContent value="template" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="template">Select Template</Label>
                    <Select name="template" defaultValue="password-reset">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="password-reset">Password Reset</SelectItem>
                        <SelectItem value="document-share">Document Share</SelectItem>
                        <SelectItem value="package-delivery">Package Delivery</SelectItem>
                        <SelectItem value="invoice">Invoice Payment</SelectItem>
                        <SelectItem value="account-verification">Account Verification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <p className="font-medium">IT Department &lt;it-noreply@company-portal.net&gt;</p>
                      </div>
                      <p className="font-medium">Subject: Urgent: Password Reset Required</p>
                      <div className="pt-2 text-sm">
                        <p>Dear Employee,</p>
                        <br />
                        <p>
                          Our security system has detected unusual login attempts to your account. As a precautionary
                          measure, we require you to reset your password immediately.
                        </p>
                        <br />
                        <p>Please click the link below to reset your password:</p>
                        <p className="my-2 text-blue-600 underline">https://company-portal.secure-login.net/reset</p>
                        <br />
                        <p>
                          If you do not reset your password within 24 hours, your account will be temporarily suspended.
                        </p>
                        <br />
                        <p>Thank you,</p>
                        <p>IT Security Team</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="sender">Sender Name</Label>
                    <Input id="sender" name="sender" placeholder="IT Department" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Sender Email</Label>
                    <Input id="senderEmail" name="senderEmail" placeholder="it-noreply@company-portal.net" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input id="subject" name="subject" placeholder="Urgent: Password Reset Required" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailBody">Email Body</Label>
                    <Textarea
                      id="emailBody"
                      name="emailBody"
                      placeholder="Enter the content of your phishing email"
                      className="min-h-[200px]"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="button" onClick={() => setStep(3)}>
                  Next: Target Audience
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Target Audience</CardTitle>
              <CardDescription>Select who will receive this phishing simulation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="audience">Selection Method</Label>
                <Select name="audience" defaultValue="department">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose selection method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Employees</SelectItem>
                    <SelectItem value="department">By Department</SelectItem>
                    <SelectItem value="role">By Role</SelectItem>
                    <SelectItem value="custom">Custom List</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Select Departments</Label>
                <Select name="department" defaultValue="it">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="csv-upload">Or Upload CSV File</Label>
                <div className="flex items-center justify-center border border-dashed rounded-md p-6">
                  <div className="flex flex-col items-center space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">Drag and drop CSV file here or click to browse</p>
                    <p className="text-xs text-muted-foreground">CSV format with email addresses</p>
                    <Button variant="outline" size="sm" type="button">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        This phishing simulation is for educational purposes only. Ensure you have proper authorization
                        before conducting simulated phishing campaigns. Always follow your organization's security
                        policies and applicable laws.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Launch Campaign"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  )
}

