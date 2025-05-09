export const agents = [
  {
    id: "email-automation",
    name: "Email Automation Agent",
    description:
      "Automatically categorize, respond to, and follow up on customer emails based on content and sentiment.",
    category: "customer-support",
    integrations: ["Gmail", "Outlook", "HubSpot", "Zendesk"],
    features: [
      "Email classification by intent",
      "Automated responses for common queries",
      "Follow-up scheduling",
      "Sentiment analysis",
      "Priority flagging",
    ],
    setupTime: "10 minutes",
    pricing: "Free / $19 per month (Pro)",
    tools: ["n8n", "OpenAI"],
    code: `
// Sample n8n workflow for email processing
{
  "nodes": [
    {
      "parameters": {
        "operation": "getEmails",
        "account": "{{$node.Gmail_Account.json}}",
        "limit": 10
      },
      "name": "Gmail",
      "type": "n8n-nodes-base.gmail"
    },
    {
      "parameters": {
        "prompt": "Analyze the following email and categorize it: {{$node.Gmail.json.body}}",
        "model": "gpt-4"
      },
      "name": "OpenAI",
      "type": "n8n-nodes-base.openai"
    }
  ]
}`,
  },
  {
    id: "crm-assistant",
    name: "CRM Assistant",
    description: "Update customer records, create leads, and manage follow-ups automatically in your CRM system.",
    category: "sales",
    integrations: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM"],
    features: [
      "Automatic contact creation",
      "Lead scoring",
      "Activity logging",
      "Follow-up reminders",
      "Deal stage updates",
    ],
    setupTime: "15 minutes",
    pricing: "$29 per month",
    tools: ["n8n", "OpenAI", "Zapier"],
    code: `
// Sample n8n workflow for CRM updates
{
  "nodes": [
    {
      "parameters": {
        "operation": "getContacts",
        "limit": 20
      },
      "name": "Salesforce",
      "type": "n8n-nodes-base.salesforce"
    },
    {
      "parameters": {
        "operation": "updateContact",
        "contactId": "{{$node.Salesforce.json.id}}",
        "data": {
          "status": "{{$node.OpenAI.json.recommendation}}"
        }
      },
      "name": "UpdateContact",
      "type": "n8n-nodes-base.salesforce"
    }
  ]
}`,
  },
  {
    id: "social-media-manager",
    name: "Social Media Manager",
    description: "Schedule, post, and analyze content across multiple social media platforms.",
    category: "marketing",
    integrations: ["Twitter", "Facebook", "Instagram", "LinkedIn"],
    features: [
      "Content scheduling",
      "Hashtag recommendations",
      "Engagement analytics",
      "Audience insights",
      "Content generation",
    ],
    setupTime: "10 minutes",
    pricing: "$24 per month",
    tools: ["n8n", "Buffer", "OpenAI"],
    code: `
// Sample n8n workflow for social media posting
{
  "nodes": [
    {
      "parameters": {
        "prompt": "Generate a social media post about: {{$node.Input.json.topic}}",
        "model": "gpt-4"
      },
      "name": "OpenAI",
      "type": "n8n-nodes-base.openai"
    },
    {
      "parameters": {
        "operation": "createPost",
        "platforms": ["twitter", "facebook"],
        "content": "{{$node.OpenAI.json.text}}"
      },
      "name": "Buffer",
      "type": "n8n-nodes-base.buffer"
    }
  ]
}`,
  },
  {
    id: "invoice-processor",
    name: "Invoice Processor",
    description: "Extract data from invoices, categorize expenses, and update accounting systems.",
    category: "finance",
    integrations: ["QuickBooks", "Xero", "FreshBooks", "Wave"],
    features: [
      "OCR for invoice scanning",
      "Expense categorization",
      "Tax calculation",
      "Payment tracking",
      "Reconciliation",
    ],
    setupTime: "20 minutes",
    pricing: "$39 per month",
    tools: ["n8n", "OpenAI", "Document AI"],
    code: `
// Sample n8n workflow for invoice processing
{
  "nodes": [
    {
      "parameters": {
        "operation": "extractText",
        "document": "{{$node.Input.json.invoice}}"
      },
      "name": "DocumentAI",
      "type": "n8n-nodes-base.documentAI"
    },
    {
      "parameters": {
        "operation": "createTransaction",
        "account": "{{$node.QuickBooks_Account.json}}",
        "data": {
          "amount": "{{$node.DocumentAI.json.amount}}",
          "category": "{{$node.DocumentAI.json.category}}"
        }
      },
      "name": "QuickBooks",
      "type": "n8n-nodes-base.quickbooks"
    }
  ]
}`,
  },
  {
    id: "recruitment-assistant",
    name: "Recruitment Assistant",
    description: "Screen resumes, schedule interviews, and manage candidate communications.",
    category: "hr",
    integrations: ["LinkedIn", "Greenhouse", "Workday", "BambooHR"],
    features: [
      "Resume parsing",
      "Candidate scoring",
      "Interview scheduling",
      "Automated follow-ups",
      "Onboarding preparation",
    ],
    setupTime: "25 minutes",
    pricing: "$34 per month",
    tools: ["n8n", "OpenAI", "Calendar API"],
    code: `
// Sample n8n workflow for resume screening
{
  "nodes": [
    {
      "parameters": {
        "operation": "extractText",
        "document": "{{$node.Input.json.resume}}"
      },
      "name": "DocumentAI",
      "type": "n8n-nodes-base.documentAI"
    },
    {
      "parameters": {
        "prompt": "Evaluate this resume for a {{$node.Input.json.position}} position: {{$node.DocumentAI.json.text}}",
        "model": "gpt-4"
      },
      "name": "OpenAI",
      "type": "n8n-nodes-base.openai"
    }
  ]
}`,
  },
  {
    id: "customer-feedback-analyzer",
    name: "Customer Feedback Analyzer",
    description: "Analyze customer feedback from multiple sources to identify trends and sentiment.",
    category: "customer-support",
    integrations: ["Zendesk", "SurveyMonkey", "Google Forms", "Typeform"],
    features: [
      "Sentiment analysis",
      "Topic clustering",
      "Trend identification",
      "Priority flagging",
      "Automated responses",
    ],
    setupTime: "15 minutes",
    pricing: "$29 per month",
    tools: ["n8n", "OpenAI", "Zapier"],
    code: `
// Sample n8n workflow for feedback analysis
{
  "nodes": [
    {
      "parameters": {
        "operation": "getSurveyResponses",
        "surveyId": "{{$node.Input.json.surveyId}}"
      },
      "name": "SurveyMonkey",
      "type": "n8n-nodes-base.surveyMonkey"
    },
    {
      "parameters": {
        "prompt": "Analyze this customer feedback and identify key themes: {{$node.SurveyMonkey.json.responses}}",
        "model": "gpt-4"
      },
      "name": "OpenAI",
      "type": "n8n-nodes-base.openai"
    }
  ]
}`,
  },
  {
    id: "content-generator",
    name: "Content Generator",
    description: "Generate blog posts, social media content, and marketing copy based on your brand guidelines.",
    category: "marketing",
    integrations: ["WordPress", "Medium", "Buffer", "HubSpot"],
    features: [
      "Blog post generation",
      "Social media content",
      "Email newsletters",
      "SEO optimization",
      "Content scheduling",
    ],
    setupTime: "10 minutes",
    pricing: "$24 per month",
    tools: ["n8n", "OpenAI", "Zapier"],
    code: `
// Sample n8n workflow for content generation
{
  "nodes": [
    {
      "parameters": {
        "prompt": "Write a blog post about {{$node.Input.json.topic}} in the style of {{$node.Input.json.brand}}",
        "model": "gpt-4"
      },
      "name": "OpenAI",
      "type": "n8n-nodes-base.openai"
    },
    {
      "parameters": {
        "operation": "createPost",
        "title": "{{$node.Input.json.title}}",
        "content": "{{$node.OpenAI.json.text}}",
        "status": "draft"
      },
      "name": "WordPress",
      "type": "n8n-nodes-base.wordpress"
    }
  ]
}`,
  },
  {
    id: "inventory-manager",
    name: "Inventory Manager",
    description: "Track inventory levels, predict restocking needs, and automate purchase orders.",
    category: "productivity",
    integrations: ["Shopify", "WooCommerce", "QuickBooks", "NetSuite"],
    features: [
      "Stock level monitoring",
      "Reorder predictions",
      "Purchase order automation",
      "Supplier management",
      "Inventory reports",
    ],
    setupTime: "20 minutes",
    pricing: "$34 per month",
    tools: ["n8n", "OpenAI", "Zapier"],
    code: `
// Sample n8n workflow for inventory management
{
  "nodes": [
    {
      "parameters": {
        "operation": "getProducts",
        "limit": 100
      },
      "name": "Shopify",
      "type": "n8n-nodes-base.shopify"
    },
    {
      "parameters": {
        "operation": "createPurchaseOrder",
        "supplier": "{{$node.Input.json.supplier}}",
        "items": "{{$node.Shopify.json.lowStockItems}}"
      },
      "name": "CreatePO",
      "type": "n8n-nodes-base.netsuite"
    }
  ]
}`,
  },
  {
    id: "meeting-summarizer",
    name: "Meeting Summarizer",
    description: "Record, transcribe, and summarize meetings with action items and follow-ups.",
    category: "productivity",
    integrations: ["Zoom", "Google Meet", "Microsoft Teams", "Slack"],
    features: [
      "Meeting recording",
      "Transcription",
      "Summary generation",
      "Action item extraction",
      "Follow-up scheduling",
    ],
    setupTime: "10 minutes",
    pricing: "$19 per month",
    tools: ["n8n", "OpenAI", "Whisper API"],
    code: `
// Sample n8n workflow for meeting summarization
{
  "nodes": [
    {
      "parameters": {
        "operation": "transcribe",
        "audioFile": "{{$node.Zoom.json.recordingUrl}}"
      },
      "name": "Whisper",
      "type": "n8n-nodes-base.whisper"
    },
    {
      "parameters": {
        "prompt": "Summarize this meeting transcript and extract action items: {{$node.Whisper.json.transcript}}",
        "model": "gpt-4"
      },
      "name": "OpenAI",
      "type": "n8n-nodes-base.openai"
    }
  ]
}`,
  },
]
