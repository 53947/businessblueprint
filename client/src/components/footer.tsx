import { BrandLogo } from "@/components/brand-logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09080E] text-white mt-auto">
      {/* Top divider */}
      <div className="border-t border-gray-800" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Ecosystem — spans 2 columns */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <BrandLogo brand="businessblueprint" variant="dark" size="xl" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We Assess. We Prescribe. You Grow.
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">The TRIADBLUE Ecosystem</p>
            <div className="text-sm text-gray-400 space-y-1">
              <p>businessblueprint.io</p>
              <p>hostsblue.com</p>
              <p>swipesblue.com</p>
              <p>scansblue.com</p>
              <p>consoleblue</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/assessment" className="text-gray-400 hover:text-white transition-colors">Digital IQ Assessment</a></li>
              <li><a href="/find-results" className="text-gray-400 hover:text-white transition-colors">Find My Results</a></li>
              <li><a href="/anchor" className="text-gray-400 hover:text-white transition-colors">Anchor Suite</a></li>
              <li><a href="/compass" className="text-gray-400 hover:text-white transition-colors">Compass Suite</a></li>
              <li><a href="/coach-blue" className="text-gray-400 hover:text-white transition-colors">Coach Blue</a></li>
              <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/journey" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="/sitemap" className="text-gray-400 hover:text-white transition-colors">Site Map</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/knowledge-base" className="text-gray-400 hover:text-white transition-colors">Knowledge Base</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="/api-docs" className="text-gray-400 hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="/portal" className="text-gray-400 hover:text-white transition-colors">Client Portal</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-gray-500 mb-4 md:mb-0">
              &copy; {currentYear} Triad Blue Inc. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-xs">
              <a href="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="/data-deletion" className="text-gray-500 hover:text-white transition-colors">Data Deletion</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
