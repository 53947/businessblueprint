import { AICoach } from "@/components/ai-coach";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function AICoachPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation={true} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-end gap-2 mb-4">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
            style={{ backgroundColor: '#FF6B00' }}
            onClick={() => {
              const event = new CustomEvent('addToCart', { 
                detail: { sku: 'coach-blue', name: 'Coach Blue', price: 25, type: 'addon' }
              });
              window.dispatchEvent(event);
            }}
            data-testid="button-add-to-cart"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <AICoach />
      <Footer />
    </div>
  );
}