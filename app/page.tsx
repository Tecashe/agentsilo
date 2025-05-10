import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Zap, Shield, Code, BarChart, Layers } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-gray-900 to-slate-800 dark:from-gray-950 dark:to-slate-900">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">AI Agents Marketplace for Your Business</h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Discover, deploy, and customize AI agents without any technical knowledge. Connect your tools and let
                automation work for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/marketplace">Explore Marketplace</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur-lg opacity-30"></div>
                <div className="relative bg-card rounded-lg shadow-2xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=500"
                    alt="AI Agents Dashboard"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse AI Agents</h3>
              <p className="text-muted-foreground">
                Explore our marketplace of pre-built AI agents and automations for various business needs.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Your Tools</h3>
              <p className="text-muted-foreground">
                Easily integrate with your existing business tools through our simple OAuth connections.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Deploy Securely</h3>
              <p className="text-muted-foreground">
                Deploy agents to your workflow with enterprise-grade security and compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our AI Agents</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI agents are designed to save you time, reduce errors, and increase productivity across your business
              operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-start p-6 bg-card rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No-Code Setup</h3>
              <p className="text-muted-foreground">
                Deploy sophisticated AI agents without writing a single line of code.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 bg-card rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
              <p className="text-muted-foreground">Connect with 50+ business tools and platforms you already use.</p>
            </div>

            <div className="flex flex-col items-start p-6 bg-card rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
              <p className="text-muted-foreground">
                Track and measure the impact of your AI agents with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Agents Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur-lg opacity-20"></div>
                <div className="relative bg-card rounded-lg shadow-xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=500"
                    alt="Custom AI Agent Creation"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Need a Custom AI Agent?</h2>
              <p className="text-xl text-muted-foreground">
                Can't find what you're looking for? Request a custom AI agent tailored to your specific business needs.
                Our team will build it for you.
              </p>
              <Button asChild>
                <Link href="/request-custom">
                  Request Custom Agent <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Trusted by Businesses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-muted-foreground">Marketing Director</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The social media management agent saved our team 15 hours per week. Integration was seamless."
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-muted-foreground">Sales Manager</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The CRM automation agent has increased our lead conversion by 30%. Incredible ROI."
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Jessica Williams</h4>
                  <p className="text-muted-foreground">Operations Lead</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "We requested a custom inventory management agent and it was delivered within a week. Exceptional
                service."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of businesses already using our AI agents to automate workflows and boost productivity.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/signup">Get Started for Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/marketplace" className="text-muted-foreground hover:text-foreground">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/request-custom" className="text-muted-foreground hover:text-foreground">
                    Custom Agents
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/documentation" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="text-muted-foreground hover:text-foreground">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-muted-foreground hover:text-foreground">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="text-muted-foreground hover:text-foreground">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t dark:border-gray-800 text-center text-muted-foreground">
            <p>© 2025 agentsilo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
