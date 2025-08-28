import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Brain, BarChart3 } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  const startAssessment = () => {
    setLocation("/assessment");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <a href="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity">
                <Brain className="h-6 w-6 text-blue-500" />
                <span>
                  <span className="text-black">cloud</span>
                  <span className="text-blue-500">pleaser</span>
                  <span className="text-green-400">.io</span>
                </span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={startAssessment} className="bg-blue-500 hover:bg-blue-600">
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Digital Empowerment for Your Business
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover exactly what your business needs to succeed online. Our AI analyzes your online presence using Google's business intelligence.
          </p>
          <Button onClick={startAssessment} size="lg" className="bg-blue-500 hover:bg-blue-600">
            <BarChart3 className="w-5 h-5 mr-2" />
            Start Free Assessment
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold mb-4">
            <Brain className="h-6 w-6 text-blue-500" />
            <span>
              <span className="text-white">cloud</span>
              <span className="text-blue-500">pleaser</span>
              <span className="text-green-400">.io</span>
            </span>
          </div>
          <p className="text-gray-400">
            Digital empowerment for businesses through AI-powered insights.
          </p>
          <p className="text-gray-500 mt-4">
            &copy; 2024 cloudpleaser.io. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}