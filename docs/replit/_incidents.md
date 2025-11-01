# 🧾 Replit Incidents Log  
**Internal Use Only — Do Not Commit to GitHub**

---

## Oct 26 2025 — Vite Package Error
**Symptom:** App crashed on startup “Cannot find package 'vite'”.  
**Cause:** NODE_ENV secret set to “production” — skipped devDependencies.  
**Fix:** Deleted secret from Replit Secrets.  
**Verification:** `npm install` restored Vite packages.  

---

## Oct 24 2025 — Blank Screen on businessblueprint.io
**Symptom:** Blank page after deploy.  
**Cause:** `/assets/:filename` route overrode Vite bundle paths.  
**Fix:** Renamed to `/brand-assets/:filename`.  
**Files Affected:** `server/routes.ts`, `client/index.html`, `client/src/pages/brand-studio.tsx`.  

---

*(Append future entries below — most recent first.)*
