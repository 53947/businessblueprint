import bbLogo from "@assets/images_logos/bb-header-logo.png";
import swipesLogo from "@assets/images_logos/swipesblue_logo_image_and_text_as_url.png";
import hostsLogo from "@assets/images_logos/hostsblue_logo_image_and_text_as_url.png";
import scansLogo from "@assets/images_logos/scansblue_logo_image_and_text_as_url.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white mt-auto">
      <div className="border-t border-gray-200" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Column 1 — Ecosystem (spans 2) */}
          <div className="md:col-span-2">
            <img src={bbLogo} alt="businessblueprint.io" style={{ height: 32, objectFit: 'contain' }} />
            <p className="text-sm text-gray-500 mt-2 mb-6">We Assess. We Prescribe. You Grow.</p>

            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">TRIADBLUE ECOSYSTEM</p>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <img src={swipesLogo} alt="swipesblue.com" style={{ height: 28, objectFit: 'contain' }} />
                <div>
                  <p className="text-sm font-medium text-gray-700">swipesblue.com</p>
                  <p className="text-xs text-gray-400">Proprietary payment processing for the ecosystem</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img src={hostsLogo} alt="hostsblue.com" style={{ height: 28, objectFit: 'contain' }} />
                <div>
                  <p className="text-sm font-medium text-gray-700">hostsblue.com</p>
                  <p className="text-xs text-gray-400">Domains, hosting, email, and website builder</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img src={scansLogo} alt="scansblue.com" style={{ height: 28, objectFit: 'contain' }} />
                <div>
                  <p className="text-sm font-medium text-gray-700">scansblue.com</p>
                  <p className="text-xs text-gray-400">Website auditing and digital presence scanning</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div style={{ width: 28, height: 28, backgroundColor: '#09080E', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'white', fontSize: 10, fontWeight: 700 }}>B2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">BUILDERBLUE2.COM</p>
                  <p className="text-xs text-gray-400">AI-powered vibe coding platform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 — Platform */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/assessment" className="text-gray-600 hover:text-gray-900 transition-colors">/ assess</a></li>
              <li><a href="/connect" className="text-gray-600 hover:text-gray-900 transition-colors">/ connect</a></li>
              <li><a href="/publish" className="text-gray-600 hover:text-gray-900 transition-colors">/ publish</a></li>
              <li><a href="/elevate" className="text-gray-600 hover:text-gray-900 transition-colors">/ elevate</a></li>
              <li><a href="/optimize" className="text-gray-600 hover:text-gray-900 transition-colors">/ optimize</a></li>
              <li><a href="/amplify" className="text-gray-600 hover:text-gray-900 transition-colors">/ amplify</a></li>
              <li><a href="/respond" className="text-gray-600 hover:text-gray-900 transition-colors">/ respond</a></li>
              <li><a href="/engage" className="text-gray-600 hover:text-gray-900 transition-colors">/ engage</a></li>
              <li><a href="/post" className="text-gray-600 hover:text-gray-900 transition-colors">/ post</a></li>
              <li><a href="/promote" className="text-gray-600 hover:text-gray-900 transition-colors">/ promote</a></li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
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
          <div>
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

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-12 pt-6">
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
