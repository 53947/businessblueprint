import { AICoach } from "@/components/ai-coach";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AICoachPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation={true} />
      <AICoach />
      <Footer />
    </div>
  );
}