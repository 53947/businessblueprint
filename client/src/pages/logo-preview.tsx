import { Header } from "@/components/header";
import { BrandLogo } from "@/components/brand-logo";

export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation={true} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Official Brand Assets Reference
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          This page displays all approved logos, icons, and naming conventions using the <span className="font-archivo font-semibold">Archivo font</span>.
          <span className="font-semibold text-red-600"> Only assets shown here may be used without express permission.</span>
        </p>

        {/* businessblueprint.io Assets */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">businessblueprint.io</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            {/* Light Environment */}
            <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
              <div className="text-sm font-semibold text-gray-500 mb-4 text-center">LIGHT ENVIRONMENT</div>
              <div className="bg-white p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <BrandLogo brand="businessblueprint" variant="light" size="lg" />
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Use on: White backgrounds, light colored pages</p>
              <p className="text-xs text-blue-600 mt-2 text-center font-medium">✓ Icon + Archivo font text</p>
            </div>

            {/* Dark Environment */}
            <div className="border-2 border-gray-600 rounded-lg p-6 bg-gray-900">
              <div className="text-sm font-semibold text-gray-300 mb-4 text-center">DARK ENVIRONMENT</div>
              <div className="bg-gray-900 p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <BrandLogo brand="businessblueprint" variant="dark" size="lg" />
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Use on: Dark backgrounds, night mode, dark sections</p>
              <p className="text-xs text-blue-400 mt-2 text-center font-medium">✓ Icon + Archivo font text</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Font:</span> Archivo | <span className="font-semibold">Color Pattern:</span> Light: #09080E "business" + blueprint blue (#0080FF) + green (#84D71A) ".io" | Dark: white "business" + blueprint blue (#0080FF) + green (#84D71A) ".io"
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Icon:</span> Compass + Pencil = "AI" using actual blueprint tools
            </p>
          </div>
        </div>

        {/* hostsblue.com Assets */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">hostsblue.com</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            {/* Light Environment */}
            <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
              <div className="text-sm font-semibold text-gray-500 mb-4 text-center">LIGHT ENVIRONMENT</div>
              <div className="bg-white p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <BrandLogo brand="hostsblue" variant="light" size="lg" />
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Use on: White backgrounds, light colored pages</p>
              <p className="text-xs text-blue-600 mt-2 text-center font-medium">✓ Icon + Archivo font text</p>
            </div>

            {/* Dark Environment */}
            <div className="border-2 border-gray-600 rounded-lg p-6 bg-gray-900">
              <div className="text-sm font-semibold text-gray-300 mb-4 text-center">DARK ENVIRONMENT</div>
              <div className="bg-gray-900 p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <BrandLogo brand="hostsblue" variant="dark" size="lg" />
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Use on: Dark backgrounds, night mode, dark sections</p>
              <p className="text-xs text-blue-400 mt-2 text-center font-medium">✓ Icon + Archivo font text</p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Font:</span> Archivo | <span className="font-semibold">Color Pattern:</span> Light: #09080E "web" + webhosted purple (#660099) + green (#84D71A) ".io" | Dark: white "web" + webhosted purple (#660099) + green (#84D71A) ".io"
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Icon:</span> Globe with purple accents
            </p>
          </div>
        </div>

        {/* swipesblue.com Assets */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">swipesblue.com</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            {/* Light Environment */}
            <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
              <div className="text-sm font-semibold text-gray-500 mb-4 text-center">LIGHT ENVIRONMENT</div>
              <div className="bg-white p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <BrandLogo brand="swipesblue" variant="light" size="lg" />
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Use on: White backgrounds, light colored pages</p>
              <p className="text-xs text-blue-600 mt-2 text-center font-medium">✓ Icon + Archivo font text</p>
            </div>

            {/* Dark Environment */}
            <div className="border-2 border-gray-600 rounded-lg p-6 bg-gray-900">
              <div className="text-sm font-semibold text-gray-300 mb-4 text-center">DARK ENVIRONMENT</div>
              <div className="bg-gray-900 p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <BrandLogo brand="swipesblue" variant="dark" size="lg" />
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Use on: Dark backgrounds, night mode, dark sections</p>
              <p className="text-xs text-blue-400 mt-2 text-center font-medium">✓ Icon + Archivo font text</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Font:</span> Archivo | <span className="font-semibold">Color Pattern:</span> Light: #09080E "air" + airswiped red (#FF0040) + green (#84D71A) ".com" | Dark: white "air" + airswiped red (#FF0040) + green (#84D71A) ".com"
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
                <p className="font-semibold text-gray-900">Archivo Font Required</p>
                <p className="text-sm text-gray-600">All brand text must use the Archivo font family (font-archivo in Tailwind)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <p className="font-semibold text-gray-900">Light Environment</p>
                <p className="text-sm text-gray-600">Use black prefix text with brand icons on white or light backgrounds</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <p className="font-semibold text-gray-900">Dark Environment</p>
                <p className="text-sm text-gray-600">Use white prefix text with inverted brand icons on dark backgrounds</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <p className="font-semibold text-gray-900">Signature Colors</p>
                <p className="text-sm text-gray-600">Maintain signature colors (blue #0080FF, purple #660099, red #FF0040) + green (#84D71A) across all environments</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✗</div>
              <div>
                <p className="font-semibold text-gray-900">No Font Substitution</p>
                <p className="text-sm text-gray-600">Never use a different font family for brand names - Archivo is mandatory</p>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Example */}
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">✓ Using the BrandLogo Component</h3>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <code className="text-sm text-gray-800 font-mono block whitespace-pre">
{`import { BrandLogo } from "@/components/brand-logo";

// Light version with icon
<BrandLogo brand="businessblueprint" variant="light" size="lg" />

// Dark version with icon  
<BrandLogo brand="hostsblue" variant="dark" size="md" />

// Small version
<BrandLogo brand="swipesblue" variant="light" size="sm" />`}
            </code>
          </div>

          <p className="text-sm text-green-800">
            The BrandLogo component automatically handles Archivo font styling, color patterns, and icon display for all three brands.
          </p>
        </div>
      </div>
    </div>
  );
}
