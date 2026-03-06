import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PricingLayout } from "@/components/pricing-layout";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12 w-full">
        <h1
          className="text-4xl font-bold text-center mb-12"
          style={{ fontFamily: "Archivo Semi Expanded, Archivo, sans-serif" }}
        >
          Pricing
        </h1>
        <PricingLayout variant="page" />
      </main>
      <Footer />
    </div>
  );
}
