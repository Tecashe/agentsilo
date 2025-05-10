import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small businesses just getting started with automation",
      features: [
        "Access to 5 pre-built agents",
        "3 active agents at a time",
        "Standard integrations",
        "Email support",
        "Basic analytics",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      description: "Ideal for growing businesses with more complex automation needs",
      features: [
        "Access to all pre-built agents",
        "10 active agents at a time",
        "All integrations",
        "Priority support",
        "Advanced analytics",
        "Custom agent configuration",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with advanced requirements and security needs",
      features: [
        "Unlimited agents",
        "Custom agent development",
        "Advanced security features",
        "Dedicated account manager",
        "SLA guarantees",
        "On-premise deployment options",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that's right for your business. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg relative" : ""}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">Most Popular</span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground ml-2">/month</span>}
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className={`w-full ${plan.popular ? "" : "bg-card hover:bg-card/80 text-foreground border"}`}
                variant={plan.popular ? "default" : "outline"}
              >
                <Link href={plan.name === "Enterprise" ? "/contact-sales" : "/signup"}>{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I switch plans later?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
              cycle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">What happens after the free trial?</h3>
            <p className="text-muted-foreground">
              After your 14-day trial, you'll be automatically subscribed to the plan you selected. You can cancel
              anytime before the trial ends.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
            <p className="text-muted-foreground">
              We offer a 30-day money-back guarantee if you're not satisfied with our service.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
