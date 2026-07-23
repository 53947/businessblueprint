# LinkedIn API Setup — businessblueprint.io

## What This Gets You
Lets your customers connect their LinkedIn accounts and post directly from / post.

---

## Step 1: Create a LinkedIn App

1. Go to https://www.linkedin.com/developers/apps
2. Click **Create App**
3. Fill in:
   - **App name:** businessblueprint.io
   - **LinkedIn Page:** Select or create your TRIADBLUE company page
   - **App logo:** Upload the businessblueprint logo
   - **Legal agreement:** Check the box
4. Click **Create app**

## Step 2: Request API Products

1. On your app page, go to the **Products** tab
2. Request access to:
   - **Share on LinkedIn** — this lets customers post on their behalf
   - **Sign In with LinkedIn using OpenID Connect** — this handles the login/connect flow
3. These are usually auto-approved within minutes

## Step 3: Set Up OAuth Redirect

1. Go to the **Auth** tab
2. Under **OAuth 2.0 settings**, add this Authorized Redirect URL:
   ```
   https://businessblueprint.io/api/auth/linkedin/callback
   ```
3. Click **Update**

## Step 4: Copy Your Credentials

1. Still on the **Auth** tab, you'll see:
   - **Client ID** — copy this
   - **Primary Client Secret** — click the eye icon, copy this
2. These are the two values you need

## Step 5: Add to Replit Secrets

In your Replit project, go to **Secrets** (lock icon) and add:

| Secret Name | Value |
|-------------|-------|
| `LINKEDIN_CLIENT_ID` | (paste your Client ID) |
| `LINKEDIN_CLIENT_SECRET` | (paste your Client Secret) |

## Step 6: Verify

1. Restart your Replit app
2. Log into businessblueprint.io as admin
3. Go to / post > Connect Accounts
4. Click "Connect LinkedIn"
5. You should see the LinkedIn OAuth consent screen

---

## Scopes Used
- `openid` — required for sign-in
- `profile` — gets user name and photo
- `email` — gets user email
- `w_member_social` — lets them post on LinkedIn

## Notes
- LinkedIn apps start in **Development Mode** — only your own LinkedIn accounts can connect
- To let customers connect: go to **Products** tab and verify your app (LinkedIn reviews it)
- Review usually takes 1-3 business days
- No cost for these API products
