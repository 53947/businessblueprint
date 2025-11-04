/**
 * PROPOSED NEW HEADER NAVIGATION CODE
 * 
 * Status: AWAITING APPROVAL - DO NOT IMPLEMENT YET
 * 
 * This file contains the proposed new header menu structure based on
 * the approved MENU_PROPOSAL.md. Review this code before implementation.
 * 
 * Once approved, this will replace the current header.tsx navigation menu.
 */

// ============================================================================
// NEW MENU STRUCTURE (Top-level items):
// 1. How It Works (NEW)
// 2. Pricing (ENHANCED with Base Plans + Execution Styles + Marketplace)
// 3. Applications (Commverse Suite - add bundle option)
// 4. Solutions (Platform Ecosystem)
// 5. Resources (Keep current)
// ============================================================================

{/* ==================== 1. HOW IT WORKS (NEW) ==================== */}
<NavigationMenuItem>
  <NavigationMenuTrigger className="flex items-center space-x-2 bg-gray-100" data-testid="menu-trigger-how-it-works">
    <img src={compassIcon} alt="" className="w-4 h-4" />
    <span>How It Works</span>
  </NavigationMenuTrigger>
  <NavigationMenuContent>
    <div className="p-6 w-[600px]">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Get Found, Get Customers, Get Business
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          The Digital Blueprint Process: Foundation → Framing → Build Method → Fixtures → Inspections → Handover
        </p>
      </div>

      <div className="space-y-4">
        {/* Step 1: Digital Assessment */}
        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">1</div>
          </div>
          <div>
            <div className="font-bold text-gray-900 dark:text-white">Digital Assessment</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI analyzes your online presence and gives you a Digital IQ Score
            </p>
          </div>
        </div>

        {/* Step 2: Choose Your Base Plan */}
        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</div>
          </div>
          <div>
            <div className="font-bold text-gray-900 dark:text-white">Choose Your Base Plan</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Start ($99), Advanced ($299), or Scale ($999) - pick your structural depth
            </p>
          </div>
        </div>

        {/* Step 3: Pick Your Build Method */}
        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</div>
          </div>
          <div>
            <div className="font-bold text-gray-900 dark:text-white">Pick Your Build Method</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              DIY (you build), MSP (we manage), or ALC (pick modules without base plan)
            </p>
          </div>
        </div>

        {/* Step 4: Add Your Tools */}
        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">4</div>
          </div>
          <div>
            <div className="font-bold text-gray-900 dark:text-white">Build Your Blueprint</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add Commverse apps, coaching, and access your dashboard
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/assessment">
          <Button className="w-full" data-testid="button-start-assessment">
            Start Your Free Assessment →
          </Button>
        </Link>
      </div>
    </div>
  </NavigationMenuContent>
</NavigationMenuItem>

{/* ==================== 2. PRICING (ENHANCED) ==================== */}
<NavigationMenuItem>
  <NavigationMenuTrigger className="flex items-center space-x-2 bg-gray-100" data-testid="menu-trigger-pricing">
    <img src={dollarSignIcon} alt="" className="w-4 h-4" />
    <span>Pricing</span>
  </NavigationMenuTrigger>
  <NavigationMenuContent>
    <div className="p-6 w-[800px]">
      {/* Base Plans Section */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Base Plans - Choose Your Structural Depth
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {/* Start Plan */}
          <NavigationMenuLink asChild>
            <a
              className="block p-4 rounded-lg border-2 border-orange-200 dark:border-orange-800 hover:border-orange-500 hover:shadow-lg transition-all"
              href="/pricing?plan=start"
              data-testid="link-plan-start"
            >
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">$99<span className="text-sm">/mo</span></div>
              <div className="font-bold text-gray-900 dark:text-white mb-2">Start</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Lay the foundation: assessment, Digital IQ, ~50 listings, starter SEO
              </p>
            </a>
          </NavigationMenuLink>

          {/* Advanced Plan */}
          <NavigationMenuLink asChild>
            <a
              className="block p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 hover:shadow-lg transition-all"
              href="/pricing?plan=advanced"
              data-testid="link-plan-advanced"
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">$299<span className="text-sm">/mo</span></div>
              <div className="font-bold text-gray-900 dark:text-white mb-2">Advanced</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Build your framework: ~150 listings, automation, review flow
              </p>
            </a>
          </NavigationMenuLink>

          {/* Scale Plan */}
          <NavigationMenuLink asChild>
            <a
              className="block p-4 rounded-lg border-2 border-green-200 dark:border-green-800 hover:border-green-500 hover:shadow-lg transition-all"
              href="/pricing?plan=scale"
              data-testid="link-plan-scale"
            >
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">$999<span className="text-sm">/mo</span></div>
              <div className="font-bold text-gray-900 dark:text-white mb-2">Scale</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Full build: multi-location, advanced automation, executive dashboards
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                ⚠️ Incompatible with ALC
              </p>
            </a>
          </NavigationMenuLink>
        </div>
      </div>

      {/* Execution Styles Section */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Execution Styles - Pick Your Build Method
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {/* DIY */}
          <NavigationMenuLink asChild>
            <a
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 hover:shadow-md transition-all"
              href="/pricing?style=diy"
              data-testid="link-execution-diy"
            >
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <span className="text-xl">🔨</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">DIY</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">You install from the plan</p>
              </div>
            </a>
          </NavigationMenuLink>

          {/* MSP */}
          <NavigationMenuLink asChild>
            <a
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:shadow-md transition-all"
              href="/pricing?style=msp"
              data-testid="link-execution-msp"
            >
              <img src={hostsBlueIcon} alt="MSP" className="w-10 h-10 rounded-lg" />
              <div>
                <div className="font-bold text-gray-900 dark:text-white">MSP</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Our crew manages the build</p>
              </div>
            </a>
          </NavigationMenuLink>

          {/* ALC */}
          <NavigationMenuLink asChild>
            <a
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 hover:shadow-md transition-all"
              href="/pricing?style=alc"
              data-testid="link-execution-alc"
            >
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">ALC</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Pick modules, no base plan</p>
              </div>
            </a>
          </NavigationMenuLink>
        </div>
      </div>

      {/* Marketplace Add-ons */}
      <div>
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Marketplace - Add-Ons & Coaching
        </h4>
        <div className="space-y-2">
          <NavigationMenuLink asChild>
            <a
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-md transition-all"
              href="/pricing?addon=commverse"
              data-testid="link-addon-commverse"
            >
              <div className="flex items-center gap-3">
                <img src={commverseBundle} alt="Commverse" className="w-10 h-10 rounded-lg" />
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Commverse Bundle</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">All 4 apps - Save $40/mo</p>
                </div>
              </div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">$100/mo</div>
            </a>
          </NavigationMenuLink>

          <NavigationMenuLink asChild>
            <a
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:shadow-md transition-all"
              href="/pricing?addon=coach-blue"
              data-testid="link-addon-coach-blue"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Coach Blue</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">AI Business Coach</p>
                </div>
              </div>
              <div className="text-sm font-bold text-purple-600 dark:text-purple-400">$99 DIY / $59 MSP</div>
            </a>
          </NavigationMenuLink>

          <NavigationMenuLink asChild>
            <a
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-yellow-500 hover:shadow-md transition-all"
              href="/pricing?addon=captains-chair"
              data-testid="link-addon-captains-chair"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">👨‍✈️</span>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Captain's Chair</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Personal CEO Coaching (max 2 months)</p>
                </div>
              </div>
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">$499/mo</div>
            </a>
          </NavigationMenuLink>
        </div>
      </div>
    </div>
  </NavigationMenuContent>
</NavigationMenuItem>

{/* ==================== 3. APPLICATIONS (Commverse Suite) - ADD BUNDLE ==================== */}
<NavigationMenuItem>
  <NavigationMenuTrigger className="flex items-center space-x-2 bg-gray-100" data-testid="menu-trigger-applications">
    <img src={layersIcon} alt="" className="w-4 h-4" />
    <span>Applications</span>
  </NavigationMenuTrigger>
  <NavigationMenuContent>
    <div className="p-6 w-[700px]">
      {/* Commverse Bundle Highlight (NEW) */}
      <div className="mb-6 p-4 rounded-lg border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={commverseBundle} alt="Commverse Bundle" className="h-12 w-12 object-contain" />
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">Commverse Bundle</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">All 4 Communication Apps</p>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">$100<span className="text-sm">/mo</span></div>
            <p className="text-xs text-green-600 dark:text-green-400">Save $40/month</p>
          </div>
        </div>
        <Link href="/applications?bundle=commverse">
          <Button className="w-full" data-testid="button-get-commverse">
            Get Commverse Bundle →
          </Button>
        </Link>
      </div>

      {/* Individual Apps Grid (KEEP CURRENT) */}
      <div className="mb-3">
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Or choose individual apps at $35/mo each
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* /send - KEEP CURRENT CODE */}
        <NavigationMenuLink asChild>
          <a
            className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-green-500 hover:shadow-xl hover:from-green-50 hover:to-green-100 dark:hover:from-green-950 dark:hover:to-green-900 hover:scale-[1.02]"
            href="/send"
            data-testid="link-app-send"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src={sendIcon} alt="/send icon" className="h-10 w-10 object-contain" />
                <img src={sendLogo} alt="/send" className="h-8 object-contain" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">Visit Platform →</span>
              </div>
            </div>
            <div className="text-base font-bold text-gray-900 dark:text-white" data-testid="text-app-send-title">Email + SMS Marketing</div>
            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-send-description">
              Unified marketing campaigns with full compliance
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300" data-testid="list-app-send-features">
              <li className="flex items-center"><span className="text-green-500 dark:text-green-400 mr-1.5">✓</span> Email & SMS Campaigns</li>
              <li className="flex items-center"><span className="text-green-500 dark:text-green-400 mr-1.5">✓</span> Contact Management</li>
              <li className="flex items-center"><span className="text-green-500 dark:text-green-400 mr-1.5">✓</span> GDPR/CAN-SPAM Compliant</li>
            </ul>
          </a>
        </NavigationMenuLink>

        {/* /inbox - KEEP CURRENT CODE */}
        <NavigationMenuLink asChild>
          <a
            className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-yellow-500 hover:shadow-xl hover:from-yellow-50 hover:to-yellow-100 dark:hover:from-yellow-950 dark:hover:to-yellow-900 hover:scale-[1.02]"
            href="/inbox-app"
            data-testid="link-app-inbox"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src={inboxIcon} alt="/inbox icon" className="h-10 w-10 object-contain" />
                <img src={inboxLogo} alt="/inbox" className="h-8 object-contain" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">Visit Platform →</span>
              </div>
            </div>
            <div className="text-base font-bold text-gray-900 dark:text-white" data-testid="text-app-inbox-title">Unified Communications</div>
            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-inbox-description">
              Multi-channel messaging hub for all customer communications
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300" data-testid="list-app-inbox-features">
              <li className="flex items-center"><span className="text-yellow-500 dark:text-yellow-400 mr-1.5">✓</span> Email, Chat & Social DMs</li>
              <li className="flex items-center"><span className="text-yellow-500 dark:text-yellow-400 mr-1.5">✓</span> Real-time Messaging</li>
              <li className="flex items-center"><span className="text-yellow-500 dark:text-yellow-400 mr-1.5">✓</span> Team Collaboration</li>
            </ul>
          </a>
        </NavigationMenuLink>

        {/* /livechat - KEEP CURRENT CODE */}
        <NavigationMenuLink asChild>
          <a
            className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-teal-500 hover:shadow-xl hover:from-teal-50 hover:to-teal-100 dark:hover:from-teal-950 dark:hover:to-teal-900 hover:scale-[1.02]"
            href="/livechat"
            data-testid="link-app-livechat"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src={livechatIcon} alt="/livechat icon" className="h-10 w-10 object-contain" />
                <img src={livechatLogo} alt="/livechat" className="h-8 object-contain" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">Visit Platform →</span>
              </div>
            </div>
            <div className="text-base font-bold text-gray-900 dark:text-white" data-testid="text-app-livechat-title">Live Chat Widget</div>
            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-livechat-description">
              Real-time customer chat for your website
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300" data-testid="list-app-livechat-features">
              <li className="flex items-center"><span className="text-teal-500 dark:text-teal-400 mr-1.5">✓</span> Website Live Chat</li>
              <li className="flex items-center"><span className="text-teal-500 dark:text-teal-400 mr-1.5">✓</span> Session Persistence</li>
              <li className="flex items-center"><span className="text-teal-500 dark:text-teal-400 mr-1.5">✓</span> Conversation History</li>
            </ul>
          </a>
        </NavigationMenuLink>

        {/* /content - KEEP CURRENT CODE */}
        <NavigationMenuLink asChild>
          <a
            className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-pink-500 hover:shadow-xl hover:from-pink-50 hover:to-pink-100 dark:hover:from-pink-950 dark:hover:to-pink-900 hover:scale-[1.02]"
            href="/content"
            data-testid="link-app-content"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src={contentIcon} alt="/content icon" className="h-10 w-10 object-contain" />
                <img src={contentLogo} alt="/content" className="h-8 object-contain" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-semibold text-pink-600 dark:text-pink-400">Visit Platform →</span>
              </div>
            </div>
            <div className="text-base font-bold text-gray-900 dark:text-white" data-testid="text-app-content-title">Social Media Management</div>
            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400" data-testid="text-app-content-description">
              Social media manager
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300" data-testid="list-app-content-features">
              <li className="flex items-center"><span className="text-pink-500 dark:text-pink-400 mr-1.5">✓</span> Content Calendar</li>
              <li className="flex items-center"><span className="text-pink-500 dark:text-pink-400 mr-1.5">✓</span> Media Library</li>
              <li className="flex items-center"><span className="text-pink-500 dark:text-pink-400 mr-1.5">✓</span> AI Caption Suggestions</li>
            </ul>
          </a>
        </NavigationMenuLink>
      </div>
    </div>
  </NavigationMenuContent>
</NavigationMenuItem>

{/* ==================== 4. SOLUTIONS (Platform Ecosystem) ==================== */}
<NavigationMenuItem>
  <NavigationMenuTrigger className="flex items-center space-x-2 bg-gray-100" data-testid="menu-trigger-solutions">
    <img src={lightbulbIcon} alt="" className="w-4 h-4" />
    <span>Solutions</span>
  </NavigationMenuTrigger>
  <NavigationMenuContent>
    <div className="grid gap-4 p-6 w-[600px]">
      <div className="grid grid-cols-1 gap-4">
        {/* Business Blueprint */}
        <NavigationMenuLink asChild>
          <a
            className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-orange-500 hover:shadow-lg"
            href="/solutions/businessblueprint"
            data-testid="link-solution-businessblueprint"
          >
            <div className="flex items-center gap-3 mb-2">
              <img src={blueprintIcon} alt="Business Blueprint" className="h-12 w-12 object-contain" />
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">Business Blueprint</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered Digital Intelligence Platform</p>
              </div>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center"><span className="text-orange-500 mr-1.5">•</span> AI-powered assessment & coaching</li>
              <li className="flex items-center"><span className="text-orange-500 mr-1.5">•</span> Digital IQ scoring</li>
              <li className="flex items-center"><span className="text-orange-500 mr-1.5">•</span> Complete communication suite</li>
              <li className="flex items-center"><span className="text-orange-500 mr-1.5">•</span> Dashboard & analytics</li>
            </ul>
          </a>
        </NavigationMenuLink>

        {/* Hosts Blue */}
        <NavigationMenuLink asChild>
          <a
            className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-purple-500 hover:shadow-lg"
            href="/solutions/hostsblue"
            data-testid="link-solution-hostsblue"
          >
            <div className="flex items-center gap-3 mb-2">
              <img src={hostsBlueIcon} alt="Hosts Blue" className="h-12 w-12 object-contain" />
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">Hosts Blue</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Web Services & MSP Partner</p>
              </div>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center"><span className="text-purple-500 mr-1.5">•</span> High-performance hosting</li>
              <li className="flex items-center"><span className="text-purple-500 mr-1.5">•</span> Domain management</li>
              <li className="flex items-center"><span className="text-purple-500 mr-1.5">•</span> Website builder tools</li>
              <li className="flex items-center"><span className="text-purple-500 mr-1.5">•</span> Technical infrastructure</li>
            </ul>
          </a>
        </NavigationMenuLink>

        {/* Swipes Blue */}
        <NavigationMenuLink asChild>
          <a
            className="group block select-none space-y-2 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 p-4 leading-none no-underline outline-none transition-all hover:border-red-500 hover:shadow-lg"
            href="/solutions/swipesblue"
            data-testid="link-solution-swipesblue"
          >
            <div className="flex items-center gap-3 mb-2">
              <img src={swipesBlueIcon} alt="Swipes Blue" className="h-12 w-12 object-contain" />
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">Swipes Blue</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Secure Payment Gateway</p>
              </div>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center"><span className="text-red-500 mr-1.5">•</span> Secure checkout integration</li>
              <li className="flex items-center"><span className="text-red-500 mr-1.5">•</span> Transaction management</li>
              <li className="flex items-center"><span className="text-red-500 mr-1.5">•</span> Powers all platform payments</li>
              <li className="flex items-center"><span className="text-red-500 mr-1.5">•</span> Embedded payment flows</li>
            </ul>
          </a>
        </NavigationMenuLink>
      </div>
    </div>
  </NavigationMenuContent>
</NavigationMenuItem>

{/* ==================== 5. RESOURCES (Keep Current - no changes needed) ==================== */}
{/* Keep existing Resources menu as-is */}

/**
 * IMPLEMENTATION NOTES:
 * 
 * When implementing this code:
 * 1. Replace the existing navigation menu items in header.tsx
 * 2. Keep all imports at the top
 * 3. Ensure all icon imports are present
 * 4. Test all links to ensure they work
 * 5. Verify responsive behavior on mobile
 * 
 * Color Standards (from _constants.md):
 * - Orange (Start/DIY): #FFA500
 * - Blue (Advanced/MSP): #0000FF  
 * - Green (Scale/ALC): #00FF40
 * - Purple (Hosts Blue): #8000FF
 * - Red (Swipes Blue): #FF0040
 */
