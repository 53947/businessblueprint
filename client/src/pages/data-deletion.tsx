import { Link } from "wouter";
import { ArrowLeft, Trash2, Database, Clock } from "lucide-react";

export default function DataDeletion() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2">Data Deletion Instructions</h1>
        <p className="text-gray-600 mb-8">How to request deletion of your personal data from Business Blueprint</p>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-blue-900 mb-2">Your Right to Data Deletion</p>
            <p className="text-blue-800">
              Under data protection regulations (GDPR, CCPA), you have the right to request deletion of your personal information. This page explains how to exercise that right.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <Database className="w-6 h-6" />
            What Data We Delete
          </h2>
          <p className="mb-4">When you request data deletion, we will remove:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Account Information:</strong> Name, email, phone number, business details</li>
            <li><strong>Social Media Connections:</strong> Connected account tokens and permissions</li>
            <li><strong>Content:</strong> Social media posts, drafts, and scheduled content</li>
            <li><strong>Communications:</strong> Messages, emails, SMS records</li>
            <li><strong>Analytics Data:</strong> Usage history and engagement metrics</li>
            <li><strong>AI Coach History:</strong> Conversation logs and recommendations</li>
            <li><strong>Payment Information:</strong> Billing details (subject to legal retention requirements)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <Trash2 className="w-6 h-6" />
            How to Request Data Deletion
          </h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Method 1: Self-Service Account Deletion</h3>
          <ol className="list-decimal pl-6 mb-6">
            <li className="mb-2">Log in to your Business Blueprint account</li>
            <li className="mb-2">Navigate to <strong>Settings → Account Settings</strong></li>
            <li className="mb-2">Scroll to the bottom and click <strong>"Delete My Account"</strong></li>
            <li className="mb-2">Confirm deletion by entering your password</li>
            <li className="mb-2">Click <strong>"Permanently Delete Account"</strong></li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Method 2: Email Request</h3>
          <p className="mb-4">If you cannot access your account, send an email to:</p>
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
            <p className="font-mono text-sm mb-2"><strong>To:</strong> privacy@businessblueprint.io</p>
            <p className="font-mono text-sm mb-2"><strong>Subject:</strong> Data Deletion Request</p>
            <p className="font-mono text-sm"><strong>Include:</strong> Your full name, email address, and business name (if applicable)</p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Method 3: Facebook App Data Deletion</h3>
          <p className="mb-4">If you connected via Facebook/Instagram and want to delete data associated with our Meta app:</p>
          <ol className="list-decimal pl-6 mb-6">
            <li className="mb-2">Go to your Facebook Settings → Apps and Websites</li>
            <li className="mb-2">Find "Business Blueprint" in your connected apps</li>
            <li className="mb-2">Click "Remove" or "Delete App Data"</li>
            <li className="mb-2">Alternatively, email us at <strong>privacy@businessblueprint.io</strong> with "Facebook Data Deletion" in the subject line</li>
          </ol>

          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Deletion Timeline
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <ul className="list-disc pl-6">
              <li className="mb-2"><strong>Immediate:</strong> Your account is deactivated within 24 hours</li>
              <li className="mb-2"><strong>Within 30 days:</strong> Most data is permanently deleted from active systems</li>
              <li className="mb-2"><strong>Within 90 days:</strong> All data is removed from backups and archives</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Data Retention Exceptions</h2>
          <p className="mb-4">Some data may be retained for legal or business purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Financial Records:</strong> Transaction history retained for 7 years (tax/audit requirements)</li>
            <li><strong>Legal Compliance:</strong> Data required by law to be retained</li>
            <li><strong>Fraud Prevention:</strong> Records of fraudulent activity</li>
            <li><strong>Anonymized Data:</strong> Aggregated analytics that cannot identify you</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Data</h2>
          <p className="mb-4">
            Deleting your Business Blueprint account does <strong>not</strong> automatically delete data from third-party platforms:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Social Media:</strong> Posts published to Facebook, Instagram, LinkedIn, X, etc., remain on those platforms</li>
            <li><strong>Synup:</strong> Listings data managed through Synup may require separate deletion</li>
            <li><strong>Payment Processors:</strong> Swipes Blue/NMI may retain transaction records</li>
          </ul>
          <p className="mb-6">
            You must separately contact these platforms to delete data stored with them.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Verification Process</h2>
          <p className="mb-4">
            To protect your privacy, we may require identity verification before processing deletion requests. This may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Confirming your email address</li>
            <li>Answering account security questions</li>
            <li>Providing government-issued ID (for sensitive requests)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Confirmation</h2>
          <p className="mb-4">
            Once your data is deleted, we will send a confirmation email to your registered email address. If you do not receive confirmation within 30 days, please contact us at privacy@businessblueprint.io.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Questions?</h2>
          <p className="mb-4">
            For questions about data deletion or privacy, contact us:
          </p>
          <p className="mb-4">
            <strong>Business Blueprint</strong><br />
            Email: privacy@businessblueprint.io<br />
            Website: <a href="https://businessblueprint.io" className="text-blue-600 hover:underline">businessblueprint.io</a>
          </p>

          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-8">
            <p className="text-sm text-gray-700">
              <strong>Related:</strong> See our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
