"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCampaigns } from "@/lib/db"
import { LineChart, PieChart, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [supabaseConfigured, setSupabaseConfigured] = useState(true)

  useEffect(() => {
    async function loadCampaigns() {
      try {
        setLoading(true)
        const data = await getCampaigns()
        setCampaigns(data)

        // Check if we're using mock data
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          setSupabaseConfigured(false)
        }
      } catch (err) {
        setError("Failed to load campaigns")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadCampaigns()
  }, [])

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Campaign Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage and monitor your phishing simulation campaigns.</p>
      </div>

      {!supabaseConfigured && (
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-yellow-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Database Not Configured
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700">
              The application is currently running with mock data because Supabase environment variables are not
              configured. To use a real database, please set up the following environment variables:
            </p>
            <ul className="list-disc pl-5 mt-2 text-yellow-700">
              <li>NEXT_PUBLIC_SUPABASE_URL</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            </ul>
            <p className="mt-2 text-yellow-700">
              You can still explore the application with mock data, but changes won't be persisted.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Campaigns</h2>
        <Button asChild>
          <Link href="/campaigns/new">Create Campaign</Link>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading campaigns...</div>
      ) : error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      ) : campaigns.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't created any campaigns yet.</p>
              <Button asChild>
                <Link href="/campaigns/new">Create Your First Campaign</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {campaigns.map((campaign: any) => (
                <Card key={campaign.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{campaign.name}</CardTitle>
                        <CardDescription>{campaign.description}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/campaigns/${campaign.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p>{new Date(campaign.start_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">End Date</p>
                        <p>{new Date(campaign.end_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Recipients</p>
                        <p>{campaign.recipients}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Click Rate</p>
                        <p>{campaign.click_rate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No completed campaigns yet.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              {campaigns.map((campaign: any) => (
                <Card key={campaign.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{campaign.name}</CardTitle>
                        <CardDescription>{campaign.description}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/campaigns/${campaign.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p>{new Date(campaign.start_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">End Date</p>
                        <p>{new Date(campaign.end_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Recipients</p>
                        <p>{campaign.recipients}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Click Rate</p>
                        <p>{campaign.click_rate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Click Rate Trend</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Click rate over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  {!supabaseConfigured
                    ? "Mock data - Configure Supabase to see real analytics"
                    : "Line chart visualization of click rates over time"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Department Vulnerability</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Click rates by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  {!supabaseConfigured
                    ? "Mock data - Configure Supabase to see real analytics"
                    : "Pie chart showing vulnerability distribution across departments"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

