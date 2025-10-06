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
  ChevronRight
} from "lucide-react";
import aiCoachLogo from "@assets/AI Coach_1758744493179.png";

export default function Sitemap() {
  const siteStructure = {
    root: {
      title: "businessblueprint.io",
      path: "/",
      description: "Digital Intelligence Platform",
      children: [
        {
          title: "Public Pages",
          children: [
            {
              title: "Home",
              path: "/",
              icon: Home,
              description: "Landing page with value proposition"
            },
            {
              title: "About",
              path: "/about",
              icon: Info,
              description: "Mission and company information"
            },
            {
              title: "Contact",
              path: "/contact",
              icon: Mail,
              description: "Get in touch"
            },
            {
              title: "Site Map",
              path: "/sitemap",
              icon: Compass,
              description: "Visual navigation tree (current page)",
              current: true
            }
          ]
        },
        {
          title: "Core Features",
          children: [
            {
              title: "Digital Assessment",
              path: "/assessment",
              icon: BarChart3,
              description: "Free AI-powered Digital IQ analysis",
              badge: "Free"
            },
            {
              title: "Digital Blueprint",
              path: "/dashboard/:id",
              icon: Map,
              description: "Personalized recommendations dashboard",
              dynamic: true
            },
            {
              title: "AI Business Coach",
              path: "/ai-coach",
              icon: Brain,
              description: "AI guidance for digital growth",
              badge: "$99/mo DIY"
            },
            {
              title: "Journey",
              path: "/journey",
              icon: MapPin,
              description: "5-step journey visualization"
            }
          ]
        },
        {
          title: "Subscription & Billing",
          children: [
            {
              title: "Subscription Plans",
              path: "/subscription",
              icon: CreditCard,
              description: "DIY ($99/mo) & MSP ($299/mo) plans"
            }
          ]
        },
        {
          title: "Client Portal",
          badge: "Secure",
          children: [
            {
              title: "Portal Login",
              path: "/portal/login",
              icon: LogIn,
              description: "Vendasta Account Group ID authentication"
            },
            {
              title: "Client Dashboard",
              path: "/portal",
              icon: Users,
              description: "Listings, reviews, campaigns, tasks",
              requiresAuth: true
            }
          ]
        },
        {
          title: "Admin/Development",
          children: [
            {
              title: "Vendasta Integration",
              path: "/vendasta",
              icon: Settings,
              description: "API connection testing"
            },
            {
              title: "Logo Preview",
              path: "/logo-preview",
              icon: Palette,
              description: "Brand asset preview"
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
                          {node.requiresAuth && (
                            <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                              Requires Auth
                            </Badge>
                          )}
                          {node.dynamic && (
                            <Badge variant="outline" className="text-xs border-purple-300 text-purple-700">
                              Dynamic
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{node.description}</p>
                        <code className="text-xs text-blue-600 mt-1 block">{node.path}</code>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Site Map</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete visual navigation tree of businessblueprint.io platform
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
              <div className="text-3xl font-bold text-blue-600">14</div>
              <div className="text-sm text-gray-600">Total Pages</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-600">4</div>
              <div className="text-sm text-gray-600">Core Features</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">2</div>
              <div className="text-sm text-gray-600">Client Portal</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600">Public Pages</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? Visit our{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline font-medium">
              contact page
            </Link>{" "}
            for assistance.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/assessment">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                Start Free Assessment
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
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
