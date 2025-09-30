import { Header } from "@/components/header";
import masterReference from "@assets/BluePrint Master Logos and Icons and Names_1759269072017.png";
import businessblueprintLogo from "@assets/businessblueprint_1759187364583.png";
import webhostedLogo from "@assets/webnhosted_1758744493181.png";
import airswipedLogo from "@assets/airswiped_1758744493180.png";

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
                  src={businessblueprintLogo} 
                  alt="businessblueprint.io light icon" 
                  className="w-24 h-24 object-contain mb-4"
                />
                <div className="text-3xl font-bold mb-2">
                  <span className="text-black">business</span>
                  <span style={{color: '#0080FF'}}>blueprint</span>
                  <span style={{color: '#AAFF00'}}>.io</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Use on: White backgrounds, light colored pages</p>
              <p className="text-xs text-blue-600 mt-2 text-center font-medium">✓ File loaded: businessblueprint_1759187364583.png</p>
            </div>

            {/* Dark Environment */}
            <div className="border-2 border-gray-600 rounded-lg p-6 bg-gray-900">
              <div className="text-sm font-semibold text-gray-300 mb-4 text-center">DARK ENVIRONMENT</div>
              <div className="bg-gray-900 p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <div className="w-24 h-24 border-2 border-dashed border-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-yellow-500 text-xs text-center px-2">Dark logo<br/>needed</span>
                </div>
                <div className="text-3xl font-bold mb-2">
                  <span className="text-white">business</span>
                  <span style={{color: '#0080FF'}}>blueprint</span>
                  <span style={{color: '#AAFF00'}}>.io</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Use on: Dark backgrounds, night mode, dark sections</p>
              <p className="text-xs text-yellow-500 mt-2 text-center font-medium">⚠️ Dark logo file path needed</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Color Pattern:</span> black "business" + blueprint blue (#0080FF) + fluorescent green (#AAFF00) ".io"
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
                  src={webhostedLogo} 
                  alt="webhosted.io light icon" 
                  className="w-24 h-24 object-contain mb-4"
                />
                <div className="text-3xl font-bold mb-2">
                  <span className="text-black">web</span>
                  <span style={{color: '#660099'}}>hosted</span>
                  <span style={{color: '#AAFF00'}}>.io</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Use on: White backgrounds, light colored pages</p>
              <p className="text-xs text-blue-600 mt-2 text-center font-medium">✓ File loaded: webnhosted_1758744493181.png</p>
            </div>

            {/* Dark Environment */}
            <div className="border-2 border-gray-600 rounded-lg p-6 bg-gray-900">
              <div className="text-sm font-semibold text-gray-300 mb-4 text-center">DARK ENVIRONMENT</div>
              <div className="bg-gray-900 p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <div className="w-24 h-24 border-2 border-dashed border-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-yellow-500 text-xs text-center px-2">Dark logo<br/>needed</span>
                </div>
                <div className="text-3xl font-bold mb-2">
                  <span className="text-white">web</span>
                  <span style={{color: '#660099'}}>hosted</span>
                  <span style={{color: '#AAFF00'}}>.io</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Use on: Dark backgrounds, night mode, dark sections</p>
              <p className="text-xs text-yellow-500 mt-2 text-center font-medium">⚠️ Dark logo file path needed</p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Color Pattern:</span> black "web" + webhosted purple (#660099) + fluorescent green (#AAFF00) ".io"
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
                  src={airswipedLogo} 
                  alt="airswiped.com light icon" 
                  className="w-24 h-24 object-contain mb-4"
                />
                <div className="text-3xl font-bold mb-2">
                  <span className="text-black">air</span>
                  <span style={{color: '#CB0505'}}>swiped</span>
                  <span style={{color: '#AAFF00'}}>.com</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">Use on: White backgrounds, light colored pages</p>
              <p className="text-xs text-blue-600 mt-2 text-center font-medium">✓ File loaded: airswiped_1758744493180.png</p>
            </div>

            {/* Dark Environment */}
            <div className="border-2 border-gray-600 rounded-lg p-6 bg-gray-900">
              <div className="text-sm font-semibold text-gray-300 mb-4 text-center">DARK ENVIRONMENT</div>
              <div className="bg-gray-900 p-6 rounded flex flex-col items-center justify-center min-h-[200px]">
                <div className="w-24 h-24 border-2 border-dashed border-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-yellow-500 text-xs text-center px-2">Dark logo<br/>needed</span>
                </div>
                <div className="text-3xl font-bold mb-2">
                  <span className="text-white">air</span>
                  <span style={{color: '#CB0505'}}>swiped</span>
                  <span style={{color: '#AAFF00'}}>.com</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Use on: Dark backgrounds, night mode, dark sections</p>
              <p className="text-xs text-yellow-500 mt-2 text-center font-medium">⚠️ Dark logo file path needed</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Color Pattern:</span> black "air" + airswiped red (#CB0505) + fluorescent green (#AAFF00) ".com"
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
                <p className="font-semibold text-gray-900">Light Environment Icons</p>
                <p className="text-sm text-gray-600">Use the light logo files on white or light backgrounds</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <p className="font-semibold text-gray-900">Dark Environment Icons</p>
                <p className="text-sm text-gray-600">Use the dark logo files on dark or black backgrounds</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <p className="font-semibold text-gray-900">Text Color Pattern</p>
                <p className="text-sm text-gray-600">Light: black prefix + signature color + #AAFF00 | Dark: white prefix + signature color + #AAFF00</p>
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

        {/* Status Notice */}
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">📋 Asset Status</h3>
          
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-yellow-900 mb-2">✓ Light Environment Assets (Loaded):</p>
              <ul className="text-sm text-yellow-800 space-y-1 ml-4">
                <li>• businessblueprint: businessblueprint_1759187364583.png</li>
                <li>• webhosted: webnhosted_1758744493181.png</li>
                <li>• airswiped: airswiped_1758744493180.png</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-yellow-900 mb-2">⚠️ Dark Environment Assets (Needed):</p>
              <p className="text-sm text-yellow-800">
                Please provide the file paths for the dark environment logo versions shown in your master reference sheet. 
                These should be separate files (not CSS-filtered versions) to ensure accurate brand color representation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
