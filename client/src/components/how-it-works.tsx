import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import badge1 from "@assets/digital iq assessment_1764056639965.png";
import badge2 from "@assets/Get Your Prescribed Blueprint (2)_1763874287090.png";
import badge3 from "@assets/LocalBlue Bundle (3)_1763874287091.png";
import badge4 from "@assets/Coach Blue as Blue(4)_1763874287091.png";
import badge5 from "@assets/Commverse (5)_1763874287091.png";

interface HowItWorksProps {
  onStartAssessment: () => void;
}

export function HowItWorks({ onStartAssessment }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
          <p className="text-lg text-gray-600">Your 5-step journey to digital growth</p>
        </div>

        {/* Desktop Version - Full Text */}
        <div className="hidden md:grid grid-cols-5 gap-4 mb-12">
          {/* Step 1 - Complete Your Digital IQ Assessment */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-2">
              <img src={badge1} alt="Complete Your Digital IQ Assessment" className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Complete Your Digital IQ Assessment</h3>
            <p className="text-xs text-gray-600">You start with a quick assessment, and we generate your custom blueprint.</p>
          </div>

          {/* Step 2 - Prescribed Blueprint */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-2">
              <img src={badge2} alt="Prescribed Blueprint" className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Prescribed Blueprint</h3>
            <p className="text-xs text-gray-600">Your custom action plan with SEO, content strategy, and revenue-focused steps.</p>
          </div>

          {/* Step 3 - LocalBlue */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-2">
              <img src={badge3} alt="LocalBlue" className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">LocalBlue</h3>
            <p className="text-xs text-gray-600">Listings management + reputation building for stronger local visibility.</p>
          </div>

          {/* Step 4 - Coach Blue */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-2">
              <img src={badge4} alt="Coach Blue" className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Coach Blue</h3>
            <p className="text-xs text-gray-600">24/7 AI business coach guiding you through every step of your growth journey.</p>
          </div>

          {/* Step 5 - CommVerse */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-2">
              <img src={badge5} alt="CommVerse" className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">CommVerse</h3>
            <p className="text-xs text-gray-600">Complete communication suite: /send, /inbox, /livechat, /content.</p>
          </div>
        </div>

        {/* Mobile Version - Short Text */}
        <div className="block md:hidden grid grid-cols-1 gap-4 mb-12">
          {/* Step 1 - Digital IQ Assessment */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-2">
              <img src={badge1} alt="Digital IQ Assessment" className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Digital IQ Assessment</h3>
            <p className="text-xs text-gray-600">Quick assessment → instant blueprint.</p>
          </div>

          {/* Step 2 - Prescribed Blueprint */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-2">
              <img src={badge2} alt="Prescribed Blueprint" className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Prescribed Blueprint</h3>
            <p className="text-xs text-gray-600">Your clear action plan to grow.</p>
          </div>

          {/* Step 3 - LocalBlue */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-2">
              <img src={badge3} alt="LocalBlue" className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">LocalBlue</h3>
            <p className="text-xs text-gray-600">Boost local visibility & reviews.</p>
          </div>

          {/* Step 4 - Coach Blue */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-2">
              <img src={badge4} alt="Coach Blue" className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Coach Blue</h3>
            <p className="text-xs text-gray-600">Your 24/7 AI business coach.</p>
          </div>

          {/* Step 5 - CommVerse */}
          <div className="text-center group">
            <div className="flex items-center justify-center mx-auto mb-2">
              <img src={badge5} alt="CommVerse" className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-300" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">CommVerse</h3>
            <p className="text-xs text-gray-600">Messaging, chat, email, content.</p>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary via-secondary to-blue-600 text-white text-center">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-3">Ready to See Your Digital IQ Score?</h3>
            <p className="text-base mb-5 opacity-90">Join 10,000+ businesses who've improved their online presence</p>
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
