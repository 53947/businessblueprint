import { Header } from "@/components/header";
import masterReference from "@assets/BluePrint Master Logos and Icons and Names_1759269072017.png";

// Light environment logos
import bbLightLogo from "@assets/BB Light Version Logo and Icon_1759270239473.png";
import webhostedLightLogo from "@assets/Web Hosted Light Version Logo and Icon_1759270239476.png";
import airswipedLightLogo from "@assets/Air Swiped Light Version Logo and Icon_1759270239472.png";

// Dark environment logos
import bbDarkLogo from "@assets/BB Dark Version Logo and Icon_1759270239473.png";
import webhostedDarkLogo from "@assets/Web Hosted Dark Version Logo and Icon_1759270239474.png";
import airswipedDarkLogo from "@assets/Air Swiped Dark Version Logo and Icon_1759270239472.png";

export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation={true} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Official Brand Assets Reference
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          This page displays all approved logos, icons, and naming conventions. 
          <span className="font-semibold text-red-600"> Only assets shown here may be used without express permission.</span>
        </p>

        {/* Master Reference Image */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Master Reference Sheet</h2>
          <div className="flex justify-center">
            <img 
              src={masterReference} 
              alt="BluePrint Master Logos and Icons Reference" 
              className="max-w-full h-auto rounded-lg border-2 border-gray-200"
            />
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">Official approved assets - Light and Dark environment versions</p>
        </div>

        {/* businessblueprint.io Assets */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">businessblueprint.io</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            {/* Light Environment */}
            <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
              <div className="text-sm font-semibold text-gray-500 mb-4 text-center">LIGHT ENVIRONMENT</div>
              <div className="bg-white p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <img 
                  src={bbLightLogo} 
                  alt="businessblueprint.io light version" 
                  className="max-w-full h-auto object-contain"
                />
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Use on: White backgrounds, light colored pages</p>
              <p className="text-xs text-green-600 mt-2 text-center font-medium">✓ BB Light Version Logo and Icon</p>
            </div>

            {/* Dark Environment */}
            <div className="border-2 border-gray-600 rounded-lg p-6 bg-gray-900">
              <div className="text-sm font-semibold text-gray-300 mb-4 text-center">DARK ENVIRONMENT</div>
              <div className="bg-gray-900 p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <img 
                  src={bbDarkLogo} 
                  alt="businessblueprint.io dark version" 
                  className="max-w-full h-auto object-contain"
                />
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Use on: Dark backgrounds, night mode, dark sections</p>
              <p className="text-xs text-green-400 mt-2 text-center font-medium">✓ BB Dark Version Logo and Icon</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Color Pattern:</span> Light: black "business" + blueprint blue (#0080FF) + fluorescent green (#AAFF00) ".io" | Dark: white "business" + blueprint blue (#0080FF) + fluorescent green (#AAFF00) ".io"
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Icon:</span> Compass + Pencil = "AI" using actual blueprint tools
            </p>
          </div>
        </div>

        {/* webhosted.io Assets */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">webhosted.io</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            {/* Light Environment */}
            <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
              <div className="text-sm font-semibold text-gray-500 mb-4 text-center">LIGHT ENVIRONMENT</div>
              <div className="bg-white p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <img 
                  src={webhostedLightLogo} 
                  alt="webhosted.io light version" 
                  className="max-w-full h-auto object-contain"
                />
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Use on: White backgrounds, light colored pages</p>
              <p className="text-xs text-green-600 mt-2 text-center font-medium">✓ Web Hosted Light Version Logo and Icon</p>
            </div>

            {/* Dark Environment */}
            <div className="border-2 border-gray-600 rounded-lg p-6 bg-gray-900">
              <div className="text-sm font-semibold text-gray-300 mb-4 text-center">DARK ENVIRONMENT</div>
              <div className="bg-gray-900 p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <img 
                  src={webhostedDarkLogo} 
                  alt="webhosted.io dark version" 
                  className="max-w-full h-auto object-contain"
                />
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Use on: Dark backgrounds, night mode, dark sections</p>
              <p className="text-xs text-green-400 mt-2 text-center font-medium">✓ Web Hosted Dark Version Logo and Icon</p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Color Pattern:</span> Light: black "web" + webhosted purple (#660099) + fluorescent green (#AAFF00) ".io" | Dark: white "web" + webhosted purple (#660099) + fluorescent green (#AAFF00) ".io"
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Icon:</span> Globe with purple accents
            </p>
          </div>
        </div>

        {/* airswiped.com Assets */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">airswiped.com</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            {/* Light Environment */}
            <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
              <div className="text-sm font-semibold text-gray-500 mb-4 text-center">LIGHT ENVIRONMENT</div>
              <div className="bg-white p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <img 
                  src={airswipedLightLogo} 
                  alt="airswiped.com light version" 
                  className="max-w-full h-auto object-contain"
                />
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Use on: White backgrounds, light colored pages</p>
              <p className="text-xs text-green-600 mt-2 text-center font-medium">✓ Air Swiped Light Version Logo and Icon</p>
            </div>

            {/* Dark Environment */}
            <div className="border-2 border-gray-600 rounded-lg p-6 bg-gray-900">
              <div className="text-sm font-semibold text-gray-300 mb-4 text-center">DARK ENVIRONMENT</div>
              <div className="bg-gray-900 p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <img 
                  src={airswipedDarkLogo} 
                  alt="airswiped.com dark version" 
                  className="max-w-full h-auto object-contain"
                />
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Use on: Dark backgrounds, night mode, dark sections</p>
              <p className="text-xs text-green-400 mt-2 text-center font-medium">✓ Air Swiped Dark Version Logo and Icon</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Color Pattern:</span> Light: black "air" + airswiped red (#CB0505) + fluorescent green (#AAFF00) ".com" | Dark: white "air" + airswiped red (#CB0505) + fluorescent green (#AAFF00) ".com"
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Icon:</span> Card with red lightning bolt
            </p>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Usage Guidelines</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <p className="font-semibold text-gray-900">Light Environment Assets</p>
                <p className="text-sm text-gray-600">Use the "Light Version" logo files on white or light backgrounds</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <p className="font-semibold text-gray-900">Dark Environment Assets</p>
                <p className="text-sm text-gray-600">Use the "Dark Version" logo files on dark or black backgrounds</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <p className="font-semibold text-gray-900">Color Pattern Consistency</p>
                <p className="text-sm text-gray-600">All platforms maintain signature colors (blue, purple, red) + fluorescent green (#AAFF00) across both environments</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✗</div>
              <div>
                <p className="font-semibold text-gray-900">No Unauthorized Assets</p>
                <p className="text-sm text-gray-600">Do not use any logos, icons, or variations not shown in the master reference sheet above</p>
              </div>
            </div>
          </div>
        </div>

        {/* Approved Assets Summary */}
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">✓ All Approved Assets Loaded</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="font-semibold text-green-900 mb-2">businessblueprint.io</p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✓ Light Version</li>
                <li>✓ Dark Version</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-green-900 mb-2">webhosted.io</p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✓ Light Version</li>
                <li>✓ Dark Version</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-green-900 mb-2">airswiped.com</p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✓ Light Version</li>
                <li>✓ Dark Version</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
