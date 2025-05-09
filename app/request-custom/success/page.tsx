import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function RequestSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Request Submitted!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your custom agent request. Our team will review your requirements and contact you soon.
        </p>
        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/marketplace">Explore Marketplace</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
