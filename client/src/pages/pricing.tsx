import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedPricingTable } from "@/components/animated-pricing-table";
import { useLocation } from "wouter";
import { Sparkles, Shield, Zap } from "lucide-react";

export default function PricingPage() {
  const [, setLocation] = useLocation();

  const handleSelectPlan = (planId: string) => {
    setLocation(`/subscription?plan=${planId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose Your Path to Digital Success
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Select from our 6-tier pricing structure designed to grow with your business. 
            Whether you prefer to do it yourself or want managed services, we have the perfect plan for you.
          </p>
          
          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">AI-Powered</h3>
              <p className="text-sm text-gray-600">Intelligent recommendations based on your business needs</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Transparent Pricing</h3>
              <p className="text-sm text-gray-600">No hidden fees, clear value at every tier</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Flexible Terms</h3>
              <p className="text-sm text-gray-600">Monthly, quarterly, or annual billing - you choose</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedPricingTable onSelectPlan={handleSelectPlan} />
        </div>
      </section>

      {/* FAQ or Additional Info */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Not Sure Which Plan Is Right for You?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Take our free Digital IQ Assessment to receive personalized recommendations 
            based on your business goals and current digital presence.
          </p>
          <a 
            href="/assessment" 
            className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            data-testid="button-start-assessment"
          >
            Start Free Assessment
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
