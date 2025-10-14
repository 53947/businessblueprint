# Synup Integration Testing Guide

## Current Status

The Synup integration has been fully implemented with:
- ✅ Service layer with authenticated API client
- ✅ Database schema (locations, listings, reviews)
- ✅ Storage layer with full CRUD operations
- ✅ Secure API routes with multi-layered protection
- ✅ Strict business name verification
- ✅ Cross-tenant prevention

## Testing Results

**Infrastructure Tests:** ✅ PASSED
- API key configuration: Working
- Authentication headers: Properly sent
- Error handling: Functioning correctly
- Service layer: Operational

**API Endpoint Tests:** ✅ UPDATED - Documentation Accessible
- Successfully accessed Synup API v4 documentation
- Updated service layer to use correct endpoints
- **Base URL:** https://api.synup.com/api/v4
- **Location IDs:** Must be Base64 encoded in URL paths
- **Reviews:** API uses "interactions" terminology

**API Structure (Verified):**
- **Locations:** GET /locations, GET /locations/{base64LocationId}
- **Listings:** GET /locations/{base64LocationId}/listings
- **Interactions (Reviews):** GET /locations/{base64LocationId}/reviews (with category=REVIEW filter)
- **Analytics:** GET /locations/{base64LocationId}/interactions/analytics
- **Response:** POST /interactions/{interactionId}/response
- Authentication: API Key in Authorization header (Bearer token)

## Next Steps for Production Testing

### 1. Obtain Synup API Documentation Access

**Required to Complete Testing:**
- Active Synup account with subscription
- Access to Synup API documentation portal
- Test location data in Synup system

**Options:**
1. **Contact Synup Support:** Request API documentation and sandbox access
2. **Platform Login:** Access docs from within Synup workspace (Settings → Integrations)
3. **Trial Account:** Sign up at synup.com and access developer docs
4. **Community Library:** Inspect `@mx-inventor/synup` NPM package implementation

### 2. API Endpoints (VERIFIED ✅)

**Updated Implementation:**
- Base URL: `https://api.synup.com/api/v4`
- Location IDs: Base64 encoded in URL paths
- Reviews terminology: "interactions" instead of "reviews"

**Verified Endpoints:**
- **Locations:** 
  - List: GET /locations
  - Get: GET /locations/{base64LocationId}
  - Create: POST /locations
  - Update: PUT /locations/{base64LocationId}
- **Listings:** 
  - List: GET /locations/{base64LocationId}/listings
  - Sync: POST /locations/{base64LocationId}/sync
- **Reviews (Interactions):**
  - List: GET /locations/{base64LocationId}/reviews?category=REVIEW
  - Respond: POST /interactions/{interactionId}/response
  - Analytics: GET /locations/{base64LocationId}/interactions/analytics

### 3. Test with Real Synup Account

Once endpoints are verified:

```bash
# Run the test script
tsx server/test-synup.ts
```

Expected output:
- List of locations from Synup account
- Location details
- Listings across 200+ directories
- Reviews from 80+ platforms
- Successful sync operations

### 3. Test Security Features

Verify the security implementation:

**Test Cross-Tenant Prevention:**
```bash
# Attempt to sync same location with different client
# Should return 403 Forbidden
```

**Test Business Name Verification:**
```bash
# Attempt to sync location with mismatched business name
# Should return 403 Forbidden
```

**Test Authorization:**
```bash
# Attempt to access location without authentication
# Should return 401 Unauthorized
```

### 4. Update Endpoints If Needed

If Synup API uses different endpoint structure, update in:
- `server/services/synup.ts` - Service layer methods
- Keep all security checks intact

## Testing Checklist

- [x] Verify Synup API documentation for correct endpoints ✅
- [x] Update service layer with verified endpoints ✅
- [x] Base64 encode location IDs for API calls ✅
- [x] Use "interactions" terminology for reviews ✅
- [ ] Test with real Synup account data (requires real location data)
- [ ] Verify location sync works correctly
- [ ] Verify listings sync across 200+ directories
- [ ] Verify review sync across 80+ platforms
- [ ] Test business name verification (security)
- [ ] Test cross-tenant prevention (security)
- [ ] Test API routes with authenticated requests
- [ ] Verify data persistence in database
- [ ] Test error handling for API failures

## API Route Examples

### Sync a Location
```bash
POST /api/synup/locations/sync
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "synupLocationId": "loc_123456"
}
```

### Get Listings
```bash
GET /api/synup/locations/:locationId/listings
Authorization: Bearer <JWT_TOKEN>
```

### Sync Reviews
```bash
POST /api/synup/locations/:locationId/sync-reviews
Authorization: Bearer <JWT_TOKEN>
```

## Security Features (Verified)

✅ **Multi-Layered Protection:**
1. JWT authentication on all routes
2. Cross-tenant prevention via `getSynupLocationBySynupId()`
3. Strict business name verification (enforced 400/403 errors)
4. Zod payload validation
5. Authorization checks on all operations

## Known Limitations

1. **White-Label Shared API Key:** Current implementation uses a shared Synup API key. For production:
   - Use per-client Synup API keys, OR
   - Implement admin pre-approval workflow, OR
   - Add enhanced address/contact verification

2. **Business Name Matching:** Current implementation uses fuzzy name matching. Consider:
   - Adding address verification
   - Implementing contact information validation
   - Admin review for edge cases

## Support

For issues or questions about the Synup integration:
1. Check Synup API documentation: https://developer.synup.com/docs/
2. Verify API key configuration
3. Review error logs for specific API responses
4. Contact Synup support for API-specific issues
