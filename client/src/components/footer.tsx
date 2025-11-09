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
              <li><a href="/assessment" className="text-black font-bold hover:text-white transition-colors">Digital Assessment</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Website Development</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">SEO Optimization</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Reputation Management</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Social Media Marketing</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Email Campaigns</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/subscription" className="text-black font-bold hover:text-white transition-colors">DIY Tools</a></li>
              <li><a href="/subscription" className="text-black font-bold hover:text-white transition-colors">Managed Services</a></li>
              <li><a href="/ai-coach" className="text-black font-bold hover:text-white transition-colors">AI Coach</a></li>
              <li><a href="/portal" className="text-black font-bold hover:text-white transition-colors">Client Portal</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Analytics Dashboard</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Hosting Solutions</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-black font-bold hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-black font-bold hover:text-white transition-colors">Contact</a></li>
              <li><a href="/sitemap" className="text-black font-bold hover:text-white transition-colors">Site Map</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/contact" className="text-black font-bold hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Live Chat</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Training Videos</a></li>
              <li><a href="#" className="text-black font-bold hover:text-white transition-colors">Community Forum</a></li>
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
              <a href="/privacy" className="text-black font-bold hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-black font-bold hover:text-white transition-colors">Terms of Service</a>
              <a href="/data-deletion" className="text-black font-bold hover:text-white transition-colors">Data Deletion</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}