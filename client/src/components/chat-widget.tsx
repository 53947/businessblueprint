import { useState, useEffect, useCallback } from "react";
import { MessageCircle, X, Headphones } from "lucide-react";
import { useLocation } from "wouter";
import coachBlueIcon24 from "@assets/images_logos/coachblue24.png";
import coachBlueIcon48 from "@assets/images_logos/coachblue48.png";
import { EngageChatContent } from "@/components/engage-widget";
import { CoachBlueChat } from "@/components/ai-coach";

type TabId = "support" | "coach-blue";

interface ChatWidgetProps {
  clientId?: number;
  companyName?: string;
  primaryColor?: string;
  enabledFeatures?: string;
}

export function ChatWidget({ clientId, companyName = "businessblueprint.io", primaryColor = "#F97316", enabledFeatures }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(() => {
    return sessionStorage.getItem("chatWidgetOpen") === "true";
  });
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    return (sessionStorage.getItem("chatWidgetTab") as TabId) || "support";
  });
  const [supportUnread, setSupportUnread] = useState(0);
  const [, setLocation] = useLocation();

  // Persist widget state in sessionStorage
  useEffect(() => {
    sessionStorage.setItem("chatWidgetOpen", isOpen ? "true" : "false");
  }, [isOpen]);

  useEffect(() => {
    sessionStorage.setItem("chatWidgetTab", activeTab);
  }, [activeTab]);

  // Clear support unread when switching to support tab
  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    if (tab === "support") {
      setSupportUnread(0);
    }
  }, []);

  // Listen for sidebar Coach Blue click
  useEffect(() => {
    const handleOpenCoachBlue = () => {
      setIsOpen(true);
      setActiveTab("coach-blue");
    };
    window.addEventListener("openCoachBlue", handleOpenCoachBlue);
    return () => window.removeEventListener("openCoachBlue", handleOpenCoachBlue);
  }, []);

  // Auth check — is user logged into client portal?
  const isLoggedIn = !!(sessionStorage.getItem("clientId") && sessionStorage.getItem("authToken"));

  // Subscription check — Coach Blue feature code is "AC"
  const enabledSet = new Set(
    enabledFeatures ? enabledFeatures.split(",").map((f) => f.trim()) : []
  );
  const hasFeatureGating = enabledFeatures !== undefined && enabledFeatures !== "";
  const hasCoachBlue = isLoggedIn && (!hasFeatureGating || enabledSet.has("AC"));

  // Track support unread from EngageChatContent
  const handleSupportUnread = useCallback((count: number) => {
    if (activeTab !== "support") {
      setSupportUnread(count);
    }
  }, [activeTab]);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          style={{ backgroundColor: primaryColor }}
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          {supportUnread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {supportUnread > 9 ? "9+" : supportUnread}
            </span>
          )}
        </button>
      )}

      {/* Widget Container */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div className="fixed inset-0 bg-black/30 z-50 md:hidden" onClick={() => setIsOpen(false)} />

          <div
            className={
              // Desktop: fixed bottom-right card | Mobile: full-screen overlay
              "fixed z-50 flex flex-col bg-white shadow-xl " +
              "md:bottom-6 md:right-6 md:w-[380px] md:h-[520px] md:rounded-xl md:border md:border-gray-200 " +
              "inset-0 md:inset-auto"
            }
          >
            {/* Tab Bar */}
            <div className="flex items-center border-b bg-gray-50 md:rounded-t-xl shrink-0">
              {/* Support tab */}
              <button
                onClick={() => handleTabChange("support")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === "support"
                    ? "text-gray-900 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                role="tab"
                aria-selected={activeTab === "support"}
              >
                <Headphones className="w-4 h-4" />
                <span>Support</span>
                {supportUnread > 0 && activeTab !== "support" && (
                  <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-4" />
                )}
              </button>

              {/* Coach Blue tab */}
              <button
                onClick={() => handleTabChange("coach-blue")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "coach-blue"
                    ? "text-gray-900 border-b-2 border-blue-600"
                    : hasCoachBlue
                      ? "text-gray-500 hover:text-gray-700"
                      : "text-gray-400"
                }`}
                role="tab"
                aria-selected={activeTab === "coach-blue"}
              >
                <img src={coachBlueIcon24} alt="Coach Blue" className="w-4 h-4 object-contain" />
                <span>Coach Blue</span>
              </button>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 mr-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {activeTab === "support" && (
                <EngageChatContent
                  clientId={clientId}
                  companyName={companyName}
                  primaryColor={primaryColor}
                  onUnreadChange={handleSupportUnread}
                />
              )}

              {activeTab === "coach-blue" && (
                hasCoachBlue ? (
                  <CoachBlueChat />
                ) : (
                  /* Locked state — not logged in or no subscription */
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                      <img src={coachBlueIcon48} alt="Coach Blue" className="w-12 h-12 object-contain opacity-60" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base">Coach Blue</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Your AI Business Advisor</p>
                    </div>
                    <p className="text-sm text-gray-600 max-w-xs">
                      {isLoggedIn
                        ? "Get personalized guidance based on your Digital IQ score, setup progress, and business data."
                        : "Coach Blue is your personal AI business mentor — available 24/7 to help you grow your digital presence."}
                    </p>
                    {!isLoggedIn ? (
                      <>
                        <p className="text-sm text-gray-600 max-w-xs">
                          Coach Blue is available to subscribers. Log in to your account to get started.
                        </p>
                        <button
                          onClick={() => { setIsOpen(false); setLocation("/portal/login"); }}
                          className="px-6 py-2 bg-[#F97316] text-white text-sm font-medium rounded-lg hover:bg-[#EA6C10] transition-colors"
                        >
                          Log In
                        </button>
                        <button
                          onClick={() => { setIsOpen(false); setLocation("/coach-blue"); }}
                          className="px-6 py-2 text-sm font-medium text-[#0000FF] hover:underline transition-colors"
                        >
                          Learn More About Coach Blue
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-gray-800">$99/mo standalone · $59/mo with a suite · FREE with both suites</p>
                        <button
                          onClick={() => { setIsOpen(false); setLocation("/coach-blue"); }}
                          className="px-6 py-2 bg-[#0000FF] text-white text-sm font-medium rounded-lg hover:bg-[#0000CC] transition-colors"
                        >
                          Learn More
                        </button>
                      </>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
