import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Zap, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">AI Agents Marketplace for Your Business</h1>
              <p className="text-xl md:text-2xl opacity-90">
                Discover, deploy, and customize AI agents without any technical knowledge. Connect your tools and let
                automation work for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/marketplace">Explore Marketplace</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="AI Agents Dashboard"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse AI Agents</h3>
              <p className="text-gray-600">
                Explore our marketplace of pre-built AI agents and automations for various business needs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Your Tools</h3>
              <p className="text-gray-600">
                Easily integrate with your existing business tools through our simple OAuth connections.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Deploy Securely</h3>
              <p className="text-gray-600">
                Deploy agents to your workflow with enterprise-grade security and compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Agents Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Custom AI Agent Creation"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Need a Custom AI Agent?</h2>
              <p className="text-xl text-gray-600">
                Can't find what you're looking for? Request a custom AI agent tailored to your specific business needs.
                Our team will build it for you.
              </p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/request-custom">
                  Request Custom Agent <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Trusted by Businesses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-500">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The social media management agent saved our team 15 hours per week. Integration was seamless."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-gray-500">Sales Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The CRM automation agent has increased our lead conversion by 30%. Incredible ROI."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Jessica Williams</h4>
                  <p className="text-gray-500">Operations Lead</p>
                </div>
              </div>
              <p className="text-gray-600">
                "We requested a custom inventory management agent and it was delivered within a week. Exceptional
                service."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already using our AI agents to automate workflows and boost productivity.
          </p>
          <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
            <Link href="/signup">Get Started for Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/marketplace" className="hover:text-purple-300">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-purple-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/request-custom" className="hover:text-purple-300">
                    Custom Agents
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-purple-300">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-purple-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-purple-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-purple-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-purple-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/documentation" className="hover:text-purple-300">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="hover:text-purple-300">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-purple-300">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-purple-300">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="hover:text-purple-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-purple-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-purple-300">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="hover:text-purple-300">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 AI Agents Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
