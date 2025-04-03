"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart, Download, Filter } from "lucide-react"

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState("30days")
  const [activeTab, setActiveTab] = useState("overview")

  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Campaign Reports</h1>
        <p className="text-muted-foreground mt-2">Analyze the results of your phishing simulation campaigns.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" type="button">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline" className="flex items-center gap-2" type="button">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Click Rate</CardTitle>
            <CardDescription>Percentage of users who clicked phishing links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24.3%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span>↓</span> 2.1% from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Credential Submission</CardTitle>
            <CardDescription>Users who entered credentials on phishing pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12.7%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span>↓</span> 1.5% from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Reporting Rate</CardTitle>
            <CardDescription>Users who reported the phishing attempt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">38.2%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span>↑</span> 5.4% from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
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
                  <p className="text-muted-foreground text-sm">Line chart visualization of click rates over time</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Campaign Performance</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Comparison across campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    Bar chart comparing performance metrics across campaigns
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
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
                    Pie chart showing vulnerability distribution across departments
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Results</CardTitle>
              <CardDescription>Detailed metrics for each campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                  <div className="col-span-2">Campaign Name</div>
                  <div>Date</div>
                  <div>Recipients</div>
                  <div>Click Rate</div>
                  <div>Submission Rate</div>
                  <div>Report Rate</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-7 gap-4 p-4 items-center">
                    <div className="col-span-2">Password Reset Campaign</div>
                    <div>Mar 15, 2023</div>
                    <div>145</div>
                    <div>24.3%</div>
                    <div>12.7%</div>
                    <div>38.2%</div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 p-4 items-center">
                    <div className="col-span-2">Document Share Simulation</div>
                    <div>Feb 22, 2023</div>
                    <div>132</div>
                    <div>31.2%</div>
                    <div>18.5%</div>
                    <div>29.7%</div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 p-4 items-center">
                    <div className="col-span-2">Package Delivery Notice</div>
                    <div>Jan 10, 2023</div>
                    <div>156</div>
                    <div>35.8%</div>
                    <div>22.1%</div>
                    <div>25.3%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Department Analysis</CardTitle>
              <CardDescription>Phishing susceptibility by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                  <div className="col-span-2">Department</div>
                  <div>Employees</div>
                  <div>Click Rate</div>
                  <div>Submission Rate</div>
                  <div>Report Rate</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-6 gap-4 p-4 items-center">
                    <div className="col-span-2">IT</div>
                    <div>28</div>
                    <div>14.3%</div>
                    <div>7.1%</div>
                    <div>64.3%</div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 p-4 items-center">
                    <div className="col-span-2">Finance</div>
                    <div>32</div>
                    <div>21.9%</div>
                    <div>12.5%</div>
                    <div>40.6%</div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 p-4 items-center">
                    <div className="col-span-2">Marketing</div>
                    <div>24</div>
                    <div>33.3%</div>
                    <div>16.7%</div>
                    <div>29.2%</div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 p-4 items-center">
                    <div className="col-span-2">Sales</div>
                    <div>36</div>
                    <div>30.6%</div>
                    <div>19.4%</div>
                    <div>25.0%</div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 p-4 items-center">
                    <div className="col-span-2">Human Resources</div>
                    <div>18</div>
                    <div>22.2%</div>
                    <div>11.1%</div>
                    <div>44.4%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Performance</CardTitle>
              <CardDescription>Individual user responses to phishing simulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                  <div className="col-span-2">Employee</div>
                  <div>Department</div>
                  <div>Campaigns</div>
                  <div>Clicked</div>
                  <div>Submitted</div>
                  <div>Reported</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-7 gap-4 p-4 items-center">
                    <div className="col-span-2">John Smith</div>
                    <div>IT</div>
                    <div>3</div>
                    <div>0</div>
                    <div>0</div>
                    <div>3</div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 p-4 items-center">
                    <div className="col-span-2">Sarah Johnson</div>
                    <div>Marketing</div>
                    <div>3</div>
                    <div>2</div>
                    <div>1</div>
                    <div>0</div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 p-4 items-center">
                    <div className="col-span-2">Michael Chen</div>
                    <div>Finance</div>
                    <div>3</div>
                    <div>1</div>
                    <div>0</div>
                    <div>2</div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 p-4 items-center">
                    <div className="col-span-2">Emily Davis</div>
                    <div>Sales</div>
                    <div>3</div>
                    <div>2</div>
                    <div>1</div>
                    <div>1</div>
                  </div>
                  <div className="grid grid-cols-7 gap-4 p-4 items-center">
                    <div className="col-span-2">Robert Wilson</div>
                    <div>HR</div>
                    <div>3</div>
                    <div>0</div>
                    <div>0</div>
                    <div>3</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

