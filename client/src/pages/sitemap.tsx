import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { 
  Home, 
  BarChart3, 
  CreditCard, 
  Users, 
  Mail, 
  Info,
  LogIn,
  Settings,
  Brain,
  Compass
} from "lucide-react";
import aiCoachLogo from "@assets/AI Coach_1758744493179.png";

export default function Sitemap() {
  const pages = [
    {
      title: "Home",
      path: "/",
      description: "Main landing page with overview of businessblueprint.io services and value proposition",
      icon: Home,
      category: "Main"
    },
    {
      title: "Digital Assessment", 
      path: "/assessment",
      description: "Free AI-powered analysis of your business's online presence and digital score",
      icon: BarChart3,
      category: "Main"
    },
    {
      title: "Subscription Plans",
      path: "/subscription", 
      description: "Choose between DIY and Managed Service plans with pricing and 7-day trials",
      icon: CreditCard,
      category: "Main"
    },
    {
      title: "AI Business Coach",
      path: "/ai-coach",
      description: "AI-powered guidance and coaching for your digital growth and business success",
      icon: () => <img src={aiCoachLogo} alt="AI Coach" className="w-5 h-5" />,
      category: "Features"
    },
    {
      title: "About Us",
      path: "/about",
      description: "Learn about businessblueprint.io mission, values, and approach to digital success",
      icon: Info,
      category: "Company"
    },
    {
      title: "Contact",
      path: "/contact", 
      description: "Get in touch with our team for support, questions, and consultations",
      icon: Mail,
      category: "Company"
    },
    {
      title: "Client Portal",
      path: "/portal",
      description: "Secure portal for existing clients to manage services, view reports, and track progress",
      icon: Users,
      category: "Client Area"
    },
    {
      title: "Client Login",
      path: "/portal/login",
      description: "Secure login page for existing clients to access their dashboard",
      icon: LogIn,
      category: "Client Area"
    },
    {
      title: "Site Map",
      path: "/sitemap",
      description: "Complete navigation guide to all available pages and features (current page)",
      icon: Compass,
      category: "Navigation"
    }
  ];

  const categories = ["Main", "Features", "Company", "Client Area", "Navigation"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Site Map</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigate through all available pages and features on businessblueprint.io. 
            Find exactly what you're looking for with our organized page directory.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages
                .filter((page) => page.category === category)
                .map((page) => {
                  const IconComponent = page.icon;
                  return (
                    <Card key={page.path} className="hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                          {page.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col h-full">
                        <CardDescription className="mb-4 flex-grow">
                          {page.description}
                        </CardDescription>
                        <Link href={page.path}>
                          <Button 
                            variant="outline" 
                            className="w-full hover:bg-blue-50 hover:border-blue-300"
                            data-testid={`link-${page.title.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            Visit Page
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}

        {/* Quick Navigation Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Quick Access
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/assessment">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-quick-assessment">
                <BarChart3 className="w-4 h-4 mr-2" />
                Start Assessment
              </Button>
            </Link>
            <Link href="/subscription">
              <Button variant="outline" className="w-full" data-testid="button-quick-pricing">
                <CreditCard className="w-4 h-4 mr-2" />
                View Pricing
              </Button>
            </Link>
            <Link href="/ai-coach">
              <Button variant="outline" className="w-full" data-testid="button-quick-ai-coach">
                <img src={aiCoachLogo} alt="AI Coach" className="w-4 h-4 mr-2" />
                AI Coach
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="w-full" data-testid="button-quick-contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Help */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Can't find what you're looking for? Visit our{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
              contact page
            </Link>{" "}
            for personalized assistance.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}