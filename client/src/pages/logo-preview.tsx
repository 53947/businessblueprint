import { Header } from "@/components/header";

export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          businessblueprint.io Logo Concepts
        </h1>
        
        {/* Original User Concept */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Your Original "AI" Concept</h2>
          <div className="flex justify-center mb-4">
            <img 
              src="/attached_assets/businessblueprint_1759093924503.png" 
              alt="Original businessblueprint.io AI Logo" 
              className="w-48 h-48 object-contain"
            />
          </div>
          <p className="text-gray-600">Compass + Pencil = "AI" using blueprint tools - brilliant concept!</p>
        </div>
        
        {/* Refined Version */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Refined "AI" Logo</h2>
          <div className="flex justify-center mb-4">
            <img 
              src="/attached_assets/generated_images/Refined_businessblueprint_AI_logo_cd9ced09.png" 
              alt="Refined businessblueprint.io AI Logo" 
              className="w-48 h-48 object-contain"
            />
          </div>
          <p className="text-gray-600">Cleaner geometric version - maintains AI concept with blueprint styling</p>
        </div>
        
        {/* Three Company Logos Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Your Complete Brand Ecosystem</h2>
          <div className="flex justify-center items-center gap-12 mb-6 flex-wrap">
            <div className="text-center">
              <img 
                src="/attached_assets/generated_images/Refined_businessblueprint_AI_logo_cd9ced09.png" 
                alt="businessblueprint.io Logo" 
                className="w-24 h-24 object-contain mx-auto mb-2"
              />
              <p className="text-sm font-medium text-green-600">businessblueprint.io</p>
              <p className="text-xs text-gray-500">Strategy & Planning</p>
            </div>
            
            <div className="text-center">
              <img 
                src="/attached_assets/webnhosted_1758744493181.png" 
                alt="webhosted.io Logo" 
                className="w-24 h-24 object-contain mx-auto mb-2"
              />
              <p className="text-sm font-medium text-purple-600">webhosted.io</p>
              <p className="text-xs text-gray-500">Website Hosting</p>
            </div>
            
            <div className="text-center">
              <img 
                src="/attached_assets/airswiped_1758744493180.png" 
                alt="airswiped.com Logo" 
                className="w-24 h-24 object-contain mx-auto mb-2"
              />
              <p className="text-sm font-medium text-red-600">airswiped.com</p>
              <p className="text-xs text-gray-500">Payment Processing</p>
            </div>
          </div>
          <p className="text-gray-600">
            Your complete digital business ecosystem: 
            <span className="font-medium text-green-600"> Strategy</span> → 
            <span className="font-medium text-purple-600"> Technology</span> → 
            <span className="font-medium text-red-600"> Payments</span>
          </p>
        </div>
        
        {/* Blue Version for Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Previous Blue Version (for comparison)</h2>
          <div className="flex justify-center mb-4">
            <img 
              src="/attached_assets/generated_images/Geometric_blueprint-style_B_logo_51384c54.png" 
              alt="Blue Blueprint B Logo" 
              className="w-48 h-48 object-contain"
            />
          </div>
          <p className="text-gray-600">Original blue version - compare with green above</p>
        </div>
      </div>
    </div>
  );
}