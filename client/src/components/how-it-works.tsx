import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, BarChart3, Rocket } from "lucide-react";

interface HowItWorksProps {
  onStartAssessment: () => void;
}

export function HowItWorks({ onStartAssessment }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple steps to transform your digital presence</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div className="text-center group">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Search className="w-8 h-8 text-primary group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">1. AI Analysis</h3>
            <p className="text-gray-600">Our AI scans your Google Business presence, reviews, and digital footprint to create a comprehensive snapshot within 24 hours</p>
          </div>

          {/* Step 2 */}
          <div className="text-center group">
            <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-secondary group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">2. Custom Report</h3>
            <p className="text-gray-600">Receive a detailed email report with your Digital IQ Score and specific recommendations to improve your online presence</p>
          </div>

          {/* Step 3 */}
          <div className="text-center group">
            <div className="bg-blue-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <Rocket className="w-8 h-8 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">3. DIY Implementation</h3>
            <p className="text-gray-600">Use our platform's tools and AI guidance to implement recommendations yourself at your own pace</p>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary via-secondary to-blue-600 text-white text-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to See Your Digital IQ Score?</h3>
            <p className="text-lg mb-6 opacity-90">Join 10,000+ businesses who've improved their online presence</p>
            <Button 
              onClick={onStartAssessment}
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary transition-all font-medium"
              data-testid="button-get-digital-iq"
            >
              Get Your Digital IQ Score
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
