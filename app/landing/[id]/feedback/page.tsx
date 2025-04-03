import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react"

export default function FeedbackPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          </div>
          <CardTitle className="text-2xl text-center">This was a phishing simulation</CardTitle>
          <CardDescription className="text-center text-base">
            You've just participated in a security awareness exercise
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-lg font-medium text-amber-800">Why did we do this?</h3>
                <div className="mt-2 text-amber-700">
                  <p>
                    Phishing attacks are one of the most common ways organizations are compromised. This simulation
                    helps you recognize the warning signs of a real phishing attempt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium">Warning signs you should have noticed:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>The URL in your browser was not from our official domain</li>
            <li>The email created a sense of urgency to prompt immediate action</li>
            <li>There were subtle grammatical or formatting errors in the message</li>
            <li>The request for your credentials was unexpected and not through normal channels</li>
          </ul>

          <div className="rounded-md bg-green-50 p-4 border border-green-200 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ShieldCheck className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">What to do in a real situation</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    If you receive a suspicious email, don't click any links or download attachments. Report it to your
                    IT security team immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/education">View Security Resources</Link>
          </Button>
          <Button asChild>
            <Link href="/">
              Return to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

