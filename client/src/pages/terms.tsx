import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: October 28, 2025</p>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using Business Blueprint's services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Service</h2>
          <p className="mb-4">
            Business Blueprint provides a digital intelligence platform that includes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>AI-powered Digital Blueprint assessments</li>
            <li>Social media content management and scheduling</li>
            <li>Unified communication inbox (Commverse)</li>
            <li>Business listings and reputation management</li>
            <li>Email and SMS marketing automation</li>
            <li>Live chat functionality</li>
            <li>AI Business Coach</li>
            <li>Marketplace for à la carte services</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. User Accounts</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Account Creation</h3>
          <p className="mb-4">
            You must create an account to use our services. You agree to provide accurate, current, and complete information and to keep your account information updated.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Account Security</h3>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Subscription Plans and Billing</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Pricing Tiers</h3>
          <p className="mb-4">We offer multiple subscription tiers:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>DIY Pathway:</strong> Self-service tools with AI Coach support</li>
            <li><strong>À La Carte:</strong> Individual services purchased separately</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Payment</h3>
          <p className="mb-4">
            Subscriptions are billed monthly or annually in advance. Prices are processed through Swipes Blue, our integrated payment processor. All fees are non-refundable except as required by law.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Cancellation</h3>
          <p className="mb-4">
            You may cancel your subscription at any time. Cancellations take effect at the end of the current billing period.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Acceptable Use</h2>
          <p className="mb-4">You agree NOT to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Violate any laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Post harmful, offensive, or inappropriate content</li>
            <li>Spam or send unsolicited messages</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use our services for fraudulent purposes</li>
            <li>Reverse engineer or decompile our software</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Social Media Integration</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">6.1 Platform Connections</h3>
          <p className="mb-4">
            You may connect social media accounts (Facebook, Instagram, LinkedIn, X/Twitter, Google Business, TikTok, Snapchat) to our platform. You grant us permission to post content and manage communications on your behalf.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Platform Compliance</h3>
          <p className="mb-4">
            You must comply with each social media platform's terms of service. We are not responsible for actions taken by these platforms, including account suspensions or restrictions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Content Ownership and License</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">7.1 Your Content</h3>
          <p className="mb-4">
            You retain ownership of all content you create or upload. By using our services, you grant us a license to use, store, and display your content as necessary to provide our services.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">7.2 Our Content</h3>
          <p className="mb-4">
            All content, features, and functionality of our platform are owned by Business Blueprint and protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. AI-Powered Services</h2>
          <p className="mb-4">
            Our AI services (Digital Blueprint, AI Business Coach, automated review responses) use artificial intelligence. While we strive for accuracy, AI-generated content may not always be perfect. You are responsible for reviewing and approving AI-generated content before publication.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Third-Party Services</h2>
          <p className="mb-4">
            We integrate with third-party services (Synup, OpenAI, social media platforms, payment processors). These services have their own terms, and we are not responsible for their actions or failures.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Disclaimers and Limitation of Liability</h2>
          <p className="mb-4">
            Our services are provided "AS IS" without warranties of any kind. We do not guarantee uninterrupted or error-free service. To the maximum extent permitted by law, Business Blueprint shall not be liable for any indirect, incidental, or consequential damages.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">11. Indemnification</h2>
          <p className="mb-4">
            You agree to indemnify and hold Business Blueprint harmless from any claims, damages, or expenses arising from your use of our services or violation of these Terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">12. Termination</h2>
          <p className="mb-4">
            We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">13. Changes to Terms</h2>
          <p className="mb-4">
            We may modify these Terms at any time. We will notify you of material changes by email or through our platform. Continued use of our services after changes constitutes acceptance.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">14. Governing Law</h2>
          <p className="mb-4">
            These Terms are governed by the laws of the United States and Canada, without regard to conflict of law principles.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">15. Contact Information</h2>
          <p className="mb-4">
            Questions about these Terms? Contact us at:
          </p>
          <p className="mb-4">
            <strong>Business Blueprint</strong><br />
            Email: legal@businessblueprint.io<br />
            Website: <a href="https://businessblueprint.io" className="text-blue-600 hover:underline">businessblueprint.io</a>
          </p>
        </div>
      </div>
    </div>
  );
}
