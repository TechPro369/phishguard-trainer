import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, Award } from "lucide-react"

export default function EducationPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Security Awareness Education</h1>
        <p className="text-muted-foreground mt-2">
          Educational resources to help your team recognize and avoid phishing attacks.
        </p>
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="mb-6">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Phishing Fundamentals</CardTitle>
                  <Video className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Learn to identify common phishing techniques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span>30 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Modules:</span>
                    <span>5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Difficulty:</span>
                    <span>Beginner</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Course</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Social Engineering Tactics</CardTitle>
                  <Video className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Understanding psychological manipulation in attacks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span>45 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Modules:</span>
                    <span>7</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Difficulty:</span>
                    <span>Intermediate</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Course</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Advanced Threat Detection</CardTitle>
                  <Video className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Identifying sophisticated phishing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span>60 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Modules:</span>
                    <span>8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Difficulty:</span>
                    <span>Advanced</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Course</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Phishing Red Flags Guide</CardTitle>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Quick reference guide for identifying suspicious emails</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A comprehensive checklist of warning signs to look for in potential phishing emails, including
                  examples of real-world phishing attempts.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Security Best Practices</CardTitle>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Essential security habits for all employees</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A guide covering password management, multi-factor authentication, safe browsing habits, and other
                  critical security practices.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Incident Response Playbook</CardTitle>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>What to do if you suspect a phishing attack</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Step-by-step instructions for employees to follow when they believe they've encountered a phishing
                  attempt or security incident.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quizzes">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Phishing Identification Quiz</CardTitle>
                  <Award className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Test your ability to spot phishing emails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Questions:</span>
                    <span>10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Limit:</span>
                    <span>15 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Passing Score:</span>
                    <span>80%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Quiz</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Social Engineering Challenge</CardTitle>
                  <Award className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Identify manipulation tactics in various scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Questions:</span>
                    <span>8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Limit:</span>
                    <span>12 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Passing Score:</span>
                    <span>75%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Quiz</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Security Policy Assessment</CardTitle>
                  <Award className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Test your knowledge of company security policies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Questions:</span>
                    <span>15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Limit:</span>
                    <span>20 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Passing Score:</span>
                    <span>85%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Quiz</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Educational Resources</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Phishing Awareness Posters</CardTitle>
              <CardDescription>Downloadable materials for your workplace</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A collection of visually engaging posters that highlight key phishing warning signs and security best
                practices. Perfect for office spaces, break rooms, and common areas to reinforce security awareness.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Browse Posters</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Security Newsletter</CardTitle>
              <CardDescription>Stay updated on the latest threats and defenses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Subscribe to our monthly security newsletter featuring recent phishing trends, emerging threats,
                security tips, and success stories from organizations that have improved their security posture.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Subscribe</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-12 rounded-lg bg-muted p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Need Custom Training?</h3>
            <p className="text-muted-foreground mt-1">
              We can develop tailored security awareness programs for your organization's specific needs.
            </p>
          </div>
          <Button>Contact Us</Button>
        </div>
      </div>
    </div>
  )
}

