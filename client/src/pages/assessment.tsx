import { AssessmentForm } from "@/components/assessment-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function Assessment() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showNavigation={true} />
      <div className="max-w-7xl mx-auto px-4 py-6 w-full">
        <div className="flex justify-end gap-2 mb-4">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 shadow-lg hover:opacity-90 transition-opacity text-white font-bold"
            style={{ backgroundColor: '#A00028' }}
            onClick={() => {
              const event = new CustomEvent('addToCart', { 
                detail: { sku: 'assessment', name: 'Blueprint to Your Growth', price: 0, type: 'addon' }
              });
              window.dispatchEvent(event);
            }}
            data-testid="button-add-to-cart"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <AssessmentForm />
      </div>
      <Footer />
    </div>
  );
}
