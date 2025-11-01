# ⚙️ Replit Environment Configuration  
**Internal Reference Only — Do Not Commit to GitHub**

---

## 🔑 Secrets
| Key | Description | Notes |
|------|--------------|-------|
| DATABASE_URL | Neon PostgreSQL connection string | never hardcode |
| OPENAI_API_KEY | OpenAI service key | rotate monthly |
| NMI_API_KEY | Payment gateway | stored securely in Secrets |
| TELNYX_API_KEY | Messaging | verify usage scope |
| WPMUDEV_API_KEY | Hosts Blue integration | private |
| OPENSRS_API_KEY | Domains & email | XML API credentials |
| GOOGLE_PLACES_API_KEY | Business data lookup | restricted to server IP |
| SYNUP_API_KEY | Listings & reviews | private – never exposed publicly |

---

## 🌐 Deployment
- Domains managed through Replit **Deployments → Settings → Domains**.  
- Use A + TXT records at registrar.  
- Avoid mixing A + AAAA when using Cloudflare.  

---

## 🏗️ Build & Run
| Stage | Command |
|--------|----------|
| Dev | `npm run dev` |
| Build | `npm run build` |
| Start | `npm start` |
| Clean | `rm -rf dist && npm run build` |

---

## 🧩 Notes
- Do not expose environment values in console
