import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import step1Icon from "@assets/step1-digital-iq-assessment.png";
import step2Icon from "@assets/step2-blueprint-prescription.png";
import step3Icon from "@assets/step3-localblue.png";
import step4Icon from "@assets/step4-coach-blue.png";
import step5Icon from "@assets/step5-commverse.png";

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
            <div className="bg-orange-500/10 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4 p-2 group-hover:bg-orange-500/20 transition-all duration-300">
              <img src={step1Icon} alt="Digital IQ Assessment" className="w-full h-full object-contain" />
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold mx-auto mb-3 shadow-md">1</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Digital IQ Assessment</h3>
            <p className="text-sm text-gray-600">AI analyzes your online presence and scores your Digital IQ</p>
          </div>

          {/* Step 2 - Prescribed Blueprint */}
          <div className="text-center group">
            <div className="bg-yellow-500/10 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4 p-2 group-hover:bg-yellow-500/20 transition-all duration-300">
              <img src={step2Icon} alt="Prescribed Blueprint" className="w-full h-full object-contain" />
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold mx-auto mb-3 shadow-md">2</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Get Your Prescribed Blueprint</h3>
            <p className="text-sm text-gray-600">We diagnose your digital presence and prescribe the exact blueprint your business needs to grow</p>
          </div>

          {/* Step 3 - LocalBlue */}
          <div className="text-center group">
            <div className="bg-blue-500/10 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4 p-2 group-hover:bg-blue-500/20 transition-all duration-300">
              <img src={step3Icon} alt="LocalBlue" className="w-full h-full object-contain" />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mx-auto mb-3 shadow-md">3</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">LocalBlue - Your Digital Base</h3>
            <p className="text-sm text-gray-600">Listings + Reputation management for digital excellence</p>
          </div>

          {/* Step 4 - Coach Blue */}
          <div className="text-center group">
            <div className="bg-purple-500/10 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4 p-2 group-hover:bg-purple-500/20 transition-all duration-300">
              <img src={step4Icon} alt="Coach Blue" className="w-full h-full object-contain" />
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold mx-auto mb-3 shadow-md">4</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Coach Blue - AI Business Coach</h3>
            <p className="text-sm text-gray-600">AI guides you through every step of your growth journey</p>
          </div>

          {/* Step 5 - CommVerse Bundle */}
          <div className="text-center group">
            <div className="bg-green-500/10 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4 p-2 group-hover:bg-green-500/20 transition-all duration-300">
              <img src={step5Icon} alt="CommVerse" className="w-full h-full object-contain" />
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mx-auto mb-3 shadow-md">5</div>
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
