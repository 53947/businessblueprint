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
    return (sessionStorage.getItem("chatWidgetTab") as TabId) || "coach-blue";
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
          <MessageCircle className="w-7 h-7" style={{ color: "#E9ECF0" }} />
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
            <div className="flex items-stretch md:rounded-t-xl shrink-0 overflow-hidden">
              {/* Support tab — Triad Orange #F97316, white text */}
              <button
                onClick={() => handleTabChange("support")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors relative ${
                  activeTab === "support" ? "opacity-100" : "opacity-70 hover:opacity-90"
                }`}
                style={{ backgroundColor: "#F97316", color: "#E9ECF0" }}
                role="tab"
                aria-selected={activeTab === "support"}
              >
                <Headphones className="w-4 h-4" />
                <span>Support</span>
                {supportUnread > 0 && activeTab !== "support" && (
                  <span className="w-2 h-2 rounded-full absolute top-2 right-4" style={{ backgroundColor: "#E9ECF0" }} />
                )}
              </button>

              {/* Coach Blue tab — Pure Blue #0000FF, white text */}
              <button
                onClick={() => handleTabChange("coach-blue")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  activeTab === "coach-blue" ? "opacity-100" : "opacity-70 hover:opacity-90"
                }`}
                style={{ backgroundColor: "#0000FF", color: "#E9ECF0" }}
                role="tab"
                aria-selected={activeTab === "coach-blue"}
              >
                <img src={coachBlueIcon24} alt="Coach Blue" className="w-4 h-4 object-contain" />
                <span>Coach Blue</span>
              </button>

              {/* Close button — matches active tab color */}
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: activeTab === "support" ? "#F97316" : "#0000FF",
                  color: "#E9ECF0"
                }}
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
                  /* Locked state — blue background, white text, white trim */
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4" style={{ backgroundColor: "#0000FF" }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(233,236,240,0.15)", border: "2px solid rgba(233,236,240,0.3)" }}>
                      <img src={coachBlueIcon48} alt="Coach Blue" className="w-12 h-12 object-contain" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base" style={{ color: "#E9ECF0" }}>Coach Blue</h3>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(233,236,240,0.7)" }}>Your AI Business Advisor</p>
                    </div>
                    <p className="text-sm max-w-xs" style={{ color: "#E9ECF0" }}>
                      {isLoggedIn
                        ? "Get personalized guidance based on your Digital IQ score, setup progress, and business data."
                        : "Coach Blue is your personal AI business mentor — available 24/7 to help you grow your digital presence."}
                    </p>
                    {!isLoggedIn ? (
                      <>
                        <p className="text-sm max-w-xs" style={{ color: "rgba(233,236,240,0.85)" }}>
                          Coach Blue is available to subscribers. Log in to your account to get started.
                        </p>
                        <button
                          onClick={() => { setIsOpen(false); setLocation("/portal/login"); }}
                          className="px-6 py-2 text-sm font-semibold rounded-lg transition-colors"
                          style={{ backgroundColor: "#E9ECF0", color: "#0000FF" }}
                        >
                          Log In
                        </button>
                        <button
                          onClick={() => { setIsOpen(false); setLocation("/coach-blue"); }}
                          className="px-6 py-2 text-sm font-medium transition-colors rounded-lg"
                          style={{ color: "#E9ECF0", border: "1px solid rgba(233,236,240,0.5)" }}
                        >
                          Learn More About Coach Blue
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold" style={{ color: "#E9ECF0" }}>$99/mo standalone · $59/mo with a suite · FREE with both suites</p>
                        <button
                          onClick={() => { setIsOpen(false); setLocation("/coach-blue"); }}
                          className="px-6 py-2 text-sm font-semibold rounded-lg transition-colors"
                          style={{ backgroundColor: "#E9ECF0", color: "#0000FF" }}
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
