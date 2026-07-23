import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface CoachBlueCTAProps {
  variant?: 'default' | 'compact';
  message?: string;
}

export function CoachBlueCTA({ variant = 'default', message }: CoachBlueCTAProps) {
  if (variant === 'compact') {
    return (
      <Card className="border-2 border-[#0000FF] bg-gradient-to-r from-[#EEFBFF] to-white" data-testid="coach-blue-cta-compact">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#0000FF] rounded-full">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#09080E]">Need help? Ask Coach Blue</p>
                <p className="text-sm text-gray-600">Available 24/7 to answer questions</p>
              </div>
            </div>
            <Link href="/coach-blue">
              <Button 
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
                data-testid="chat-coach-blue-compact"
              >
                Chat Now <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="border-2 border-[#0000FF] bg-white overflow-hidden" 
      data-testid="coach-blue-cta"
    >
      <div className="bg-gradient-to-r from-[#09080E] to-[#0000FF] p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white/10 rounded-full">
            <Sparkles className="w-10 h-10 text-[#FF6B00]" />
          </div>
        </div>
        <h3 
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: 'Archivo, sans-serif' }}
        >
          Need Help Implementing These Recommendations?
        </h3>
        <p className="text-[#EEFBFF] max-w-lg mx-auto">
          {message || "Coach Blue is available 24/7 to guide you through setup, answer questions, and help you achieve Digital Excellence."}
        </p>
      </div>
      <CardContent className="p-6 text-center bg-[#EEFBFF]">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/coach-blue">
            <Button 
              size="lg"
              className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white w-full sm:w-auto"
              data-testid="chat-coach-blue"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Chat with Coach Blue
            </Button>
          </Link>
          <Link href="/products">
            <Button 
              size="lg"
              variant="outline"
              className="border-[#0000FF] text-[#0000FF] hover:bg-[#0000FF] hover:text-white w-full sm:w-auto"
              data-testid="view-all-products"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Available 24/7
          </span>
          <span>•</span>
          <span>Instant Answers</span>
          <span>•</span>
          <span>Product Guidance</span>
        </div>
      </CardContent>
    </Card>
  );
}
