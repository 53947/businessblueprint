# Google Business Profile API Setup — businessblueprint.io

## What This Gets You
- Lets customers connect their Google Business Profile to / publish and / elevate
- Posts updates to their Google listing
- Syncs business info (hours, address, categories) to Google

---

## Step 1: Create a Google Cloud Project

1. Go to https://console.cloud.google.com
2. Click the project dropdown at the top > **New Project**
3. Name it: `businessblueprint-production`
4. Click **Create**
5. Make sure the new project is selected in the dropdown

## Step 2: Enable the APIs

1. Go to **APIs & Services** > **Library** (left sidebar)
2. Search for and enable each of these (click each one, then click **Enable**):
   - **My Business Account Management API**
   - **My Business Business Information API**
   - **Google Business Profile API** (formerly Google My Business API)
   - **Places API (New)** — for business lookups and validation

## Step 3: Set Up OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Select **External** (so customers can connect)
3. Click **Create**
4. Fill in:
   - **App name:** businessblueprint.io
   - **User support email:** your email
   - **App logo:** upload businessblueprint logo
   - **App domain:** businessblueprint.io
   - **Developer contact email:** your email
5. Click **Save and Continue**
6. On the **Scopes** page, click **Add or Remove Scopes** and add:
   - `https://www.googleapis.com/auth/business.manage`
   - `https://www.googleapis.com/auth/userinfo.profile`
   - `https://www.googleapis.com/auth/userinfo.email`
7. Click **Update**, then **Save and Continue**
8. On **Test users**, add your own Google email for testing
9. Click **Save and Continue**

## Step 4: Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **+ Create Credentials** > **OAuth client ID**
3. Application type: **Web application**
4. Name: `businessblueprint-web`
5. Under **Authorized redirect URIs**, add:
   ```
   https://businessblueprint.io/api/auth/google/callback
   ```
6. Click **Create**
7. A popup shows your **Client ID** and **Client Secret** — copy both

## Step 5: Create a Places API Key

1. Still on the **Credentials** page
2. Click **+ Create Credentials** > **API key**
3. Copy the key
4. Click **Edit API key** (the pencil icon)
5. Under **API restrictions**, select **Restrict key**
6. Select **Places API (New)** from the dropdown
7. Click **Save**

## Step 6: Add to Replit Secrets

In your Replit project, go to **Secrets** (lock icon) and add:

| Secret Name | Value |
|-------------|-------|
| `GOOGLE_CLIENT_ID` | (paste your OAuth Client ID) |
| `GOOGLE_CLIENT_SECRET` | (paste your OAuth Client Secret) |
| `GOOGLE_PLACES_API_KEY` | (paste your API key from Step 5) |

## Step 7: Verify

1. Restart your Replit app
2. Log into businessblueprint.io as admin
3. Go to / publish > Connect Google Business
4. Click "Connect Google"
5. You should see the Google OAuth consent screen
6. Sign in with the test user email you added in Step 3

---

## Publishing Your App (Required for Customer Use)

Your app starts in **Testing** mode — only test users you add can connect.

To let real customers connect:

1. Go to **OAuth consent screen**
2. Click **Publish App**
3. Google will review it (can take 2-6 weeks for `business.manage` scope)
4. You may need to submit a short video showing how the app uses the data
5. Once approved, any Google user can connect

## Cost

- **OAuth + Business Profile APIs:** Free, no usage limits that matter at your scale
- **Places API:** $17 per 1,000 requests after the free $200/month credit
  - You'll barely touch this — it's only used for business lookups

## Notes

- The `business.manage` scope is a **sensitive scope** — Google reviews these more carefully
- During review, have a clear privacy policy on businessblueprint.io
- Multi-location businesses: each location stores as a separate connected account
- Google Business posts expire automatically after 7 days
