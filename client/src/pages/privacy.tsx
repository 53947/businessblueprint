import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: October 28, 2025</p>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Business Blueprint ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our digital intelligence platform and related services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Personal Information</h3>
          <p className="mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name, email address, phone number</li>
            <li>Business information (business name, address, website)</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Communications with us</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Automatically Collected Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage data (pages viewed, features used, time spent)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Social Media Data</h3>
          <p className="mb-4">
            When you connect social media accounts (Facebook, Instagram, LinkedIn, X/Twitter, Google Business, TikTok, Snapchat), we collect:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Profile information</li>
            <li>Posts and content you create through our platform</li>
            <li>Messages and comments (for inbox aggregation)</li>
            <li>Analytics and engagement metrics</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use the collected information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process your transactions and send related information</li>
            <li>Generate your Digital Blueprint and AI-powered insights</li>
            <li>Manage your social media content and communications</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Detect, prevent, and address technical issues and fraud</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Information Sharing and Disclosure</h2>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., Synup for listings management, OpenAI for AI services)</li>
            <li><strong>Social Media Platforms:</strong> When you authorize us to post content or manage your accounts</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information, including encryption, secure servers, and access controls. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights and Choices</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Disconnect social media accounts at any time</li>
            <li>Request a copy of your data</li>
            <li>Request data deletion (see our <Link href="/data-deletion" className="text-blue-600 hover:underline">Data Deletion Instructions</Link>)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Cookies and Tracking</h2>
          <p className="mb-4">
            We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can control cookies through your browser settings.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Third-Party Services</h2>
          <p className="mb-4">
            Our platform integrates with third-party services (Facebook, Instagram, LinkedIn, X/Twitter, Google, TikTok, Snapchat, Synup, OpenAI). These services have their own privacy policies, and we encourage you to review them.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Children's Privacy</h2>
          <p className="mb-4">
            Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Us</h2>
          <p className="mb-4">
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mb-4">
            <strong>Business Blueprint</strong><br />
            Email: privacy@businessblueprint.io<br />
            Website: <a href="https://businessblueprint.io" className="text-blue-600 hover:underline">businessblueprint.io</a>
          </p>
        </div>
      </div>
    </div>
  );
}
