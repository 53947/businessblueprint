import { BrandLogo, BrandLogoCompact } from "@/components/brand-logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-400 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <BrandLogo brand="businessblueprint" variant="dark" size="xl" />
          </div>
          <p className="text-gray-800 text-sm mt-4 max-w-2xl mx-auto">
            We Assess. We Prescribe. You Grow.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <BrandLogoCompact brand="hostsblue" variant="dark" />
            <BrandLogoCompact brand="swipesblue" variant="dark" />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/assessment" className="text-black font-bold hover:text-white transition-colors underline">Digital IQ Assessment</a></li>
              <li><a href="/find-results" className="text-black font-bold hover:text-white transition-colors underline">Find My Results</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Website Development</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">SEO Optimization</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Reputation Management</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Social Media Marketing</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Email Campaigns</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/subscription" className="text-black font-bold hover:text-white transition-colors underline">DIY Platform</a></li>
              <li><a href="/coach-blue" className="text-black font-bold hover:text-white transition-colors underline">Coach Blue</a></li>
              <li><a href="/portal" className="text-black font-bold hover:text-white transition-colors underline">Client Portal</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Analytics Dashboard</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Hosting Solutions</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-black font-bold hover:text-white transition-colors underline">About Us</a></li>
              <li><a href="/contact" className="text-black font-bold hover:text-white transition-colors underline">Contact</a></li>
              <li><a href="/sitemap" className="text-black font-bold hover:text-white transition-colors underline">Site Map</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Careers</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Press</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Partners</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Help Center</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Documentation</a></li>
              <li><a href="/contact" className="text-black font-bold hover:text-white transition-colors underline">Contact Support</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Live Chat</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Training Videos</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors underline">Community Forum</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-500 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-black font-bold mb-4 md:mb-0">
              © {currentYear} Triad Blue Inc. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-black font-bold hover:text-white transition-colors underline">Privacy Policy</a>
              <a href="/terms" className="text-black font-bold hover:text-white transition-colors underline">Terms of Service</a>
              <a href="/data-deletion" className="text-black font-bold hover:text-white transition-colors underline">Data Deletion</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}