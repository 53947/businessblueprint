import cloudpleaserLogo from "@assets/cloudpleaser_1758744493180.png";
import webhostedLogo from "@assets/webnhosted_1758744493181.png";
import airswipedLogo from "@assets/airswiped_1758744493180.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src={cloudpleaserLogo} alt="cloudpleaser.io" className="w-8 h-8 brightness-0 invert" />
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-white">cloud</span>
                <span className="text-xl font-bold text-blue-400">pleaser</span>
                <span className="text-lg font-medium text-green-400">.io</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Helping local businesses succeed online. Get found, get customers, get business.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img src={webhostedLogo} alt="webhosted.io" className="w-4 h-4 brightness-0 invert" />
                <span className="text-sm text-gray-400">webhosted<span className="text-green-400">.io</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <img src={airswipedLogo} alt="airswiped.com" className="w-4 h-4 brightness-0 invert" />
                <span className="text-sm text-gray-400">airswiped<span className="text-green-400">.com</span></span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/assessment" className="hover:text-white transition-colors">Digital Assessment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Website Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SEO Optimization</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reputation Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Social Media Marketing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Email Campaigns</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/subscription" className="hover:text-white transition-colors">DIY Tools</a></li>
              <li><a href="/subscription" className="hover:text-white transition-colors">Managed Services</a></li>
              <li><a href="/ai-coach" className="hover:text-white transition-colors">AI Coach</a></li>
              <li><a href="/portal" className="hover:text-white transition-colors">Client Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hosting Solutions</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/sitemap" className="hover:text-white transition-colors">Site Map</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Live Chat</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Training Videos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} cloudpleaser.io. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}