import { Header } from "@/components/header";

export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          businessblueprint.io Logo Concepts
        </h1>
        
        {/* Green Blueprint B Logo */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Green Blueprint "B" Logo</h2>
          <div className="flex justify-center mb-4">
            <img 
              src="/attached_assets/generated_images/Blueprint_green_B_logo_a2a73ac3.png" 
              alt="Green Blueprint B Logo" 
              className="w-48 h-48 object-contain"
            />
          </div>
          <p className="text-gray-600">Classic blueprint green with white line work forming geometric "B"</p>
        </div>
        
        {/* Three Company Logos Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">All Three Company Logos</h2>
          <div className="flex justify-center mb-4">
            <img 
              src="/attached_assets/generated_images/Three_company_logos_comparison_900c2fbb.png" 
              alt="Three Company Logos Comparison" 
              className="max-w-full h-auto"
            />
          </div>
          <p className="text-gray-600">
            <span className="font-medium text-green-600">businessblueprint.io</span> (green) • 
            <span className="font-medium text-purple-600"> webhosted.io</span> (purple) • 
            <span className="font-medium text-red-600"> airswiped.com</span> (red)
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