# Blueprint Prescription System

## Overview
The prescription is the CORE VALUE PROPOSITION of BusinessBlueprint. After the Digital Assessment analyzes a business, we don't just show them data - **we prescribe the exact solution they need**.

## The Prescription Output

When automations are built for the prescription system, the output must include:

### 1. Recommended Base Plan
Based on Digital IQ score and business size:
- **Start ($99/mo)** - Digital IQ 0-40, small businesses, basic online presence needs
- **Advanced ($299/mo)** - Digital IQ 41-70, growing businesses, need automation
- **Scale ($999/mo)** - Digital IQ 71+, multi-location, enterprise needs

### 2. Recommended Commverse Apps + Specific Paths

For each recommended app, prescribe the SPECIFIC PATH within that app:

#### /send (Email + SMS Marketing)
**Paths to prescribe:**
- "Quick Campaign Launch" - for businesses with existing contact lists
- "Build Your Audience First" - for new businesses without contacts
- "Re-engagement Flow" - for businesses with dormant customer lists
- "Seasonal Campaign Builder" - for retail/seasonal businesses

#### /inbox (Unified Communications)
**Paths to prescribe:**
- "Connect All Channels" - integrate email, chat, social DMs
- "Team Collaboration Setup" - for businesses with multiple staff
- "Customer Service Hub" - for support-heavy businesses
- "Sales Pipeline Management" - for lead-focused businesses

#### /livechat (Website Chat Widget)
**Paths to prescribe:**
- "Install & Go Live" - simple website integration
- "FAQ Automation Setup" - for businesses with common questions
- "Lead Capture Mode" - for businesses focused on lead generation
- "Support Ticket Creation" - for service businesses

#### /content (Social Media Management)
**Paths to prescribe:**
- "Content Calendar Quick Start" - schedule first month of posts
- "Multi-Platform Scheduler" - for businesses on multiple social platforms
- "AI Content Assistant" - for businesses struggling with content creation
- "Brand Voice Builder" - for businesses establishing identity

### 3. Recommended Build Method
- **DIY** - for tech-savvy business owners, lower budgets
- **MSP (Managed Service)** - for busy business owners, hands-off approach
- **ALC (A La Carte)** - for businesses that only need specific tools, no full blueprint

### 4. Priority Actions (First 30 Days)
The prescription should include a 30-day action plan:
1. Week 1: [Specific tasks]
2. Week 2: [Specific tasks]
3. Week 3: [Specific tasks]
4. Week 4: [Specific tasks]

## Prescription Logic (For Automation Development)

### Assessment → Prescription Mapping

```
IF Digital IQ < 30 AND no website:
  PRESCRIBE: Start Plan + /send + /content
  PATH: /send → "Build Your Audience First"
  PATH: /content → "Content Calendar Quick Start"
  BUILD METHOD: Suggest MSP (they need help)

IF Digital IQ 40-60 AND has website but low engagement:
  PRESCRIBE: Advanced Plan + /inbox + /livechat + /content
  PATH: /inbox → "Customer Service Hub"
  PATH: /livechat → "Lead Capture Mode"
  PATH: /content → "Multi-Platform Scheduler"
  BUILD METHOD: Suggest DIY or MSP based on tech comfort

IF Digital IQ 70+ AND multi-location:
  PRESCRIBE: Scale Plan + Full Commverse Bundle
  PATH: /send → "Seasonal Campaign Builder"
  PATH: /inbox → "Team Collaboration Setup"
  PATH: /livechat → "Support Ticket Creation"
  PATH: /content → "Brand Voice Builder"
  BUILD METHOD: MSP recommended
```

## Key Principles

1. **Be Specific** - Never just say "use /send". Say "use /send with the Quick Campaign Launch path"
2. **Explain Why** - Tell them WHY this is prescribed for their business
3. **Prioritize** - Don't overwhelm. Prescribe 1-3 apps to start, not all 4
4. **Path Matters** - The path within the app is AS IMPORTANT as the app itself
5. **Build Method** - Always recommend a build method based on their profile

## Integration Points

When building the prescription automation:
- Pull data from Digital Assessment results
- Use AI to analyze business type, industry, size
- Match patterns to prescription templates
- Generate custom 30-day action plan
- Output as structured data for dashboard display
- Send email summary with prescription details

## Future Enhancement Ideas
- Industry-specific prescription templates
- Seasonal business prescriptions
- Multi-location business special paths
- Integration with Coach Blue for personalized guidance
- Prescription refinement based on 30-day results
