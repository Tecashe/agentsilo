-- Function to seed enhanced agents with detailed setup instructions and other new features
CREATE OR REPLACE FUNCTION seed_enhanced_agents(admin_id UUID)
RETURNS VOID AS $$
BEGIN
    -- 1. Email Sentiment Analyzer
    INSERT INTO workflows (
        id, 
        name, 
        description, 
        category, 
        n8n_workflow_id, 
        pricing, 
        integrations, 
        features, 
        setup_instructions,
        setup_time,
        tutorial_video_url,
        tutorial_video_title,
        flow_diagram_url,
        faq,
        integration_guides,
        testimonials,
        use_cases,
        created_by
    ) VALUES (
        'email-sentiment-analyzer',
        'Email Sentiment Analyzer',
        'Automatically analyze the sentiment of incoming emails and categorize them based on urgency and tone',
        'communication',
        '12346',
        '$19.99/month',
        ARRAY['Gmail', 'Slack', 'Microsoft Teams'],
        ARRAY[
            'Sentiment analysis of incoming emails',
            'Automatic categorization by urgency',
            'Priority inbox management',
            'Notification for highly negative emails',
            'Weekly sentiment reports'
        ],
        E'# Setting Up Your Email Sentiment Analyzer\n\n## Step 1: Connect Your Email Account\nConnect your Gmail account by clicking the "Connect Gmail" button. You will need to authorize access to your inbox.\n\n## Step 2: Configure Notification Settings\nChoose where you want to receive notifications for urgent or negative emails. You can select Slack, Microsoft Teams, or both.\n\n## Step 3: Set Sentiment Thresholds\nAdjust the sensitivity of the sentiment analyzer. By default, emails with a sentiment score below -0.5 are flagged as negative.\n\n## Step 4: Test the Workflow\nSend a test email to your connected account to verify the sentiment analysis is working correctly.',
        '15 minutes',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'How to Set Up Email Sentiment Analysis in 3 Minutes',
        'https://mermaid.ink/img/pako:eNptkMFqwzAMhl9F-NRB8wK5ZGm3HQaDXXoRwaosajE2sp1tJXn3OVkKHWMnyZ_-T58EO-8QFWzwGLxhfPAjYcSvYMkNZMmJXpNzI_mEbOGFvYsJnpLfUyTDjs4QU8JuTBHZUfKWkO9pjMGH9BfzlVQjKzCaUoJtCqUot1ApWEEcZ3HBi1JQZd0y3ZbVelNW9_fFTQl1XZeP2zWIBfSBDVvXs6XTTPn_adZUxXq1ftoUxQJ6b5mO6JLlhAZRZXQuWP_OOhvRKMhvg8VTdIFGBT9JwdHZM-roFKxGZ3v0-kzpF9slXQM',
        '[{"question":"How accurate is the sentiment analysis?","answer":"Our sentiment analysis is powered by advanced AI and achieves approximately 85-90% accuracy for English language emails."},{"question":"Can I customize the categories?","answer":"Yes, you can create custom categories and rules based on keywords, sentiment scores, and sender information."},{"question":"Does it work with languages other than English?","answer":"Currently, we support English, Spanish, French, German, and Italian. More languages are being added regularly."}]',
        '[{"integration":"Gmail","title":"Setting up Gmail Integration","content":"To connect your Gmail account, youll need to authorize access using OAuth. Click the Connect button and follow the prompts.","video_url":"https://www.youtube.com/embed/example1"},{"integration":"Slack","title":"Connecting to Slack","content":"To receive notifications in Slack, youll need to create a Slack app and generate a webhook URL. Then paste the URL in the settings page.","video_url":"https://www.youtube.com/embed/example2"}]',
        '[{"name":"John Smith","company":"Acme Inc","quote":"This tool has saved our customer service team hours of work by automatically prioritizing urgent customer emails.","rating":5},{"name":"Sarah Johnson","company":"TechStart","quote":"The sentiment analysis is surprisingly accurate. It helps us identify unhappy customers before issues escalate.","rating":4}]',
        '[{"title":"Customer Service","description":"Automatically prioritize customer support emails based on sentiment and urgency."},{"title":"Sales Team","description":"Identify hot leads and urgent customer requests to improve response time."},{"title":"Executive Assistant","description":"Filter and prioritize emails for executives, ensuring urgent matters get immediate attention."}]',
        admin_id
    ) ON CONFLICT (id) DO NOTHING;

    -- 2. Social Media Content Calendar
    INSERT INTO workflows (
        id, 
        name, 
        description, 
        category, 
        n8n_workflow_id, 
        pricing, 
        integrations, 
        features, 
        setup_instructions,
        setup_time,
        tutorial_video_url,
        tutorial_video_title,
        flow_diagram_url,
        faq,
        integration_guides,
        testimonials,
        use_cases,
        created_by
    ) VALUES (
        'social-media-calendar',
        'Social Media Content Calendar',
        'Plan, schedule, and analyze your social media content across multiple platforms with an intelligent content calendar',
        'marketing',
        '23457',
        '$29.99/month',
        ARRAY['Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'Buffer'],
        ARRAY[
            'Visual content calendar',
            'Cross-platform scheduling',
            'Content performance analytics',
            'AI-powered content suggestions',
            'Optimal posting time recommendations',
            'Hashtag analytics and suggestions'
        ],
        E'# Setting Up Your Social Media Content Calendar\n\n## Step 1: Connect Your Social Accounts\nConnect each of your social media accounts using the integration buttons. You will need to authorize access to post on your behalf.\n\n## Step 2: Import Existing Content\nIf you have existing content in a spreadsheet, you can import it using our CSV template.\n\n## Step 3: Set Your Content Categories\nCreate content categories (e.g., Blog Promotion, Product Updates, Industry News) to organize your posts.\n\n## Step 4: Configure Posting Schedule\nSet your preferred posting times for each platform, or use our AI to recommend optimal times based on your audience.\n\n## Step 5: Create Your First Post\nCreate a post and schedule it across multiple platforms. You can customize the content for each platform if needed.',
        '20 minutes',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'How to Schedule a Month of Content in 10 Minutes',
        'https://mermaid.ink/img/pako:eNptkMFqwzAMhl9F-NRB8wK5ZGm3HQaDXXoRwaosajE2sp1tJXn3OVkKHWMnyZ_-T58EO-8QFWzwGLxhfPAjYcSvYMkNZMmJXpNzI_mEbOGFvYsJnpLfUyTDjs4QU8JuTBHZUfKWkO9pjMGH9BfzlVQjKzCaUoJtCqUot1ApWEEcZ3HBi1JQZd0y3ZbVelNW9_fFTQl1XZeP2zWIBfSBDVvXs6XTTPn_adZUxXq1ftoUxQJ6b5mO6JLlhAZRZXQuWP_OOhvRKMhvg8VTdIFGBT9JwdHZM-roFKxGZ3v0-kzpF9slXQM',
        '[{"question":"Can I bulk upload content?","answer":"Yes, you can upload content in bulk using our CSV template or connect to Google Sheets for automatic syncing."},{"question":"Does it support video content?","answer":"Yes, you can schedule and post videos to platforms that support video content, including Instagram, Facebook, Twitter, and LinkedIn."},{"question":"Can I see which posts perform best?","answer":"Our analytics dashboard shows you engagement metrics across all platforms, helping you identify your top-performing content."}]',
        '[{"integration":"Twitter","title":"Setting up Twitter Integration","content":"To connect your Twitter account, youll need to authorize access using OAuth. Click the Connect button and follow the prompts.","video_url":"https://www.youtube.com/embed/example3"},{"integration":"Instagram","title":"Connecting to Instagram","content":"Instagram requires a Facebook Business account. Make sure you have admin access to your Facebook page before connecting.","video_url":"https://www.youtube.com/embed/example4"}]',
        '[{"name":"Emily Rodriguez","company":"Fashion Brand Co","quote":"Weve increased our engagement by 45% since using this tool to optimize our posting schedule.","rating":5},{"name":"Michael Chen","company":"Tech Insights Blog","quote":"The content suggestions have been a game-changer for our team. Were never out of ideas now.","rating":5}]',
        '[{"title":"Marketing Agency","description":"Manage multiple client social media accounts from a single dashboard."},{"title":"Small Business","description":"Maintain a consistent social media presence without dedicating hours each day."},{"title":"Content Creator","description":"Plan and schedule content across platforms to maximize reach and engagement."}]',
        admin_id
    ) ON CONFLICT (id) DO NOTHING;

    -- 3. Automated Customer Onboarding
    INSERT INTO workflows (
        id, 
        name, 
        description, 
        category, 
        n8n_workflow_id, 
        pricing, 
        integrations, 
        features, 
        setup_instructions,
        setup_time,
        tutorial_video_url,
        tutorial_video_title,
        flow_diagram_url,
        faq,
        integration_guides,
        testimonials,
        use_cases,
        created_by
    ) VALUES (
        'customer-onboarding-automation',
        'Automated Customer Onboarding',
        'Streamline your customer onboarding process with automated welcome emails, resource distribution, and progress tracking',
        'customer support',
        '34568',
        '$39.99/month',
        ARRAY['Gmail', 'Salesforce', 'HubSpot', 'Slack', 'Google Drive'],
        ARRAY[
            'Personalized welcome email sequences',
            'Automatic resource distribution',
            'Onboarding progress tracking',
            'Task assignment for customer success team',
            'Scheduled check-in reminders',
            'Customer health scoring'
        ],
        E'# Setting Up Your Customer Onboarding Automation\n\n## Step 1: Connect Your CRM\nConnect your Salesforce or HubSpot account to sync customer data.\n\n## Step 2: Set Up Email Templates\nCreate or import your welcome email templates. You can personalize these with customer data from your CRM.\n\n## Step 3: Configure Resource Distribution\nUpload your onboarding resources (guides, videos, etc.) and set rules for when each should be sent.\n\n## Step 4: Define Onboarding Milestones\nCreate milestones to track customer progress through the onboarding journey.\n\n## Step 5: Set Up Team Notifications\nConfigure when and how your team should be notified about customer progress or issues.\n\n## Step 6: Activate Your Workflow\nActivate the workflow and test it with a sample customer to ensure everything works correctly.',
        '30 minutes',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'Creating the Perfect Customer Onboarding Experience',
        'https://mermaid.ink/img/pako:eNptkMFqwzAMhl9F-NRB8wK5ZGm3HQaDXXoRwaosajE2sp1tJXn3OVkKHWMnyZ_-T58EO-8QFWzwGLxhfPAjYcSvYMkNZMmJXpNzI_mEbOGFvYsJnpLfUyTDjs4QU8JuTBHZUfKWkO9pjMGH9BfzlVQjKzCaUoJtCqUot1ApWEEcZ3HBi1JQZd0y3ZbVelNW9_fFTQl1XZeP2zWIBfSBDVvXs6XTTPn_adZUxXq1ftoUxQJ6b5mO6JLlhAZRZXQuWP_OOhvRKMhvg8VTdIFGBT9JwdHZM-roFKxGZ3v0-kzpF9slXQM',
        '[{"question":"Can I customize the onboarding steps?","answer":"Yes, you can create a completely custom onboarding journey with as many steps as needed for your product or service."},{"question":"How does it track customer progress?","answer":"Progress is tracked through email opens, link clicks, resource downloads, and completion of tasks in your CRM."},{"question":"Can I have different onboarding flows for different products?","answer":"You can create multiple onboarding workflows and assign customers to the appropriate one based on their product or service."}]',
        '[{"integration":"Salesforce","title":"Setting up Salesforce Integration","content":"To connect your Salesforce account, youll need to create a connected app and generate API credentials.","video_url":"https://www.youtube.com/embed/example5"},{"integration":"HubSpot","title":"Connecting to HubSpot","content":"To connect HubSpot, you will need to generate an API key from your HubSpot developer settings.","video_url":"https://www.youtube.com/embed/example6"}]',
        '[{"name":"David Wilson","company":"SaaS Platform Inc","quote":"We have reduced our customer onboarding time by 60% and increased activation rates by 35% using this automation.","rating":5},{"name":"Lisa Thompson","company":"Financial Services Co","quote":"Our customers love the personalized onboarding experience, and our team saves hours each week on manual tasks.","rating":4}]',
        '[{"title":"SaaS Companies","description":"Automate the onboarding process for new users to increase activation and reduce time-to-value."},{"title":"Consulting Firms","description":"Streamline client onboarding with automatic document collection and milestone tracking."},{"title":"Financial Services","description":"Guide new customers through account setup and required documentation with personalized instructions."}]',
        admin_id
    ) ON CONFLICT (id) DO NOTHING;

    -- 4. Inventory Management System
    INSERT INTO workflows (
        id, 
        name, 
        description, 
        category, 
        n8n_workflow_id, 
        pricing, 
        integrations, 
        features, 
        setup_instructions,
        setup_time,
        tutorial_video_url,
        tutorial_video_title,
        flow_diagram_url,
        faq,
        integration_guides,
        testimonials,
        use_cases,
        created_by
    ) VALUES (
        'inventory-management',
        'Inventory Management System',
        'Automate inventory tracking, reordering, and reporting across multiple sales channels',
        'e-commerce',
        '45679',
        '$49.99/month',
        ARRAY['Shopify', 'Amazon', 'QuickBooks', 'Slack', 'Google Sheets'],
        ARRAY[
            'Real-time inventory syncing across platforms',
            'Automatic reorder notifications',
            'Sales velocity tracking',
            'Inventory forecasting',
            'Low stock alerts',
            'Supplier management'
        ],
        E'# Setting Up Your Inventory Management System\n\n## Step 1: Connect Your Sales Channels\nConnect your Shopify store, Amazon seller account, and any other sales channels.\n\n## Step 2: Import Your Current Inventory\nImport your existing inventory data or start fresh by adding products manually.\n\n## Step 3: Set Reorder Points\nDefine minimum stock levels for each product to trigger reorder notifications.\n\n## Step 4: Connect Accounting Software\nLink your QuickBooks or other accounting software to track inventory value.\n\n## Step 5: Configure Notifications\nSet up where and when you want to receive inventory alerts (email, Slack, etc.).\n\n## Step 6: Set Up Reporting\nConfigure regular inventory reports to be sent to stakeholders.',
        '45 minutes',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'Managing Multi-Channel Inventory Like a Pro',
        'https://mermaid.ink/img/pako:eNptkMFqwzAMhl9F-NRB8wK5ZGm3HQaDXXoRwaosajE2sp1tJXn3OVkKHWMnyZ_-T58EO-8QFWzwGLxhfPAjYcSvYMkNZMmJXpNzI_mEbOGFvYsJnpLfUyTDjs4QU8JuTBHZUfKWkO9pjMGH9BfzlVQjKzCaUoJtCqUot1ApWEEcZ3HBi1JQZd0y3ZbVelNW9_fFTQl1XZeP2zWIBfSBDVvXs6XTTPn_adZUxXq1ftoUxQJ6b5mO6JLlhAZRZXQuWP_OOhvRKMhvg8VTdIFGBT9JwdHZM-roFKxGZ3v0-kzpF9slXQM',
        '[{"question":"Can it handle multiple warehouses?","answer":"Yes, you can manage inventory across multiple warehouses or locations, with transfer tracking between them."},{"question":"Does it work with barcode scanners?","answer":"Yes, we support integration with most barcode scanners for quick inventory updates and counts."},{"question":"Can I track manufacturing components?","answer":"Yes, you can track both finished products and their components, with bill of materials support."}]',
        '[{"integration":"Shopify","title":"Setting up Shopify Integration","content":"To connect your Shopify store, you will need to create a private app in your Shopify admin and generate API credentials.","video_url":"https://www.youtube.com/embed/example7"},{"integration":"Amazon","title":"Connecting to Amazon Seller Central","content":"To connect Amazon, you will need to generate MWS credentials from your Amazon Seller Central account.","video_url":"https://www.youtube.com/embed/example8"}]',
        '[{"name":"Robert Chen","company":"Outdoor Gear Shop","quote":"This system has eliminated overselling across our Shopify and Amazon stores, saving us thousands in customer service issues.","rating":5},{"name":"Amanda Johnson","company":"Handmade Crafts Co","quote":"As a small business, keeping track of inventory was a nightmare before. Now it is all automated and I can focus on creating products.","rating":5}]',
        '[{"title":"Retail Stores","description":"Sync inventory between physical and online stores to prevent overselling."},{"title":"Manufacturers","description":"Track raw materials, work-in-progress, and finished goods inventory."},{"title":"Wholesale Distributors","description":"Manage large inventories across multiple warehouses with automated reordering."}]',
        admin_id
    ) ON CONFLICT (id) DO NOTHING;

    -- 5. AI Content Generator
    INSERT INTO workflows (
        id, 
        name, 
        description, 
        category, 
        n8n_workflow_id, 
        pricing, 
        integrations, 
        features, 
        setup_instructions,
        setup_time,
        tutorial_video_url,
        tutorial_video_title,
        flow_diagram_url,
        faq,
        integration_guides,
        testimonials,
        use_cases,
        created_by
    ) VALUES (
        'ai-content-generator',
        'AI Content Generator',
        'Generate high-quality blog posts, social media content, and marketing copy with advanced AI',
        'marketing',
        '56780',
        '$59.99/month',
        ARRAY['WordPress', 'Buffer', 'Google Docs', 'Mailchimp', 'Airtable'],
        ARRAY[
            'Blog post generation',
            'Social media caption creation',
            'Email newsletter writing',
            'Product description generation',
            'SEO optimization',
            'Content calendar integration'
        ],
        E'# Setting Up Your AI Content Generator\n\n## Step 1: Connect Your Publishing Platforms\nConnect WordPress, Buffer, or other platforms where you want to publish content.\n\n## Step 2: Define Your Brand Voice\nCreate a brand voice profile by providing examples of your existing content and preferred tone.\n\n## Step 3: Set Up Content Types\nDefine the types of content you want to generate (blog posts, social media, emails, etc.).\n\n## Step 4: Create Content Briefs\nSet up templates for content briefs to guide the AI in generating relevant content.\n\n## Step 5: Configure Publishing Workflow\nDecide if you want content to be published automatically or sent for review.\n\n## Step 6: Schedule Content Generation\nSet up a schedule for when you want content to be generated and published.',
        '25 minutes',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'Creating a Month of Content in One Click',
        'https://mermaid.ink/img/pako:eNptkMFqwzAMhl9F-NRB8wK5ZGm3HQaDXXoRwaosajE2sp1tJXn3OVkKHWMnyZ_-T58EO-8QFWzwGLxhfPAjYcSvYMkNZMmJXpNzI_mEbOGFvYsJnpLfUyTDjs4QU8JuTBHZUfKWkO9pjMGH9BfzlVQjKzCaUoJtCqUot1ApWEEcZ3HBi1JQZd0y3ZbVelNW9_fFTQl1XZeP2zWIBfSBDVvXs6XTTPn_adZUxXq1ftoUxQJ6b5mO6JLlhAZRZXQuWP_OOhvRKMhvg8VTdIFGBT9JwdHZM-roFKxGZ3v0-kzpF9slXQM',
        '[{"question":"How original is the content?","answer":"Our AI generates unique content for each request, though you should always review for accuracy and brand voice alignment."},{"question":"Can I edit the generated content?","answer":"Yes, all generated content can be edited before publishing. You can also provide feedback to improve future generations."},{"question":"Does it handle images too?","answer":"The AI focuses on text content, but it can suggest image descriptions and alt text. You will need to add actual images separately."}]',
        '[{"integration":"WordPress","title":"Setting up WordPress Integration","content":"To connect your WordPress site, you will need to install our plugin and generate an application password.","video_url":"https://www.youtube.com/embed/example9"},{"integration":"Buffer","title":"Connecting to Buffer","content":"To connect Buffer, authorize access through OAuth to allow posting to your social media accounts.","video_url":"https://www.youtube.com/embed/example10"}]',
        '[{"name":"Jessica Martinez","company":"Digital Marketing Agency","quote":"We have cut our content creation time by 70% while maintaining quality our clients love.","rating":5},{"name":"Thomas Wright","company":"SaaS Blog","quote":"The AI generates technical content that actually makes sense - a huge time saver for our team.","rating":4}]',
        '[{"title":"Content Marketing Teams","description":"Scale content production without increasing headcount."},{"title":"Small Business Owners","description":"Maintain a consistent content schedule without hiring a dedicated writer."},{"title":"E-commerce Stores","description":"Generate product descriptions, email campaigns, and social media content at scale."}]',
        admin_id
    ) ON CONFLICT (id) DO NOTHING;

    -- 6. Automated Invoice Processing
    INSERT INTO workflows (
        id, 
        name, 
        description, 
        category, 
        n8n_workflow_id, 
        pricing, 
        integrations, 
        features, 
        setup_instructions,
        setup_time,
        tutorial_video_url,
        tutorial_video_title,
        flow_diagram_url,
        faq,
        integration_guides,
        testimonials,
        use_cases,
        created_by
    ) VALUES (
        'automated-invoice-processing',
        'Automated Invoice Processing',
        'Extract data from invoices, process payments, and update accounting systems automatically',
        'finance',
        '67891',
        '$39.99/month',
        ARRAY['QuickBooks', 'Xero', 'Gmail', 'Dropbox', 'Stripe'],
        ARRAY[
            'Invoice data extraction with OCR',
            'Automatic payment processing',
            'Accounting system updates',
            'Approval workflow automation',
            'Vendor management',
            'Payment reconciliation'
        ],
        E'# Setting Up Your Automated Invoice Processing\n\n## Step 1: Connect Your Email or Document Storage\nConnect Gmail, Dropbox, or other sources where you receive invoices.\n\n## Step 2: Connect Your Accounting Software\nLink QuickBooks, Xero, or other accounting systems where invoice data should be sent.\n\n## Step 3: Configure Data Extraction\nTrain the system to recognize your common invoice formats and extract relevant data.\n\n## Step 4: Set Up Approval Workflows\nDefine who needs to approve invoices and at what threshold amounts.\n\n## Step 5: Connect Payment Processors\nLink payment systems like Stripe or bank accounts for automatic payment processing.\n\n## Step 6: Test the System\nProcess a few sample invoices to ensure data is being extracted and processed correctly.',
        '40 minutes',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'Automating Your Accounts Payable Process',
        'https://mermaid.ink/img/pako:eNptkMFqwzAMhl9F-NRB8wK5ZGm3HQaDXXoRwaosajE2sp1tJXn3OVkKHWMnyZ_-T58EO-8QFWzwGLxhfPAjYcSvYMkNZMmJXpNzI_mEbOGFvYsJnpLfUyTDjs4QU8JuTBHZUfKWkO9pjMGH9BfzlVQjKzCaUoJtCqUot1ApWEEcZ3HBi1JQZd0y3ZbVelNW9_fFTQl1XZeP2zWIBfSBDVvXs6XTTPn_adZUxXq1ftoUxQJ6b5mO6JLlhAZRZXQuWP_OOhvRKMhvg8VTdIFGBT9JwdHZM-roFKxGZ3v0-kzpF9slXQM',
        '[{"question":"What invoice formats are supported?","answer":"We support PDF, image (JPG, PNG), and email invoices. Our OCR technology can extract data from most standard invoice layouts."},{"question":"How accurate is the data extraction?","answer":"Our system achieves 95%+ accuracy for standard invoices. You can always review and correct any data before processing."},{"question":"Can it handle recurring invoices?","answer":"Yes, you can set up rules for recurring invoices to be automatically approved and paid based on predefined criteria."}]',
        '[{"integration":"QuickBooks","title":"Setting up QuickBooks Integration","content":"To connect QuickBooks, you will need to authorize access through the QuickBooks app center.","video_url":"https://www.youtube.com/embed/example11"},{"integration":"Xero","title":"Connecting to Xero","content":"To connect Xero, create an API application in your Xero developer account and generate OAuth credentials.","video_url":"https://www.youtube.com/embed/example12"}]',
        '[{"name":"Jennifer Lee","company":"Accounting Firm","quote":"We have reduced invoice processing time from 15 minutes to 2 minutes per invoice, saving our firm thousands of hours annually.","rating":5},{"name":"Mark Davis","company":"Construction Company","quote":"Managing invoices from dozens of suppliers was a full-time job. Now it is fully automated and error-free.","rating":5}]',
        '[{"title":"Accounting Departments","description":"Automate the entire accounts payable process from receipt to payment."},{"title":"Small Businesses","description":"Eliminate manual data entry and ensure invoices are paid on time."},{"title":"Bookkeeping Services","description":"Scale your client services without increasing staff."}]',
        admin_id
    ) ON CONFLICT (id) DO NOTHING;

    -- 7. Customer Feedback Analyzer
    INSERT INTO workflows (
        id, 
        name, 
        description, 
        category, 
        n8n_workflow_id, 
        pricing, 
        integrations, 
        features, 
        setup_instructions,
        setup_time,
        tutorial_video_url,
        tutorial_video_title,
        flow_diagram_url,
        faq,
        integration_guides,
        testimonials,
        use_cases,
        created_by
    ) VALUES (
        'customer-feedback-analyzer',
        'Customer Feedback Analyzer',
        'Collect, analyze, and act on customer feedback from multiple channels automatically',
        'customer support',
        '78902',
        '$34.99/month',
        ARRAY['Zendesk', 'SurveyMonkey', 'Google Forms', 'Slack', 'Trello'],
        ARRAY[
            'Multi-channel feedback collection',
            'Sentiment analysis',
            'Theme identification',
            'Automated response suggestions',
            'Feedback trends dashboard',
            'Priority issue detection'
        ],
        E'# Setting Up Your Customer Feedback Analyzer\n\n## Step 1: Connect Your Feedback Channels\nConnect support systems, survey tools, and other sources of customer feedback.\n\n## Step 2: Configure Analysis Parameters\nDefine what themes and sentiments you want to track in customer feedback.\n\n## Step 3: Set Up Response Workflows\nCreate automated workflows for responding to different types of feedback.\n\n## Step 4: Configure Alerts\nSet up alerts for critical feedback that requires immediate attention.\n\n## Step 5: Customize Dashboards\nCustomize the feedback analytics dashboard to focus on metrics that matter to your team.\n\n## Step 6: Test the System\nProcess some sample feedback to ensure the analysis is working correctly.',
        '30 minutes',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'Turning Customer Feedback Into Actionable Insights',
        'https://mermaid.ink/img/pako:eNptkMFqwzAMhl9F-NRB8wK5ZGm3HQaDXXoRwaosajE2sp1tJXn3OVkKHWMnyZ_-T58EO-8QFWzwGLxhfPAjYcSvYMkNZMmJXpNzI_mEbOGFvYsJnpLfUyTDjs4QU8JuTBHZUfKWkO9pjMGH9BfzlVQjKzCaUoJtCqUot1ApWEEcZ3HBi1JQZd0y3ZbVelNW9_fFTQl1XZeP2zWIBfSBDVvXs6XTTPn_adZUxXq1ftoUxQJ6b5mO6JLlhAZRZXQuWP_OOhvRKMhvg8VTdIFGBT9JwdHZM-roFKxGZ3v0-kzpF9slXQM',
        '[{"question":"What languages are supported?","answer":"We currently support English, Spanish, French, German, and Japanese for sentiment analysis and theme detection."},{"question":"Can it integrate with my CRM?","answer":"Yes, we offer integrations with major CRMs including Salesforce, HubSpot, and Zoho CRM."},{"question":"How does it handle voice feedback?","answer":"Voice feedback can be transcribed and then analyzed just like text feedback. We support integration with call recording systems."}]',
        '[{"integration":"Zendesk","title":"Setting up Zendesk Integration","content":"To connect Zendesk, create an API token in your Zendesk admin settings and enter it in our integration page.","video_url":"https://www.youtube.com/embed/example13"},{"integration":"SurveyMonkey","title":"Connecting to SurveyMonkey","content":"To connect SurveyMonkey, generate an API key from your account settings and authorize access to your surveys.","video_url":"https://www.youtube.com/embed/example14"}]',
        '[{"name":"Rachel Kim","company":"E-commerce Platform","quote":"We have identified product improvement opportunities we would have missed without this automated analysis.","rating":5},{"name":"Carlos Rodriguez","company":"SaaS Company","quote":"The theme detection has helped us prioritize our product roadmap based on actual customer needs.","rating":4}]',
        '[{"title":"Product Teams","description":"Identify feature requests and pain points to inform product development."},{"title":"Customer Success","description":"Detect at-risk customers early through sentiment analysis."},{"title":"Marketing Teams","description":"Understand customer perception and messaging effectiveness."}]',
        admin_id
    ) ON CONFLICT (id) DO NOTHING;

    -- 8. Recruitment Pipeline Automation
    INSERT INTO workflows (
        id, 
        name, 
        description, 
        category, 
        n8n_workflow_id, 
        pricing, 
        integrations, 
        features, 
        setup_instructions,
        setup_time,
        tutorial_video_url,
        tutorial_video_title,
        flow_diagram_url,
        faq,
        integration_guides,
        testimonials,
        use_cases,
        created_by
    ) VALUES (
        'recruitment-pipeline-automation',
        'Recruitment Pipeline Automation',
        'Streamline your hiring process from job posting to onboarding with automated candidate tracking and communication',
        'hr',
        '89013',
        '$44.99/month',
        ARRAY['LinkedIn', 'Indeed', 'Gmail', 'Calendly', 'Slack', 'Zoom'],
        ARRAY[
            'Automated job posting distribution',
            'Resume screening and ranking',
            'Candidate communication automation',
            'Interview scheduling',
            'Assessment distribution and tracking',
            'Onboarding workflow automation'
        ],
        E'# Setting Up Your Recruitment Pipeline Automation\n\n## Step 1: Connect Your Job Posting Platforms\nConnect LinkedIn, Indeed, and other platforms where you post job openings.\n\n## Step 2: Configure Resume Screening\nSet up screening criteria for different positions to automatically rank incoming resumes.\n\n## Step 3: Create Email Templates\nCreate templates for different stages of the recruitment process (application received, interview invitation, etc.).\n\n## Step 4: Set Up Interview Scheduling\nConnect your calendar and configure availability for automatic interview scheduling.\n\n## Step 5: Configure Assessment Distribution\nSet up how and when assessments or tests should be sent to candidates.\n\n## Step 6: Create Onboarding Workflows\nDefine the onboarding steps for new hires to automate the transition from candidate to employee.',
        '45 minutes',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'Building an Efficient Recruitment Pipeline',
        'https://mermaid.ink/img/pako:eNptkMFqwzAMhl9F-NRB8wK5ZGm3HQaDXXoRwaosajE2sp1tJXn3OVkKHWMnyZ_-T58EO-8QFWzwGLxhfPAjYcSvYMkNZMmJXpNzI_mEbOGFvYsJnpLfUyTDjs4QU8JuTBHZUfKWkO9pjMGH9BfzlVQjKzCaUoJtCqUot1ApWEEcZ3HBi1JQZd0y3ZbVelNW9_fFTQl1XZeP2zWIBfSBDVvXs6XTTPn_adZUxXq1ftoUxQJ6b5mO6JLlhAZRZXQuWP_OOhvRKMhvg8VTdIFGBT9JwdHZM-roFKxGZ3v0-kzpF9slXQM',
        '[{"question":"Can it post to niche job boards?","answer":"Yes, in addition to major platforms like LinkedIn and Indeed, you can configure posting to industry-specific job boards."},{"question":"How does the resume screening work?","answer":"Our AI analyzes resumes for relevant skills, experience, and education based on your job requirements, then ranks candidates accordingly."},{"question":"Is video interview support included?","answer":"Yes, we integrate with Zoom and other video platforms to schedule and manage video interviews."}]',
        '[{"integration":"LinkedIn","title":"Setting up LinkedIn Integration","content":"To connect LinkedIn, you will need to create a LinkedIn Developer application and generate OAuth credentials.","video_url":"https://www.youtube.com/embed/example15"},{"integration":"Indeed","title":"Connecting to Indeed","content":"To connect Indeed, you will need to register as an Indeed publisher and generate an API key.","video_url":"https://www.youtube.com/embed/example16"}]',
        '[{"name":"Sarah Johnson","company":"Tech Recruiting Agency","quote":"We have reduced our time-to-hire by 40% while handling twice the volume of applications.","rating":5},{"name":"James Wilson","company":"Manufacturing Company","quote":"The automated screening has helped us find qualified candidates faster, even for specialized technical roles.","rating":4}]',
        '[{"title":"HR Departments","description":"Streamline the entire recruitment process from posting to onboarding."},{"title":"Recruiting Agencies","description":"Handle more clients and positions without increasing staff."},{"title":"Fast-growing Startups","description":"Scale your hiring process efficiently during rapid growth phases."}]',
        admin_id
    ) ON CONFLICT (id) DO NOTHING;

    -- 9. Data Visualization Automation
    INSERT INTO workflows (
        id, 
        name, 
        description, 
        category, 
        n8n_workflow_id, 
        pricing, 
        integrations, 
        features, 
        setup_instructions,
        setup_time,
        tutorial_video_url,
        tutorial_video_title,
        flow_diagram_url,
        faq,
        integration_guides,
        testimonials,
        use_cases,
        created_by
    ) VALUES (
        'data-visualization-automation',
        'Data Visualization Automation',
        'Automatically collect, process, and visualize data from multiple sources into beautiful dashboards and reports',
        'analytics',
        '90124',
        '$54.99/month',
        ARRAY['Google Analytics', 'Google Sheets', 'Airtable', 'MySQL', 'PostgreSQL', 'Slack'],
        ARRAY[
            'Automated data collection',
            'Data cleaning and transformation',
            'Interactive dashboard creation',
            'Scheduled report generation',
            'Anomaly detection and alerts',
            'Cross-source data integration'
        ],
        E'# Setting Up Your Data Visualization Automation\n\n## Step 1: Connect Your Data Sources\nConnect databases, spreadsheets, analytics platforms, and other data sources.\n\n## Step 2: Configure Data Transformations\nSet up how raw data should be cleaned, aggregated, and prepared for visualization.\n\n## Step 3: Design Your Dashboards\nCreate dashboard layouts and select visualization types for different metrics.\n\n## Step 4: Set Up Automated Reports\nConfigure when and how reports should be generated and distributed.\n\n## Step 5: Configure Alerts\nSet up anomaly detection and threshold-based alerts for key metrics.\n\n## Step 6: Schedule Data Refreshes\nDefine how often data should be refreshed in your dashboards and reports.',
        '50 minutes',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'Building Automated Data Dashboards That Drive Decisions',
        'https://mermaid.ink/img/pako:eNptkMFqwzAMhl9F-NRB8wK5ZGm3HQaDXXoRwaosajE2sp1tJXn3OVkKHWMnyZ_-T58EO-8QFWzwGLxhfPAjYcSvYMkNZMmJXpNzI_mEbOGFvYsJnpLfUyTDjs4QU8JuTBHZUfKWkO9pjMGH9BfzlVQjKzCaUoJtCqUot1ApWEEcZ3HBi1JQZd0y3ZbVelNW9_fFTQl1XZeP2zWIBfSBDVvXs6XTTPn_adZUxXq1ftoUxQJ6b5mO6JLlhAZRZXQuWP_OOhvRKMhvg8VTdIFGBT9JwdHZM-roFKxGZ3v0-kzpF9slXQM',
        '[{"question":"What visualization types are supported?","answer":"We support a wide range of visualizations including line charts, bar charts, pie charts, scatter plots, heat maps, geographic maps, and custom visualizations."},{"question":"Can I embed these dashboards in my application?","answer":"Yes, all dashboards can be embedded in your own applications or websites using our secure embedding feature."},{"question":"How often can data be refreshed?","answer":"Data can be refreshed as frequently as every 5 minutes for most sources, with real-time streaming available for supported data sources."}]',
        '[{"integration":"Google Analytics","title":"Setting up Google Analytics Integration","content":"To connect Google Analytics, you will need to create a service account in Google Cloud Console and grant it access to your Analytics property.","video_url":"https://www.youtube.com/embed/example17"},{"integration":"MySQL","title":"Connecting to MySQL Database","content":"To connect your MySQL database, you will need to provide connection details and credentials. We recommend creating a read-only user for security.","video_url":"https://www.youtube.com/embed/example18"}]',
        '[{"name":"Michael Zhang","company":"E-commerce Analytics","quote":"We have consolidated data from 12 different sources into real-time dashboards that have transformed our decision-making.","rating":5},{"name":"Sophia Williams","company":"Marketing Agency","quote":"Creating client reports used to take days each month. Now it is completely automated and the visualizations are beautiful.","rating":5}]',
        '[{"title":"Marketing Teams","description":"Visualize campaign performance across multiple channels in real-time."},{"title":"Executive Teams","description":"Get a consolidated view of company KPIs from all departments."},{"title":"Data Analysts","description":"Automate routine reporting to focus on deeper analysis."}]',
        admin_id
    ) ON CONFLICT (id) DO NOTHING;

    -- 10. Project Management Automation
    INSERT INTO workflows (
        id, 
        name, 
        description, 
        category, 
        n8n_workflow_id, 
        pricing, 
        integrations, 
        features, 
        setup_instructions,
        setup_time,
        tutorial_video_url,
        tutorial_video_title,
        flow_diagram_url,
        faq,
        integration_guides,
        testimonials,
        use_cases,
        created_by
    ) VALUES (
        'project-management-automation',
        'Project Management Automation',
        'Automate task assignment, progress tracking, reporting, and team communication across your projects',
        'project management',
        '01235',
        '$39.99/month',
        ARRAY['Asana', 'Trello', 'Jira', 'Slack', 'GitHub', 'Google Calendar'],
        ARRAY[
            'Automated task creation and assignment',
            'Progress tracking and reporting',
            'Deadline monitoring and alerts',
            'Resource allocation optimization',
            'Cross-platform project synchronization',
            'Automated status updates'
        ],
        E'# Setting Up Your Project Management Automation\n\n## Step 1: Connect Your Project Management Tools\nConnect Asana, Trello, Jira, or other project management platforms you use.\n\n## Step 2: Configure Task Workflows\nDefine how tasks should be created, assigned, and tracked across your workflow.\n\n## Step 3: Set Up Team Communication\nConfigure how and when updates should be sent to team members via Slack or other channels.\n\n## Step 4: Create Reporting Templates\nDesign templates for project status reports and progress updates.\n\n## Step 5: Configure Deadline Monitoring\nSet up how the system should monitor and alert about upcoming or missed deadlines.\n\n## Step 6: Define Resource Allocation Rules\nConfigure rules for how tasks should be assigned based on team member workload and availability.',
        '35 minutes',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'Automating Your Project Management Workflow',
        'https://mermaid.ink/img/pako:eNptkMFqwzAMhl9F-NRB8wK5ZGm3HQaDXXoRwaosajE2sp1tJXn3OVkKHWMnyZ_-T58EO-8QFWzwGLxhfPAjYcSvYMkNZMmJXpNzI_mEbOGFvYsJnpLfUyTDjs4QU8JuTBHZUfKWkO9pjMGH9BfzlVQjKzCaUoJtCqUot1ApWEEcZ3HBi1JQZd0y3ZbVelNW9_fFTQl1XZeP2zWIBfSBDVvXs6XTTPn_adZUxXq1ftoUxQJ6b5mO6JLlhAZRZXQuWP_OOhvRKMhvg8VTdIFGBT9JwdHZM-roFKxGZ3v0-kzpF9slXQM',
        '[{"question":"Can it work across multiple project management tools?","answer":"Yes, you can synchronize projects across different tools like Asana, Trello, and Jira to accommodate different team preferences."},{"question":"Does it support agile methodologies?","answer":"Yes, we support Scrum and Kanban workflows with sprint planning, backlog management, and burndown charts."},{"question":"Can it automate resource allocation?","answer":"Yes, the system can automatically assign tasks based on team member skills, availability, and current workload."}]',
        '[{"integration":"Asana","title":"Setting up Asana Integration","content":"To connect Asana, you will need to generate a Personal Access Token from your Asana account settings.","video_url":"https://www.youtube.com/embed/example19"},{"integration":"Jira","title":"Connecting to Jira","content":"To connect Jira, create an API token in your Atlassian account and provide your Jira instance URL.","video_url":"https://www.youtube.com/embed/example20"}]',
        '[{"name":"Daniel Brown","company":"Software Development Firm","quote":"We have reduced project management overhead by 60% while improving on-time delivery rates.","rating":5},{"name":"Emma Taylor","company":"Marketing Agency","quote":"Managing projects across multiple clients used to be chaotic. Now everything is synchronized and automated.","rating":4}]',
        '[{"title":"Software Development Teams","description":"Automate task tracking and reporting across development workflows."},{"title":"Marketing Agencies","description":"Manage multiple client projects with automated status updates and resource allocation."},{"title":"Construction Projects","description":"Track progress, deadlines, and resource utilization across complex projects."}]',
        admin_id
    ) ON CONFLICT (id) DO NOTHING;

    -- Add more workflows as needed...
END;
$$ LANGUAGE plpgsql;

-- Execute the function with the admin ID
-- Replace with your actual admin UUID
SELECT seed_enhanced_agents('ce673e5f-33de-4615-94a7-20a390860bd8');