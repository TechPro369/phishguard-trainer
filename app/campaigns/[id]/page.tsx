"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCampaignById, mockUsers } from "@/lib/db"
import { ChevronLeft, Mail, AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const [campaign, setCampaign] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadCampaign() {
      try {
        setLoading(true)
        const data = await getCampaignById(params.id)
        if (!data) {
          setError("Campaign not found")
        } else {
          setCampaign(data)
        }
      } catch (err) {
        setError("Failed to load campaign details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadCampaign()
  }, [params.id])

  if (loading) {
    return <div className="container py-10 text-center">Loading campaign details...</div>
  }

  if (error || !campaign) {
    return (
      <div className="container py-10">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-700">{error || "Campaign not found"}</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Generate mock user interactions based on the campaign stats
  const mockInteractions = mockUsers.map((user) => {
    const clicked = Math.random() < campaign.click_rate / 100
    const submitted = clicked && Math.random() < campaign.submission_rate / campaign.click_rate
    const reported = Math.random() < campaign.report_rate / 100

    return {
      ...user,
      clicked,
      submitted,
      reported,
    }
  })

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
          <p className="text-muted-foreground mt-2">{campaign.description}</p>
        </div>
        <Button>Send Reminder</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Active
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recipients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.recipients}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.click_rate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Report Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.report_rate}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recipients">Recipients</TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Template</dt>
                    <dd className="font-medium">
                      {campaign.template.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Start Date</dt>
                    <dd className="font-medium">{new Date(campaign.start_date).toLocaleDateString()}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">End Date</dt>
                    <dd className="font-medium">{new Date(campaign.end_date).toLocaleDateString()}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Target Audience</dt>
                    <dd className="font-medium">
                      {campaign.audience === "department" ? `Department: ${campaign.department}` : campaign.audience}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                    <dd className="font-medium">{new Date(campaign.created_at).toLocaleDateString()}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Results Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Emails Sent</dt>
                    <dd className="font-medium">{campaign.recipients}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Opened</dt>
                    <dd className="font-medium">
                      {Math.round(campaign.recipients * 0.85)} ({Math.round(85)}%)
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Clicked Link</dt>
                    <dd className="font-medium">
                      {Math.round((campaign.recipients * campaign.click_rate) / 100)} ({campaign.click_rate}%)
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Submitted Data</dt>
                    <dd className="font-medium">
                      {Math.round((campaign.recipients * campaign.submission_rate) / 100)} ({campaign.submission_rate}%)
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Reported Phishing</dt>
                    <dd className="font-medium">
                      {Math.round((campaign.recipients * campaign.report_rate) / 100)} ({campaign.report_rate}%)
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recipients">
          <Card>
            <CardHeader>
              <CardTitle>Recipient Interactions</CardTitle>
              <CardDescription>Individual responses to the phishing simulation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                  <div className="col-span-2">Employee</div>
                  <div>Department</div>
                  <div>Clicked</div>
                  <div>Submitted Data</div>
                  <div>Reported</div>
                </div>
                <div className="divide-y">
                  {mockInteractions.map((user) => (
                    <div key={user.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                      <div className="col-span-2">{user.email}</div>
                      <div>{user.department}</div>
                      <div>
                        {user.clicked ? (
                          <CheckCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        {user.submitted ? (
                          <CheckCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        {user.reported ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="template">
          <Card>
            <CardHeader>
              <CardTitle>Email Template</CardTitle>
              <CardDescription>Preview of the phishing email sent to recipients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-6">
                <div className="space-y-4">
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
              <div className="mt-6 rounded-md bg-yellow-50 p-4 border border-yellow-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Educational Note</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        This template contains several common phishing indicators: urgency, threat of negative
                        consequences, and a suspicious link that doesn't match the organization's actual domain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
              <CardDescription>Manage your campaign configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Campaign Status</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Pause Campaign</Button>
                  <Button variant="outline" className="text-red-500 hover:text-red-500">
                    End Campaign
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Notification Settings</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Configure Notifications</Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Export Data</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Export to CSV</Button>
                  <Button variant="outline">Export to PDF</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

