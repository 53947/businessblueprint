import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import badge1 from "@assets/step1-digital-iq-assessment.png";
import badge2 from "@assets/step2-blueprint-prescription.png";
import badge3 from "@assets/step3-localblue.png";
import badge4 from "@assets/step4-coach-blue.png";
import badge5 from "@assets/step5-commverse.png";

interface HowItWorksProps {
  onStartAssessment: () => void;
}

export function HowItWorks({ onStartAssessment }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Your 5-step journey to digital growth</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 mb-16">
          {/* Step 1 - Digital IQ Assessment */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-4">
              <img src={badge1} alt="Digital IQ Assessment" className="w-24 h-24 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Digital IQ Assessment</h3>
            <p className="text-sm text-gray-600">AI analyzes your online presence and scores your Digital IQ</p>
          </div>

          {/* Step 2 - Prescribed Blueprint */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-4">
              <img src={badge2} alt="Prescribed Blueprint" className="w-24 h-24 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Get Your Prescribed Blueprint</h3>
            <p className="text-sm text-gray-600">We diagnose your digital presence and prescribe the exact blueprint your business needs to grow</p>
          </div>

          {/* Step 3 - LocalBlue */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-4">
              <img src={badge3} alt="LocalBlue" className="w-24 h-24 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">LocalBlue - Your Digital Base</h3>
            <p className="text-sm text-gray-600">Listings + Reputation management for digital excellence</p>
          </div>

          {/* Step 4 - Coach Blue */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-4">
              <img src={badge4} alt="Coach Blue" className="w-24 h-24 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Coach Blue - AI Business Coach</h3>
            <p className="text-sm text-gray-600">AI guides you through every step of your growth journey</p>
          </div>

          {/* Step 5 - CommVerse Bundle */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-4">
              <img src={badge5} alt="CommVerse" className="w-24 h-24 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">CommVerse Bundle</h3>
            <p className="text-sm text-gray-600">Complete communication suite - /send, /inbox, /livechat, /content</p>
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
