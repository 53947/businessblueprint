import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Compass,
  Map,
  MapPin,
  Palette,
  ChevronRight,
  MessageSquare,
  ShoppingCart,
  Building2
} from "lucide-react";
import aiCoachLogo from "@assets/AI Business Coach Blue_1760813312010.png";

export default function Sitemap() {
  const siteStructure = {
    root: {
      title: "businessblueprint.io",
      path: "/",
      description: "Your Digital Intelligence Partner",
      children: [
        {
          title: "Get Started",
          children: [
            {
              title: "Home",
              path: "/",
              icon: Home,
              description: "Discover how we help local businesses succeed online"
            },
            {
              title: "About Us",
              path: "/about",
              icon: Info,
              description: "Learn about our mission to empower local businesses"
            },
            {
              title: "Contact",
              path: "/contact",
              icon: Mail,
              description: "Questions? We're here to help"
            },
            {
              title: "Site Map",
              path: "/sitemap",
              icon: Compass,
              description: "Navigate our complete platform (you are here)",
              current: true
            }
          ]
        },
        {
          title: "Your Journey to Success",
          badge: "Free to Start",
          children: [
            {
              title: "Digital IQ Assessment",
              path: "/assessment",
              icon: BarChart3,
              description: "See how your business performs online - get your personalized score",
              badge: "Free"
            },
            {
              title: "Your Custom Blueprint",
              path: "/dashboard/:id",
              icon: Map,
              description: "Get your personalized roadmap to digital success",
              dynamic: true
            },
            {
              title: "Coach Blue",
              path: "/ai-coach",
              icon: Brain,
              description: "24/7 expert guidance tailored to your business goals",
              badge: "Premium"
            },
            {
              title: "Success Pathway",
              path: "/journey",
              icon: MapPin,
              description: "Follow our proven 5-step process to grow your business"
            }
          ]
        },
        {
          title: "Choose Your Plan",
          badge: "Flexible Options",
          children: [
            {
              title: "View All Plans",
              path: "/subscription",
              icon: CreditCard,
              description: "Choose between Do It Yourself or Managed Services - we handle the rest"
            },
            {
              title: "Recommended Bundle",
              path: "/assessment-checkout",
              icon: BarChart3,
              description: "Get AI-recommended solutions based on your assessment results"
            },
            {
              title: "Browse Apps & Tools",
              path: "/apps-marketplace",
              icon: ShoppingCart,
              description: "Pick exactly what you need from our marketplace",
              badge: "Coming Soon"
            }
          ]
        },
        {
          title: "Business Tools Included",
          badge: "All Plans",
          children: [
            {
              title: "Email & SMS Campaigns",
              path: "/send",
              icon: Mail,
              description: "Reach your customers directly with professional marketing tools"
            },
            {
              title: "Unified Inbox",
              path: "/inbox",
              icon: MessageSquare,
              description: "Manage all customer messages in one place - email, chat, social media",
              badge: "New"
            },
            {
              title: "Live Chat for Your Website",
              path: "/livechat-demo",
              icon: Users,
              description: "Connect with website visitors instantly and convert more customers"
            }
          ]
        },
        {
          title: "Your Business Dashboard",
          badge: "Members Only",
          children: [
            {
              title: "Sign In",
              path: "/portal/login",
              icon: LogIn,
              description: "Access your business command center"
            },
            {
              title: "Dashboard",
              path: "/portal",
              icon: Building2,
              description: "Manage listings, reviews, campaigns, and track your growth",
              requiresAuth: true
            }
          ]
        }
      ]
    }
  };

  const TreeNode = ({ node, level = 0, isLast = false, parentConnector = "" }: any) => {
    const hasChildren = node.children && node.children.length > 0;
    const isLeaf = !hasChildren;
    const IconComponent = node.icon || ChevronRight;
    
    return (
      <div className="relative">
        {/* Current node */}
        {node.path && (
          <div className={`flex items-start gap-3 mb-2 ${level > 0 ? 'ml-8' : ''}`}>
            {level > 0 && (
              <div className="flex items-center">
                <div className={`w-6 h-px ${isLast ? 'bg-blue-300' : 'bg-blue-300'}`}></div>
              </div>
            )}
            <Link href={node.dynamic ? node.path.replace(':id', '1') : node.path}>
              <Card className={`flex-1 hover:shadow-md transition-all cursor-pointer border-l-4 ${
                node.current ? 'border-l-blue-600 bg-blue-50' : 'border-l-gray-300 hover:border-l-blue-400'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <IconComponent className={`w-5 h-5 mt-0.5 ${node.current ? 'text-blue-600' : 'text-gray-600'}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${node.current ? 'text-blue-900' : 'text-gray-900'}`}>
                            {node.title}
                          </h3>
                          {node.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {node.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{node.description}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}

        {/* Section header (no path) */}
        {!node.path && node.title && (
          <div className={`mb-3 ${level > 0 ? 'ml-8' : ''}`}>
            <div className="flex items-center gap-2">
              {level > 0 && (
                <div className={`w-6 h-px ${isLast ? 'bg-blue-300' : 'bg-blue-300'}`}></div>
              )}
              <h2 className={`font-bold ${level === 0 ? 'text-2xl text-gray-900' : 'text-lg text-gray-700'} flex items-center gap-2`}>
                {node.title}
                {node.badge && (
                  <Badge variant="secondary">{node.badge}</Badge>
                )}
              </h2>
            </div>
            {node.description && (
              <p className="text-sm text-gray-500 mt-1 ml-8">{node.description}</p>
            )}
          </div>
        )}

        {/* Vertical connector line for children */}
        {hasChildren && level > 0 && (
          <div className={`absolute left-3 top-16 bottom-0 w-px ${isLast ? 'bg-transparent' : 'bg-blue-300'}`}></div>
        )}

        {/* Children */}
        {hasChildren && (
          <div className={`space-y-4 ${level === 0 ? 'mt-6' : 'mt-2'}`}>
            {node.children.map((child: any, index: number) => (
              <TreeNode
                key={index}
                node={child}
                level={level + 1}
                isLast={index === node.children.length - 1}
                parentConnector={parentConnector}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header showNavigation={true} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Compass className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Platform</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to build, grow, and manage your digital presence - all in one place
          </p>
        </div>

        {/* Visual Tree */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-8">
            <TreeNode node={siteStructure.root} level={0} />
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-600">Success Steps</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Flexible Plans</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Business Tools</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Digital Growth</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Ready to get started? Take our free assessment or{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline font-medium">
              talk to our team
            </Link>
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/assessment">
              <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-start-assessment">
                <BarChart3 className="w-4 h-4 mr-2" />
                Get Your Free Digital IQ Score
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" data-testid="button-return-home">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
