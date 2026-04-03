import { AppName } from "@/components/app-name";
import bbLogo from "@assets/images_logos/bb-header-logo.png";
import triadblueEcosystem from "@assets/images_logos/triadblue-ecosystem-logo.png";
import swipesLogo from "@assets/images_logos/swipesblue_logo_image_and_text_as_url.png";
import hostsLogo from "@assets/images_logos/hostsblue_logo_image_and_text_as_url.png";
import scansLogo from "@assets/images_logos/scansblue_logo_image_and_text_as_url.png";
import builderLogo from "@assets/images_logos/builderblue2-logo-url.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white mt-auto">
      <div className="border-t-[0.5px] border-[#09080E]/50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:[&>*+*]:border-l-[0.5px] md:[&>*+*]:border-[#09080E]/50">

          {/* Column 1 — Ecosystem (spans 2) */}
          <div className="md:col-span-2">
            <img src={bbLogo} alt="businessblueprint.io" style={{ height: 32, objectFit: 'contain' }} />
            <p className="text-sm text-gray-500 mt-2 mb-6">We Assess. We Prescribe. You Grow.</p>

            <img src={triadblueEcosystem} alt="TRIADBLUE.COM ECOSYSTEM" style={{ height: 24, objectFit: 'contain' }} className="mb-5" />

            <div className="space-y-4">
              <div>
                <img src={swipesLogo} alt="swipesblue.com" style={{ height: 22, objectFit: 'contain' }} />
                <p className="text-xs text-gray-400 mt-1">Get paid. Stay paid. Go Blue.</p>
              </div>

              <div>
                <img src={hostsLogo} alt="hostsblue.com" style={{ height: 22, objectFit: 'contain' }} />
                <p className="text-xs text-gray-400 mt-1">Get site. Go live. Go Blue.</p>
              </div>

              <div>
                <img src={scansLogo} alt="scansblue.com" style={{ height: 22, objectFit: 'contain' }} />
                <p className="text-xs text-gray-400 mt-1">Get scanned. Get scored. Go Blue.</p>
              </div>

              <div>
                <img src={builderLogo} alt="BUILDERBLUE2.COM" style={{ height: 22, objectFit: 'contain' }} />
                <p className="text-xs text-gray-400 mt-1">Get vibe. Get code. Go Blue².</p>
              </div>
            </div>
          </div>

          {/* Column 2 — Platform */}
          <div className="md:pl-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-2 text-sm" style={{ fontFamily: 'Archivo Semi Expanded, Archivo, sans-serif', fontWeight: 600, fontSize: 14 }}>
              {[
                { href: "/assessment", slash: true, name: "assess", color: "#960D71" },
                { href: "/connect", slash: true, name: "connect", color: "#008060" },
                { href: "/publish", slash: true, name: "publish", color: "#064A6C" },
                { href: "/elevate", slash: true, name: "elevate", color: "#E9B307" },
                { href: "/optimize", slash: true, name: "optimize", color: "#374151" },
                { href: "/amplify", slash: true, name: "amplify", color: "#97ACCA" },
                { href: "/respond", slash: true, name: "respond", color: "#001882" },
                { href: "/engage", slash: true, name: "engage", color: "#660099" },
                { href: "/post", slash: true, name: "post", color: "#FF44CC" },
                { href: "/promote", slash: true, name: "promote", color: "#1844A6" },
              ].map((app) => (
                <li key={app.name}>
                  <a href={app.href} className="hover:opacity-80 transition-opacity">
                    <span style={{ color: '#09080E' }}>/ </span>
                    <span style={{ color: app.color }}>{app.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div className="md:pl-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
              <li><a href="/journey" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a></li>
              <li><a href="/sitemap" className="text-gray-600 hover:text-gray-900 transition-colors">Site Map</a></li>
              <li><a href="/knowledge-base" className="text-gray-600 hover:text-gray-900 transition-colors">Knowledge Base</a></li>
            </ul>
          </div>

          {/* Column 4 — Support */}
          <div className="md:pl-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/knowledge-base" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="/find-results" className="text-gray-600 hover:text-gray-900 transition-colors">Find My Results</a></li>
              <li><a href="/api-docs" className="text-gray-600 hover:text-gray-900 transition-colors">API Documentation</a></li>
              <li><a href="/portal" className="text-gray-600 hover:text-gray-900 transition-colors">Client Portal</a></li>
            </ul>

            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4 mt-8">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
              <li><a href="/data-deletion" className="text-gray-600 hover:text-gray-900 transition-colors">Data Deletion</a></li>
              <li><a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Cookie Policy</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">Acceptable Use</a></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom bar — full width line matching top border */}
      <div className="border-t-[0.5px] border-[#09080E]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">
              &copy; {currentYear} TRIADBLUE, Inc. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
              businessblueprint.io is a product of TRIADBLUE, Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
