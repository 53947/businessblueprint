import { AssessmentForm } from "@/components/assessment-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Assessment() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showNavigation={false} />
      <div className="flex-1">
        <AssessmentForm />
      </div>
      <Footer />
    </div>
  );
}
