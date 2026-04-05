import { useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { 
  Brain, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  BarChart3,
  MessageSquare,
  Clock,
  Users,
  Mail,
  Share2,
  Building2,
  Star,
  Globe,
  Smartphone,
  HelpCircle
} from 'lucide-react';

const DIGITAL_IQ_AREAS = [
  { number: 1, title: 'Website & SEO Fundamentals', points: 20, desc: 'Is your website fast, secure, and mobile-friendly? Can people find you on Google?' },
  { number: 2, title: 'Business Listings & Citations', points: 18, desc: 'Are you listed on Google, Yelp, and other directories? Is your information consistent everywhere?' },
  { number: 3, title: 'Google Business Profile', points: 16, desc: 'Is your profile complete and optimized? Do you post updates and photos regularly?' },
  { number: 4, title: 'Reputation Management', points: 16, desc: 'Do you respond to reviews? Are you actively managing your online reputation?' },
  { number: 5, title: 'Review Quality & Quantity', points: 15, desc: 'How many reviews do you have? What\'s your average rating?' },
  { number: 6, title: 'Customer Response & Timing', points: 15, desc: 'How quickly do you respond to inquiries? Do you have systems to capture every lead?' },
  { number: 7, title: 'Email & SMS Marketing', points: 15, desc: 'Do you have a customer email list? Do you send regular campaigns?' },
  { number: 8, title: 'Social Media Content', points: 13, desc: 'Are you active on social media? Do you post regularly?' },
  { number: 9, title: 'CRM & Organization', points: 12, desc: 'Do you track customer relationships? Are you organized and systematic?' },
];

const SCORE_RANGES = [
  { range: '130-140', label: 'Exceptional', color: 'bg-green-600' },
  { range: '120-129', label: 'Excellent', color: 'bg-green-500' },
  { range: '110-119', label: 'Strong', color: 'bg-blue-500' },
  { range: '100-109', label: 'Good', color: 'bg-blue-500' },
  { range: '90-99', label: 'Average', color: 'bg-orange-400' },
  { range: '80-89', label: 'Below Average', color: 'bg-orange-500' },
  { range: '70-79', label: 'Needs Work', color: 'bg-red-500' },
];

const FAQ_ITEMS = [
  { q: 'How long does the assessment take?', a: 'About 10 minutes to complete the form. Results delivered in 2-3 minutes.' },
  { q: 'Do I need to know anything technical?', a: 'Nope! We explain everything in plain English.' },
  { q: 'Can I retake the assessment?', a: 'Yes! We recommend reassessing every 3-6 months to track progress.' },
  { q: 'Is Coach Blue a real person?', a: 'Coach Blue is an AI powered by advanced language models, trained specifically on digital marketing for local businesses. Think of it as having an expert consultant available 24/7.' },
  { q: 'What if I disagree with a recommendation?', a: 'Every recommendation includes the "why" behind it. You can also ask Coach Blue to explain further or suggest alternatives.' },
  { q: 'Can I implement this myself or do I need to hire you?', a: 'Both! You can follow the DIY path and do everything yourself with Coach Blue\'s guidance, or choose our Managed Services if you want us to handle it.' },
  { q: 'How much does this cost?', a: 'The assessment and prescription are free. Implementation costs vary based on whether you DIY or choose Managed Services.' },
  { q: 'What if I get stuck?', a: 'Coach Blue is always available to help. You can also reach our support team at support@businessblueprint.io' },
];

export default function KnowledgeBase() {
  useEffect(() => {
    document.title = 'How businessblueprint.io Works | Knowledge Base';
    
    const description = 'Learn how businessblueprint.io\'s Digital IQ Assessment measures your online presence across 9 areas and creates custom prescriptions to grow your business.';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    const setMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMetaTag('og:title', 'How businessblueprint.io Works');
    setMetaTag('og:description', description);
    setMetaTag('og:type', 'website');
    setMetaTag('og:url', window.location.href);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEFBFF] to-white">
      <Header />

      <section className="py-16" data-testid="section-hero">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0000FF] mb-4" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }} data-testid="text-title">
            How businessblueprint.io Works
          </h1>
          <p className="text-xl text-gray-700 mb-8" data-testid="text-subtitle">
            Your guide to understanding our Digital Intelligence Platform
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl pb-16">
        
        <Card className="mb-12 border-2 border-[#97ACCA]" data-testid="card-toc">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-[#0000FF] mb-4" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
              Quick Navigation
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              <a href="#what-we-do" className="text-[#0000FF] hover:text-[#FF6B00] underline" data-testid="link-toc-what-we-do">
                → What We Do
              </a>
              <a href="#digital-iq" className="text-[#0000FF] hover:text-[#FF6B00] underline" data-testid="link-toc-digital-iq">
                → Your Digital IQ Score
              </a>
              <a href="#understanding-score" className="text-[#0000FF] hover:text-[#FF6B00] underline" data-testid="link-toc-understanding">
                → Understanding Your Score
              </a>
              <a href="#prescription" className="text-[#0000FF] hover:text-[#FF6B00] underline" data-testid="link-toc-prescription">
                → Your Custom Prescription
              </a>
              <a href="#coach-blue" className="text-[#0000FF] hover:text-[#FF6B00] underline" data-testid="link-toc-coach-blue">
                → Meet Coach Blue
              </a>
              <a href="#how-it-works" className="text-[#0000FF] hover:text-[#FF6B00] underline" data-testid="link-toc-how-it-works">
                → How The Process Works
              </a>
              <a href="#why-it-works" className="text-[#0000FF] hover:text-[#FF6B00] underline" data-testid="link-toc-why-it-works">
                → Why This Approach Works
              </a>
              <a href="#faq" className="text-[#0000FF] hover:text-[#FF6B00] underline" data-testid="link-toc-faq">
                → Frequently Asked Questions
              </a>
            </div>
          </CardContent>
        </Card>

        <section id="what-we-do" className="mb-16 scroll-mt-24" data-testid="section-what-we-do">
          <h2 className="text-3xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
            What We Do
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            businessblueprint.io helps local businesses improve their online presence and grow revenue through:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-[#0000FF] hover:shadow-lg transition-shadow" data-testid="card-service-assessment">
              <CardContent className="pt-6">
                <BarChart3 className="w-12 h-12 text-[#0000FF] mb-4" />
                <h3 className="text-xl font-bold text-[#0000FF] mb-2">Digital IQ Assessment</h3>
                <p className="text-gray-600">
                  We measure your online presence across 9 critical areas
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#FF6B00] hover:shadow-lg transition-shadow" data-testid="card-service-prescription">
              <CardContent className="pt-6">
                <Target className="w-12 h-12 text-[#FF6B00] mb-4" />
                <h3 className="text-xl font-bold text-[#0000FF] mb-2">Custom Prescription</h3>
                <p className="text-gray-600">
                  You get a personalized growth plan based on your results
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#8000FF] hover:shadow-lg transition-shadow" data-testid="card-service-coach">
              <CardContent className="pt-6">
                <MessageSquare className="w-12 h-12 text-[#8000FF] mb-4" />
                <h3 className="text-xl font-bold text-[#0000FF] mb-2">Coach Blue</h3>
                <p className="text-gray-600">
                  Our AI business coach guides you through implementation
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#EEFBFF] border-2 border-[#97ACCA]">
            <CardContent className="pt-6">
              <p className="text-lg font-semibold text-[#0000FF]">
                <CheckCircle2 className="inline w-6 h-6 mr-2 text-green-500" />
                Our Promise: We deliver prescriptions that are concise, timely, and accurate.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="digital-iq" className="mb-16 scroll-mt-24" data-testid="section-digital-iq">
          <h2 className="text-3xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
            Your Digital IQ Score
          </h2>

          <Card className="mb-6 border-2 border-[#0000FF]">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold text-[#0000FF] mb-4">What Is It?</h3>
              <p className="text-lg text-gray-700">
                Your Digital IQ Score measures how effectively your business shows up online and converts visitors into customers.
              </p>
            </CardContent>
          </Card>

          <h3 className="text-2xl font-bold text-[#0000FF] mb-4">The 9 Areas We Measure</h3>
          
          <div className="space-y-4">
            {DIGITAL_IQ_AREAS.map((area) => (
              <Card key={area.number} className="border-l-4 border-[#FF6B00]" data-testid={`card-area-${area.number}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0000FF] text-white flex items-center justify-center font-bold">
                      {area.number}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#0000FF] mb-1">
                        {area.title} <span className="text-[#FF6B00]">({area.points} points)</span>
                      </h4>
                      <p className="text-gray-600">{area.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="understanding-score" className="mb-16 scroll-mt-24" data-testid="section-understanding-score">
          <h2 className="text-3xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
            Understanding Your Score
          </h2>

          <div className="grid grid-cols-3 md:grid-cols-7 gap-2 md:gap-4">
            {SCORE_RANGES.map((item) => (
              <Card key={item.range} className="text-center" data-testid={`card-score-${item.range}`}>
                <CardContent className="p-3 md:pt-6">
                  <div className={`inline-block px-3 py-1 md:px-4 md:py-2 rounded-full text-white font-bold text-sm md:text-lg mb-1 md:mb-2 ${item.color}`}>
                    {item.range}
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-[#0000FF]">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="prescription" className="mb-16 scroll-mt-24" data-testid="section-prescription">
          <h2 className="text-3xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
            Your Custom Prescription
          </h2>

          <Card className="mb-6 border-2 border-[#FF6B00]">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold text-[#0000FF] mb-4">What You Get</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Your Digital IQ Score</strong> across all 9 areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Top Priority Recommendations</strong> ranked by impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Three-Phase Implementation Plan</strong> so you're not overwhelmed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Specific Action Steps</strong> you can start immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Ongoing Coach Blue Support</strong> to guide you</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <h3 className="text-2xl font-bold text-[#0000FF] mb-4">The Three Phases</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-t-4 border-t-[#0000FF]" data-testid="card-phase-1">
              <CardContent className="pt-6">
                <div className="text-sm font-bold text-[#FF6B00] mb-2">PHASE 1</div>
                <h4 className="text-xl font-bold text-[#0000FF] mb-2">Foundation</h4>
                <p className="text-sm text-gray-500 mb-3">Month 1</p>
                <ul className="text-gray-600 space-y-2">
                  <li>Fix critical gaps preventing customers from finding you</li>
                  <li>Establish your digital presence</li>
                  <li>Get quick wins</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#FF6B00]" data-testid="card-phase-2">
              <CardContent className="pt-6">
                <div className="text-sm font-bold text-[#FF6B00] mb-2">PHASE 2</div>
                <h4 className="text-xl font-bold text-[#0000FF] mb-2">Engagement</h4>
                <p className="text-sm text-gray-500 mb-3">Months 2-3</p>
                <ul className="text-gray-600 space-y-2">
                  <li>Build trust with your audience</li>
                  <li>Capture and convert more leads</li>
                  <li>Improve customer experience</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-500" data-testid="card-phase-3">
              <CardContent className="pt-6">
                <div className="text-sm font-bold text-[#FF6B00] mb-2">PHASE 3</div>
                <h4 className="text-xl font-bold text-[#0000FF] mb-2">Growth</h4>
                <p className="text-sm text-gray-500 mb-3">Months 4-6</p>
                <ul className="text-gray-600 space-y-2">
                  <li>Automate and systematize</li>
                  <li>Scale what's working</li>
                  <li>Optimize for maximum results</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-[#EEFBFF] border-2 border-[#97ACCA]">
            <CardContent className="pt-6">
              <p className="text-gray-700">
                <strong className="text-[#0000FF]">Important:</strong> Your phases are customized based on whether you're a new or established business and whether you need cash fast or proper setup.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="coach-blue" className="mb-16 scroll-mt-24" data-testid="section-coach-blue">
          <h2 className="text-3xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
            Meet Coach Blue
          </h2>

          <Card className="mb-6 border-2 border-[#8000FF]">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold text-[#0000FF] mb-4">Your AI Business Coach</h3>
              <p className="text-lg text-gray-700 mb-4">
                Coach Blue is powered by advanced AI and has deep expertise across all 9 areas we measure. Think of Coach Blue as your always-available business consultant who:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <Brain className="w-5 h-5 text-[#8000FF] mt-0.5 flex-shrink-0" />
                  <span><strong>Knows your specific situation</strong> (your Digital IQ, your challenges)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-[#8000FF] mt-0.5 flex-shrink-0" />
                  <span><strong>Gives actionable advice</strong> (not generic tips)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#8000FF] mt-0.5 flex-shrink-0" />
                  <span><strong>Breaks things down</strong> into simple steps</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-[#8000FF] mt-0.5 flex-shrink-0" />
                  <span><strong>Celebrates your progress</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-[#8000FF] mt-0.5 flex-shrink-0" />
                  <span><strong>Adjusts to your timeline</strong> and constraints</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <h3 className="text-2xl font-bold text-[#0000FF] mb-4">What Coach Blue Can Help With</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Implementing your prescription recommendations',
              'Answering questions about digital marketing',
              'Troubleshooting issues as they come up',
              'Explaining why certain strategies work',
              'Keeping you motivated and on track',
              'Adapting your plan as your business grows',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="mb-16 scroll-mt-24" data-testid="section-how-it-works">
          <h2 className="text-3xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
            How The Process Works
          </h2>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-[#0000FF]" data-testid="card-step-1">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0000FF] text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0000FF] mb-2">Take The Assessment (10 minutes)</h3>
                    <p className="text-gray-600 mb-3">You'll answer questions about your basic business information, current online presence, marketing activities, and systems. We'll also scan your website, Google Business Profile, reviews, social media, and directory listings.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#FF6B00]" data-testid="card-step-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0000FF] mb-2">Get Your Results (2-3 minutes)</h3>
                    <p className="text-gray-600 mb-3">You'll receive your Digital IQ Score via email, a welcome from Coach Blue, and access to your full prescription in our portal.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#8000FF]" data-testid="card-step-3">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#8000FF] text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0000FF] mb-2">Review Your Prescription</h3>
                    <p className="text-gray-600 mb-3">Your prescription shows where you're strong, where you have opportunities (prioritized by impact), specific actions to take in each phase, and expected results from each improvement.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500" data-testid="card-step-4">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0000FF] mb-2">Start Implementing</h3>
                    <p className="text-gray-600 mb-3">Choose the DIY path (follow your prescription with Coach Blue's guidance) or the Managed Services path (we implement everything for you with professional execution).</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#0000FF]" data-testid="card-step-5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0000FF] text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0000FF] mb-2">Track Progress</h3>
                    <p className="text-gray-600 mb-3">Update your implementation progress in the portal, see how your Digital IQ improves over time, get new recommendations as you grow, and adjust your plan based on results.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="why-it-works" className="mb-16 scroll-mt-24" data-testid="section-why-it-works">
          <h2 className="text-3xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
            Why This Approach Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-[#0000FF]" data-testid="card-why-data">
              <CardContent className="pt-6">
                <BarChart3 className="w-10 h-10 text-[#0000FF] mb-4" />
                <h3 className="text-xl font-bold text-[#0000FF] mb-2">Data-Driven, Not Guesswork</h3>
                <p className="text-gray-600">Your prescription is based on real data from your business, industry benchmarks, proven strategies, and your specific situation.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#FF6B00]" data-testid="card-why-phased">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 text-[#FF6B00] mb-4" />
                <h3 className="text-xl font-bold text-[#0000FF] mb-2">Phased Implementation</h3>
                <p className="text-gray-600">We don't overwhelm you with 50 things to do. Foundation first, engagement second, growth third.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#8000FF]" data-testid="card-why-personalized">
              <CardContent className="pt-6">
                <Users className="w-10 h-10 text-[#8000FF] mb-4" />
                <h3 className="text-xl font-bold text-[#0000FF] mb-2">Personalized to You</h3>
                <p className="text-gray-600">A new coffee shop has different needs than an established law firm. We customize based on your stage and priorities.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="perfect-prescriptions" className="mb-16 scroll-mt-24" data-testid="section-perfect-prescriptions">
          <h2 className="text-3xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
            What Makes Our Prescriptions "Perfect"
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#EEFBFF] border-2 border-[#0000FF]" data-testid="card-perfect-concise">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0000FF] text-white flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0000FF] mb-2">Concise</h3>
                <p className="text-gray-600">Clear, actionable recommendations. No fluff or overwhelming details. Specific steps you can act on today.</p>
              </CardContent>
            </Card>

            <Card className="bg-[#EEFBFF] border-2 border-[#FF6B00]" data-testid="card-perfect-timely">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FF6B00] text-white flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0000FF] mb-2">Timely</h3>
                <p className="text-gray-600">Delivered within minutes of your assessment. Prioritized based on what matters NOW. Appropriate to your timeline.</p>
              </CardContent>
            </Card>

            <Card className="bg-[#EEFBFF] border-2 border-[#8000FF]" data-testid="card-perfect-accurate">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#8000FF] text-white flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0000FF] mb-2">Accurate</h3>
                <p className="text-gray-600">Based on your actual assessment data. Aligned with your business stage and goals. Backed by industry research.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="faq" className="mb-16 scroll-mt-24" data-testid="section-faq">
          <h2 className="text-3xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <Card key={i} className="border-l-4 border-l-[#97ACCA]" data-testid={`card-faq-${i}`}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-[#0000FF] mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-[#FF6B00] mt-0.5 flex-shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 ml-7">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16" data-testid="section-cta">
          <Card className="bg-gradient-to-r from-[#0000FF] to-[#3B82F6] text-white border-0">
            <CardContent className="pt-8 pb-8 text-center">
              <Brain className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Archivo Semi Expanded, sans-serif' }}>
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-6">
                Take your free Digital IQ Assessment and get your custom prescription in minutes.
              </p>
              <Link href="/assessment">
                <Button size="lg" className="bg-[#FF6B00] hover:bg-[#ea580c] text-white text-lg px-8 py-6" data-testid="button-cta-assessment">
                  Take Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <div className="text-center mt-8 text-gray-500 text-sm">
          <p><strong className="text-[#0000FF]">businessblueprint.io</strong> - We Assess. We Prescribe. You Grow.</p>
          <p className="mt-1">Last Updated: January 2026</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
