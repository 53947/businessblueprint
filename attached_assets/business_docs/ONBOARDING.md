# Business Blueprint - Onboarding Guide

## Welcome to the Team!



## Getting Started Checklist


## Development Environment Setup

### Required Tools


### Initial Setup Steps


## Project Overview



## Key Repositories


## Development Workflow



## Code Review Process



## Testing Guidelines



## Deployment Process



## Communication Channels


## Team Structure


## Important Resources


## FAQs


## Getting Help



## Asset Management Setup (MANDATORY)

**This must be completed as part of initial development - not deferred.**

### Quick Setup Checklist

- [ ] **Database Schema**: Add `assets` table to `shared/schema.ts`
- [ ] **Storage Layer**: Add asset CRUD methods to `server/storage.ts`
- [ ] **Install Multer**: Run packager tool to install multer for file uploads
- [ ] **API Routes**: Implement upload/list/delete endpoints in `server/routes.ts`
- [ ] **Create /uploads**: Make directory and configure static serving
- [ ] **Dashboard UI**: Build Asset Management page with upload forms
- [ ] **Dynamic Favicon**: Implement injection based on active asset in database
- [ ] **Test Upload Flow**: Upload favicon, verify browser tab icon updates
- [ ] **Test Logo Flow**: Upload logo, verify header/widget display

### Why This Matters

Users should NEVER need to edit code to change a favicon or company logo. The upload interface is a core feature, not optional. This is standard for all TriadBlue ecosystem applications.

### Reference

See **ConsoleBlue** project implementation:
- `shared/schema.ts` - Assets table definition
- `server/storage.ts` - Asset CRUD operations  
- `server/routes.ts` - Upload API with multer
- `client/src/pages/asset-management.tsx` - Upload UI
- `client/index.html` - Dynamic favicon injection

For complete standards, see **ASSET_MANAGEMENT_STANDARDS.md** in the repository root.
