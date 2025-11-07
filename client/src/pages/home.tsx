import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation, Link } from "wouter";
import { AICoachIcon } from "@/components/pathway-icons";
import compassIcon from "@assets/icons/compass.svg";
import { HowItWorks } from "@/components/how-it-works";
import { ServicePathways } from "@/components/service-pathways";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BrandLogo } from "@/components/brand-logo";
import { ClipboardCheck, FileText, Layers, Wrench, Rocket } from "lucide-react";
import { DigitalAssessmentIcon, DigitalIQIcon, CommverseIcon, CoachBlueIcon, BasePlanIcon, ActionPlanIcon, BuildMethodIcon } from "@/components/brand-icons";
import bbIcon from "@assets/businesblueprint assets/Blueprint_Favicon.png";
import bbLogo from "@assets/businesblueprint assets/Blueprint_Avatar.png";
import webhostedIcon from "@assets/hostsblue assets/Hosts Blue Brandmark.png";
import webhostedLogo from "@assets/hostsblue assets/hostsblue URL.png";
import airswipedLogo from "@assets/swipesblue/swipesblue brandmark.png";
import step1Icon from "@assets/native icons and favicons/11-05-2025 Updated or New Images/1-Complete your digital assessment.png";
import step2Icon from "@assets/native icons and favicons/11-05-2025 Updated or New Images/2-Get your prescribed blueprint.png";
import step3Icon from "@assets/native icons and favicons/11-05-2025 Updated or New Images/3-Choose your base plan.png";
import step4Icon from "@assets/native icons and favicons/11-05-2025 Updated or New Images/4-Select your build method.png";
import step5Icon from "@assets/native icons and favicons/11-05-2025 Updated or New Images/5-Start to Build.png";
import sendIcon from "@assets/native icons and favicons/: send app icon.png";
import sendLogo from "@assets/logos and wordmarks/: send app logo.png";
import inboxIcon from "@assets/native icons and favicons/: inbox app icon.png";
import inboxLogo from "@assets/logos and wordmarks/: inbox app logo.png";
import livechatIcon from "@assets/native icons and favicons/: livechat app icon.png";
import livechatLogo from "@assets/logos and wordmarks/: livechat app logo.png";
import contentIcon from "@assets/native icons and favicons/: content app icon.png";
import contentLogo from "@assets/logos and wordmarks/: content app logo.png";
import commverseBundle from "@assets/logos and wordmarks/: commverse bundle logo.png";
import commverseIcon from "@assets/native icons and favicons/: commverse.png";

export default function Home() {
  const [, setLocation] = useLocation();

  const startAssessment = () => {
    setLocation("/assessment");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showNavigation={true} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-gray-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-8 lg:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <span className="mr-2">🔍</span>
                  Powered by Google Business Intelligence
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-shadow-strong" style={{ color: '#FF6B00' }}>We Assess. We Prescribe.</span> <span className="whitespace-nowrap text-[110%]">You Grow.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our AI analyzes your online presence using Google Business Intelligence and prescribes your exact digital blueprint - not generic advice, but YOUR custom plan with the right apps, paths, and pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={startAssessment} 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-[#0000FF] bg-white hover:bg-gray-50 text-[#FF6B00] font-semibold"
                  data-testid="button-start-assessment"
                >
                  <DigitalAssessmentIcon size={32} className="mr-2" />
                  Start Free Assessment
                </Button>
                <Link href="/ai-coach">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-[#0000FF] bg-white hover:bg-gray-50 text-[#FF6B00] font-semibold w-full sm:w-auto"
                    data-testid="button-ai-coach"
                  >
                    <CoachBlueIcon size={32} className="mr-2" />
                    AI Business Coach
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  No Credit Card Required
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">⏱️</span>
                  Results in 24 Hours
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">🛡️</span>
                  100% Secure
                </div>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden">
                {/* Blueprint Paper Grid Lines */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2 relative z-10">A Blueprint to your growth</h3>
                <p className="text-sm text-gray-600 mb-6 relative z-10">
                  Custom digital growth plan based on AI analysis of your business
                </p>
                <div className="space-y-4 relative z-10">
                  <div className="flex gap-3 p-3 rounded-lg border-l-4 border-orange-500">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <ClipboardCheck className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shadow-md">1</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Complete your digital assessment</div>
                      <p className="text-sm text-gray-600">
                        AI analyzes your online presence and scores your Digital IQ
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-3 rounded-lg border-l-4 border-yellow-500">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-yellow-600" />
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold shadow-md">2</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Get your prescribed blueprint</div>
                      <p className="text-sm text-gray-600">
                        We diagnose your digital presence and prescribe the exact blueprint your business needs to grow
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-3 rounded-lg border-l-4 border-blue-500">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-md">3</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Choose your base plan</div>
                      <p className="text-sm text-gray-600">
                        Start ($99), Advanced ($299), or Scale ($999) - pick your structural depth
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-3 rounded-lg border-l-4 border-purple-500">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold shadow-md">4</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Select your build method</div>
                      <p className="text-sm text-gray-600">
                        Do It Yourself, Managed Services Provided, or A La Carte (pick modules without base plan)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-3 rounded-lg border-l-4 border-green-500">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-md">5</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Start to Build</div>
                      <p className="text-sm text-gray-600">
                        Add Commverse apps, coaching, and access your dashboard
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-500 font-medium mb-4">Trusted by 10,000+ businesses worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl text-gray-400">🔍</span>
              <span className="font-bold text-gray-400">Business</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl text-gray-400">⭐</span>
              <span className="font-bold text-gray-400">Reviews</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl text-gray-400">🔍</span>
              <span className="font-bold text-gray-400">SEO</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl text-gray-400">📊</span>
              <span className="font-bold text-gray-400">Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Prescription - What You Get */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              💊 YOUR PRESCRIPTION
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Not Generic Advice. <span className="text-shadow-strong" style={{ color: '#FF6B00' }}>Your Custom Blueprint</span>.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              After analyzing your business with Google Intelligence, we prescribe exactly what you need to succeed online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-all" data-testid="card-digital-iq">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <DigitalIQIcon size={64} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Your Digital IQ Score</h3>
                <p className="text-gray-600 text-sm">
                  A 0-140 assessment of your current online presence based on Google Business Profile, reviews, listings, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200 hover:shadow-xl transition-all" data-testid="card-base-plan">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <BasePlanIcon size={64} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Recommended Base Plan</h3>
                <p className="text-gray-600 text-sm">
                  Start ($99), Advanced ($299), or Scale ($999) - prescribed based on your Digital IQ and business needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:shadow-xl transition-all" data-testid="card-commverse">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <CommverseIcon size={64} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Commverse Apps + Paths</h3>
                <p className="text-gray-600 text-sm">
                  Which apps you need (/send, /inbox, /livechat, /content) and SPECIFIC PATHS tailored to your business type.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:shadow-xl transition-all" data-testid="card-build-method">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <BuildMethodIcon size={64} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Your Build Method</h3>
                <p className="text-gray-600 text-sm">
                  DIY (hands-on), MSP (managed for you), or ALC (pick specific tools) - recommended based on your comfort level.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:shadow-xl transition-all" data-testid="card-action-plan">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <ActionPlanIcon size={64} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">30-Day Action Plan</h3>
                <p className="text-gray-600 text-sm">
                  Week-by-week priorities so you know exactly what to do first, second, third, and fourth.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:shadow-xl transition-all" data-testid="card-ai-coach">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <CoachBlueIcon size={64} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Coach Guidance</h3>
                <p className="text-gray-600 text-sm">
                  Coach Blue answers questions and guides you through each step of your personalized blueprint.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button onClick={startAssessment} size="lg" className="bg-[#FF6B00] hover:bg-[#FF5500] text-white px-8 py-6 text-lg" data-testid="button-get-prescription">
              <span className="mr-2">📋</span>
              Get Your Free Prescription Now
            </Button>
            <p className="mt-4 text-sm text-gray-500">Takes 2 minutes • No credit card required • Results in 24 hours</p>
          </div>
        </div>
      </section>

      {/* CommVerse Bundle - Featured Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              💬 COMPLETE COMMUNICATIONS SUITE
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Talk to the Universe with <span className="text-shadow-strong" style={{ color: '#FF6B00' }}>CommVerse</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get all 4 communication apps together and save $40/month. A complete suite to connect with your customers anywhere, anytime.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            {/* Individual Apps */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Individual Apps ($35/mo each)</h3>
              
              <Card className="border-2 border-purple-200 hover:shadow-lg transition-all" data-testid="card-send-app">
                <CardContent className="p-4 flex items-center gap-4">
                  <img src={sendIcon} alt="/send icon" className="w-12 h-12 rounded-lg" />
                  <div className="flex-1">
                    <img src={sendLogo} alt="/send" className="h-6 mb-2" />
                    <p className="text-sm text-gray-600">Broadcast messages to customers</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">$35</div>
                    <div className="text-xs text-gray-500">/month</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:shadow-lg transition-all" data-testid="card-inbox-app">
                <CardContent className="p-4 flex items-center gap-4">
                  <img src={inboxIcon} alt="/inbox icon" className="w-12 h-12 rounded-lg" />
                  <div className="flex-1">
                    <img src={inboxLogo} alt="/inbox" className="h-6 mb-2" />
                    <p className="text-sm text-gray-600">Manage customer responses</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">$35</div>
                    <div className="text-xs text-gray-500">/month</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:shadow-lg transition-all" data-testid="card-livechat-app">
                <CardContent className="p-4 flex items-center gap-4">
                  <img src={livechatIcon} alt="/livechat icon" className="w-12 h-12 rounded-lg" />
                  <div className="flex-1">
                    <img src={livechatLogo} alt="/livechat" className="h-6 mb-2" />
                    <p className="text-sm text-gray-600">Real-time customer chat</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">$35</div>
                    <div className="text-xs text-gray-500">/month</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:shadow-lg transition-all" data-testid="card-content-app">
                <CardContent className="p-4 flex items-center gap-4">
                  <img src={contentIcon} alt="/content icon" className="w-12 h-12 rounded-lg" />
                  <div className="flex-1">
                    <img src={contentLogo} alt="/content" className="h-6 mb-2" />
                    <p className="text-sm text-gray-600">Create and publish content</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">$35</div>
                    <div className="text-xs text-gray-500">/month</div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-right pt-4 border-t-2 border-gray-300">
                <div className="text-sm text-gray-600">Individual Total:</div>
                <div className="text-3xl font-bold text-gray-400 line-through">$140/month</div>
              </div>
            </div>

            {/* Bundle Offer */}
            <div>
              <Card className="border-4 border-purple-500 shadow-2xl bg-gradient-to-br from-white to-purple-50" data-testid="card-commverse-bundle">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
                      💰 SAVE $40/MONTH
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <img src={commverseIcon} alt="commverse icon" className="h-20 w-20 object-contain" />
                    </div>
                    <img src={commverseBundle} alt="commverse bundle" className="h-10 mx-auto mb-4" />
                    <p className="text-gray-600 mb-6">All 4 communication apps included</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold mb-2" style={{ color: '#FF6B00' }}>$100</div>
                    <div className="text-gray-600 text-lg">/month</div>
                    <div className="text-sm text-green-600 font-semibold mt-2">
                      (Instead of $140/month)
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">All 4 CommVerse apps</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Unified dashboard</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Seamless integration</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Priority support</span>
                    </div>
                  </div>

                  <Button className="w-full bg-[#FF6B00] hover:bg-[#FF5500] text-white text-lg py-6" data-testid="button-get-commverse-bundle">
                    Get CommVerse Bundle
                  </Button>
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Prescribed based on your business needs
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700 italic">
              "A complete communications suite that lets you talk to the universe"
            </p>
          </div>
        </div>
      </section>

      {/* Base Plans Comparison */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              💰 BASE PLANS
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Three Plans. <span className="text-shadow-strong" style={{ color: '#FF6B00' }}>One Prescription</span>.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your base plan based on business size. Commverse apps are prescribed separately and available in our marketplace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Start Plan */}
            <Card className="border-4 border-orange-300 hover:shadow-2xl transition-all relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                DIGITAL IQ 0-40
              </div>
              <CardContent className="p-8 pt-12">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Start</h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold" style={{ color: '#FFA500' }}>$99</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                  <p className="text-gray-600 text-sm">Perfect for small businesses just starting their digital journey</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">1 Business Location</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Digital Assessment & IQ Score</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Custom Prescription Blueprint</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">AI Coach Access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Basic Support</span>
                  </li>
                </ul>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" data-testid="button-choose-start-plan">
                  Choose Start
                </Button>
              </CardContent>
            </Card>

            {/* Advanced Plan */}
            <Card className="border-4 border-blue-400 hover:shadow-2xl transition-all relative transform scale-105">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-xl">
                🌟 MOST POPULAR
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg" style={{ marginTop: '2rem' }}>
                DIGITAL IQ 41-70
              </div>
              <CardContent className="p-8 pt-16">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Advanced</h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold" style={{ color: '#0000FF' }}>$299</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                  <p className="text-gray-600 text-sm">For growing businesses ready to scale their digital presence</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Everything in Start, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Up to 3 Business Locations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Marketing Automation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Priority AI Coach Support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Enhanced Analytics</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-choose-advanced-plan">
                  Choose Advanced
                </Button>
              </CardContent>
            </Card>

            {/* Scale Plan */}
            <Card className="border-4 border-green-300 hover:shadow-2xl transition-all relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                DIGITAL IQ 71+
              </div>
              <CardContent className="p-8 pt-12">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Scale</h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold" style={{ color: '#00FF40' }}>$999</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                  <p className="text-gray-600 text-sm">Enterprise-level for multi-location or high-volume businesses</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Everything in Advanced, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Unlimited Business Locations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Multi-location Support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">Dedicated Account Manager</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">White-label Options</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" data-testid="button-choose-scale-plan">
                  Choose Scale
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commverse Apps Overview */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🚀 COMMVERSE APPS
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Not Just Apps. <span className="text-shadow-strong" style={{ color: '#FF6B00' }}>Prescribed Paths</span>.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Based on your Digital IQ, we prescribe which Commverse apps you need AND the specific paths within each app. Available a la carte or as bundles in our marketplace.
            </p>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-orange-900 font-semibold">
                💡 Example: Not just "/send" - but "/send with Quick Campaign Launch path" prescribed specifically for your business type
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* /send */}
            <Card className="border-2 border-yellow-200 hover:shadow-xl transition-all hover:border-yellow-400">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <img src={sendIcon} alt="/send icon" className="h-16 w-16 object-contain mr-3" />
                  <img src={sendLogo} alt="/send" className="h-10 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Email & SMS Marketing</h3>
                <p className="text-gray-600 text-sm mb-4">Send targeted campaigns to your customers via email and text messaging.</p>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-yellow-900 mb-2">Example Paths:</p>
                  <ul className="text-xs text-yellow-800 space-y-1">
                    <li>• Quick Campaign Launch</li>
                    <li>• Build Your Audience First</li>
                    <li>• Re-engagement Flow</li>
                    <li>• Seasonal Campaign Builder</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* /inbox */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-all hover:border-blue-400">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <img src={inboxIcon} alt="/inbox icon" className="h-16 w-16 object-contain mr-3" />
                  <img src={inboxLogo} alt="/inbox" className="h-10 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Unified Communications</h3>
                <p className="text-gray-600 text-sm mb-4">Manage email, chat, and social DMs from one central inbox.</p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-blue-900 mb-2">Example Paths:</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Connect All Channels</li>
                    <li>• Team Collaboration Setup</li>
                    <li>• Customer Service Hub</li>
                    <li>• Sales Pipeline Management</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* /livechat */}
            <Card className="border-2 border-purple-200 hover:shadow-xl transition-all hover:border-purple-400">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <img src={livechatIcon} alt="/livechat icon" className="h-16 w-16 object-contain mr-3" />
                  <img src={livechatLogo} alt="/livechat" className="h-10 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Live Chat Widget</h3>
                <p className="text-gray-600 text-sm mb-4">Add real-time chat to your website for instant customer support.</p>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-purple-900 mb-2">Example Paths:</p>
                  <ul className="text-xs text-purple-800 space-y-1">
                    <li>• Install & Go Live</li>
                    <li>• FAQ Automation Setup</li>
                    <li>• Lead Capture Mode</li>
                    <li>• Support Ticket Creation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* /content */}
            <Card className="border-2 border-pink-200 hover:shadow-xl transition-all hover:border-pink-400">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <img src={contentIcon} alt="/content icon" className="h-16 w-16 object-contain mr-3" />
                  <img src={contentLogo} alt="/content" className="h-10 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Social Media Management</h3>
                <p className="text-gray-600 text-sm mb-4">Schedule and manage content across all your social platforms.</p>
                <div className="bg-pink-50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-pink-900 mb-2">Example Paths:</p>
                  <ul className="text-xs text-pink-800 space-y-1">
                    <li>• Content Calendar Quick Start</li>
                    <li>• Multi-Platform Scheduler</li>
                    <li>• AI Content Assistant</li>
                    <li>• Brand Voice Builder</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Your prescription will tell you which apps and which paths are right for YOUR business
            </p>
            <Link href="/commverse">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" data-testid="button-explore-applications">
                Explore All Applications
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* How It Works */}
      <HowItWorks onStartAssessment={startAssessment} />

      {/* Service Pathways */}
      <ServicePathways />

      {/* Platform Ecosystem */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Complete Digital Ecosystem</h2>
            <p className="text-xl text-gray-600">Three specialized platforms working together for your success</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow p-6">
              <CardContent className="flex flex-col">
                <div className="flex justify-center items-center mb-6 h-20">
                  <div style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}>
                    <BrandLogo brand="businessblueprint" size="lg" showIcon={true} />
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">Digital Intelligence Platform</p>
                <ul className="text-xs sm:text-sm text-gray-500 space-y-1 mb-6">
                  <li>• AI-powered business analysis</li>
                  <li>• Personalized coaching</li>
                  <li>• Client portal dashboard</li>
                  <li>• /send - Email & SMS Marketing</li>
                  <li>• /inbox - Unified Communications</li>
                  <li>• /livechat - Live Chat Widget</li>
                  <li>• /content - Social Media Mgmt</li>
                </ul>
                <Button className="w-full bg-[#FF6B00] hover:bg-[#FF5500] text-white mt-auto">
                  Start Assessment
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow p-6">
              <CardContent className="flex flex-col">
                <div className="flex justify-center items-center mb-6 h-20">
                  <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
                    <BrandLogo brand="hostsblue" size="md" showIcon={true} />
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">Web Services Platform</p>
                <ul className="text-xs sm:text-sm text-gray-500 space-y-2 mb-6">
                  <li>• High-performance hosting</li>
                  <li>• Domain management</li>
                  <li>• Website Builder</li>
                </ul>
                <Button className="w-full bg-[#660099] hover:bg-[#5a0088] mt-auto">
                  Get Hosting
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow p-6">
              <CardContent className="flex flex-col">
                <div className="flex justify-center items-center mb-6 h-20">
                  <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
                    <BrandLogo brand="swipesblue" size="md" showIcon={true} />
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">Payment Gateway Platform</p>
                <ul className="text-xs sm:text-sm text-gray-500 space-y-2 mb-6">
                  <li>• Secure payment processing</li>
                  <li>• Transaction management</li>
                  <li>• Shopping cart and Checkout</li>
                </ul>
                <Button className="w-full bg-[#FF0040] hover:bg-[#cc0033] mt-auto">
                  Setup Payments
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}