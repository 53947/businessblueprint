# Business Blueprint - Coding Standards

## General Principles



## Code Style

### 



### Naming Conventions


## File Organization



## Component Structure



## State Management



## API Design



## Error Handling



## Testing Standards


## Documentation Requirements



## Git Workflow



## Code Review Checklist


## Performance Guidelines



## Security Guidelines



## Asset Management Requirements (MANDATORY)

**This is a required deliverable for all TriadBlue ecosystem applications.**

### Requirements

You MUST implement a complete asset upload interface from day one:

1. **Asset Upload Dashboard Page**
   - Upload form for favicon (ICO, PNG, SVG, WEBP, max 2MB)
   - Upload form for company logos (PNG, SVG, WEBP, max 2MB)
   - File validation and preview functionality
   - Replace/delete controls for existing assets

2. **Backend Implementation**
   - Assets table in database (id, type, filename, mimeType, size, uploadedAt, isActive)
   - File upload API using multer middleware
   - Storage in `/uploads` directory or Replit App Storage
   - Authentication required for all asset operations

3. **Dynamic Favicon Injection**
   - Query database for active favicon
   - Inject `<link rel="icon">` dynamically in HTML head
   - NO hardcoded favicon in index.html

4. **Logo Integration**
   - Header/widget logos fetched from API
   - Support fallback to default logo
   - Auto-refresh when new logo activated

### Acceptance Criteria

- [ ] Asset Management page exists in authenticated dashboard
- [ ] User can upload favicon and see it immediately in browser tab
- [ ] User can upload company logo and see it in header/widgets
- [ ] File validation prevents invalid formats and oversized files
- [ ] Preview functionality works before confirming upload
- [ ] Delete/replace operations work correctly
- [ ] No hardcoded image imports for favicon or primary logos
- [ ] All asset operations require authentication
- [ ] Success/error feedback is clear to user

**Reference Implementation**: See ConsoleBlue project for complete example.

**Non-compliance**: Projects without asset upload functionality are incomplete.
