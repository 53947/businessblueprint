import { useEffect } from "react";
import { useLocation } from "wouter";

export default function PortalTestAccess() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Set test client session
    sessionStorage.setItem("clientId", "1");
    sessionStorage.setItem("externalId", "config@vendasta.com");
    
    // Redirect to portal
    setTimeout(() => {
      setLocation("/portal");
    }, 500);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Setting up test access to Client Portal...</p>
      </div>
    </div>
  );
}
