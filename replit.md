# DigitalPresencePro - AI-Powered Business Assessment Platform

## Overview

DigitalPresencePro is a comprehensive web application that analyzes businesses' digital presence using AI and Google Business Intelligence. The platform provides automated assessments, generates detailed reports via email, and offers two service pathways (DIY and Managed Service Provider) to help businesses improve their online presence.

## System Architecture

The application follows a modern full-stack architecture with clear separation of concerns:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with Shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Connect-pg-simple for session storage
- **Email Service**: Nodemailer for SMTP email delivery

### Monorepo Structure
The project uses a workspace-based monorepo with shared schemas and clear separation:
- `client/`: Frontend React application
- `server/`: Backend Express.js API
- `shared/`: Shared TypeScript schemas and types

## Key Components

### Database Schema
- **Assessments Table**: Stores business assessment data, analysis results, and status tracking
- **Recommendations Table**: Stores AI-generated recommendations linked to assessments
- **Sessions Table**: Handles session management for future authentication needs

### API Services
- **Google Business Service**: Integrates with Google Places API for business data retrieval
- **OpenAI Analysis Service**: Uses GPT-4o for intelligent business presence analysis
- **Email Service**: Handles automated report delivery via SMTP

### UI Components
- **Assessment Form**: Multi-step form with validation for business data collection
- **Service Pathways**: Displays DIY vs MSP options with detailed comparisons
- **Dashboard**: Shows assessment results and recommendations (planned feature)

## Data Flow

1. **Assessment Creation**: User submits business information through multi-step form
2. **Background Processing**: System asynchronously:
   - Fetches Google Business data via Places API
   - Analyzes digital presence using AI
   - Generates recommendations and scoring
3. **Email Delivery**: Automated email report sent to user with results and recommendations
4. **Pathway Selection**: Users can choose between DIY tools or managed services

## External Dependencies

### Required API Keys
- **Google Places API**: For business data retrieval and presence analysis
- **OpenAI API**: For AI-powered analysis and recommendations generation
- **SMTP Credentials**: For email delivery (Gmail or custom SMTP)

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database with connection pooling
- **Drizzle ORM**: Type-safe database operations with migration support

### UI Framework
- **Shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- TSX for TypeScript execution in development
- File-based routing with middleware logging

### Production Build
- Vite builds optimized React bundle to `dist/public`
- ESBuild bundles Node.js server to `dist/index.js`
- Static file serving from Express in production

### Environment Configuration
- Database URL for Neon connection
- API keys for Google Places and OpenAI
- SMTP configuration for email delivery
- Replit-specific development tools integration

Changelog:
- July 05, 2025. Initial setup with complete business assessment platform
- Added Google Places API integration for business data retrieval
- Implemented OpenAI GPT-4o for intelligent business analysis
- Created email service for automated report delivery
- Built complete assessment workflow with DIY/MSP pathway selection
- Configured database with PostgreSQL and Drizzle ORM
- Set up cloudpleaser.io branding throughout the application
- Updated assessment timing from "2-3 minutes" to "24 hours" for accurate snapshot processing
- Revised pricing structure: DIY from Free to $299/month, MSP starting at $499/month
- Updated platform descriptions to include: Listing distribution (free), Local SEO, Social media platform, Reputation management, CRM, AI inbox, Campaign Pro, Website builder

## User Preferences

Preferred communication style: Simple, everyday language.

Business Context:
- cloudpleaser.io: Digital marketing platform (never mention Vendasta)
- webhosted.io: Website hosting platform (never mention WPMUDev)
- airswiped.com: Payment gateway platform (never mention NMI Network)
- Focus on mass market automation to minimize manual intervention
- Two primary pathways: DIY (self-service) and MSP (managed services)
- AI-powered Google Business Intelligence drives assessment recommendations