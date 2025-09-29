import { Header } from "@/components/header";

export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          businessblueprint.io Logo Concepts
        </h1>
        
        {/* Final businessblueprint.io Logo */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">businessblueprint.io Logo</h2>
          <div className="flex justify-center mb-4">
            <img 
              src="/attached_assets/generated_images/Cleaned_up_compass_pencil_logo_eee3aaf0.png" 
              alt="businessblueprint.io AI Logo" 
              className="w-48 h-48 object-contain"
            />
          </div>
          <p className="text-gray-600">Compass + Pencil = "AI" using actual blueprint tools</p>
        </div>
        
        {/* Three Company Logos Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Your Complete Brand Ecosystem</h2>
          <div className="flex justify-center items-center gap-12 mb-6 flex-wrap">
            <div className="text-center">
              <img 
                src="/attached_assets/generated_images/Cleaned_up_compass_pencil_logo_eee3aaf0.png" 
                alt="businessblueprint.io Logo" 
                className="w-24 h-24 object-contain mx-auto mb-2"
              />
              <p className="text-sm font-medium" style={{color: '#0080FF'}}>businessblueprint.io</p>
              <p className="text-xs text-gray-500">Strategy & Planning</p>
            </div>
            
            <div className="text-center">
              <img 
                src="/attached_assets/webnhosted_1758744493181.png" 
                alt="webhosted.io Logo" 
                className="w-24 h-24 object-contain mx-auto mb-2"
              />
              <p className="text-sm font-medium" style={{color: '#660099'}}>webhosted.io</p>
              <p className="text-xs text-gray-500">Website Hosting</p>
            </div>
            
            <div className="text-center">
              <img 
                src="/attached_assets/airswiped_1758744493180.png" 
                alt="airswiped.com Logo" 
                className="w-24 h-24 object-contain mx-auto mb-2"
              />
              <p className="text-sm font-medium" style={{color: '#CB0505'}}>airswiped.com</p>
              <p className="text-xs text-gray-500">Payment Processing</p>
            </div>
          </div>
          <p className="text-gray-600">
            Your complete digital business ecosystem: 
            <span className="font-medium" style={{color: '#0080FF'}}> Strategy</span> → 
            <span className="font-medium" style={{color: '#660099'}}> Technology</span> → 
            <span className="font-medium" style={{color: '#CB0505'}}> Payments</span>
          </p>
        </div>
        
        {/* Master Color Key Reference */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Master Color Key</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">businessblueprint.io</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded" style={{backgroundColor: '#000000'}}></div>
                  <span className="text-sm">#000000 (black)</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded" style={{backgroundColor: '#0080FF'}}></div>
                  <span className="text-sm">#0080FF (blueprint blue)</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded" style={{backgroundColor: '#AAFF00'}}></div>
                  <span className="text-sm">#AAFF00 (fluorescent green)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">webhosted.io</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded" style={{backgroundColor: '#000000'}}></div>
                  <span className="text-sm">#000000 (black)</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded" style={{backgroundColor: '#660099'}}></div>
                  <span className="text-sm">#660099 (webhosted purple)</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded" style={{backgroundColor: '#AAFF00'}}></div>
                  <span className="text-sm">#AAFF00 (fluorescent green)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">airswiped.com</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded" style={{backgroundColor: '#000000'}}></div>
                  <span className="text-sm">#000000 (black)</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded" style={{backgroundColor: '#CB0505'}}></div>
                  <span className="text-sm">#CB0505 (airswiped red)</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded" style={{backgroundColor: '#AAFF00'}}></div>
                  <span className="text-sm">#AAFF00 (fluorescent green)</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">All companies use: black prefix + signature color + fluorescent green (#AAFF00) TLD</p>
        </div>
      </div>
    </div>
  );
}