import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Code, Copy, Check, Download, Settings, Eye, Palette, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SectionHeader } from "@/components/section-header";

export default function LiveChatInstall() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('installation');
  
  // Configuration state
  const [config, setConfig] = useState({
    clientId: sessionStorage.getItem('clientId') || '1',
    companyName: sessionStorage.getItem('clientName') || 'Your Company',
    primaryColor: '#8000FF',
    position: 'bottom-right',
    welcomeMessage: 'Hi! How can we help you today?',
    requireEmail: false,
    enableSound: true,
  });

  // Generate embed code based on configuration
  const generateEmbedCode = () => {
    return `<!-- Business Blueprint Live Chat Widget -->
<script>
  window.bbLiveChatConfig = {
    clientId: "${config.clientId}",
    companyName: "${config.companyName}",
    primaryColor: "${config.primaryColor}",
    position: "${config.position}",
    welcomeMessage: "${config.welcomeMessage}",
    requireEmail: ${config.requireEmail},
    enableSound: ${config.enableSound}
  };
</script>
<script src="${window.location.origin}/livechat-widget.js" async></script>`;
  };

  // Generate standalone JavaScript snippet
  const generateJavaScript = () => {
    return `(function() {
  // Business Blueprint Live Chat Widget
  var config = {
    clientId: "${config.clientId}",
    companyName: "${config.companyName}",
    primaryColor: "${config.primaryColor}",
    position: "${config.position}",
    welcomeMessage: "${config.welcomeMessage}",
    requireEmail: ${config.requireEmail},
    enableSound: ${config.enableSound},
    apiEndpoint: "${window.location.origin}"
  };

  // Create widget container
  var container = document.createElement('div');
  container.id = 'bb-livechat-widget';
  document.body.appendChild(container);

  // Load widget script
  var script = document.createElement('script');
  script.src = config.apiEndpoint + '/livechat-widget.js';
  script.onload = function() {
    if (window.BBLiveChat) {
      window.BBLiveChat.init(config);
    }
  };
  document.head.appendChild(script);

  // Load widget styles
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = config.apiEndpoint + '/livechat-widget.css';
  document.head.appendChild(link);
})();`;
  };

  // Generate WordPress shortcode
  const generateWordPressCode = () => {
    return `<?php
/**
 * Business Blueprint Live Chat Widget
 * Add this to your theme's functions.php
 */
function bb_livechat_widget() {
  $config = array(
    'clientId' => '${config.clientId}',
    'companyName' => '${config.companyName}',
    'primaryColor' => '${config.primaryColor}',
    'position' => '${config.position}',
    'welcomeMessage' => '${config.welcomeMessage}',
    'requireEmail' => ${config.requireEmail ? 'true' : 'false'},
    'enableSound' => ${config.enableSound ? 'true' : 'false'}
  );
  ?>
  <script>
    window.bbLiveChatConfig = <?php echo json_encode($config); ?>;
  </script>
  <script src="<?php echo esc_url('${window.location.origin}/livechat-widget.js'); ?>" async></script>
  <?php
}
add_action('wp_footer', 'bb_livechat_widget');
?>`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: `${filename} has been downloaded`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SectionHeader 
        title="/livechat - Installation & Setup"
        tabs={[
          { 
            label: 'Installation', 
            icon: Code, 
            active: activeTab === 'installation',
            onClick: () => setActiveTab('installation'),
            testId: 'tab-installation'
          },
          { 
            label: 'Configuration', 
            icon: Settings, 
            active: activeTab === 'configuration',
            onClick: () => setActiveTab('configuration'),
            testId: 'tab-configuration'
          },
          { 
            label: 'Preview', 
            icon: Eye, 
            active: activeTab === 'preview',
            onClick: () => setActiveTab('preview'),
            testId: 'tab-preview'
          }
        ]}
        showHomeButton={true}
        homeRoute="/portal"
      />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="installation" className="space-y-6">
            {/* Quick Start Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Quick Start Guide
                </CardTitle>
                <CardDescription>
                  Add live chat to your website in 3 easy steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                      1
                    </div>
                    <h3 className="font-semibold">Copy the Code</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Choose your preferred installation method and copy the embed code
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-lg">
                      2
                    </div>
                    <h3 className="font-semibold">Add to Your Site</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Paste the code before the closing &lt;/body&gt; tag of your website
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-lg">
                      3
                    </div>
                    <h3 className="font-semibold">Start Chatting</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      The chat widget will appear on your site instantly. Test it out!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* HTML Embed Code */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>HTML Embed Code</CardTitle>
                    <CardDescription>
                      Standard installation for any website
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Recommended
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{generateEmbedCode()}</code>
                  </pre>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generateEmbedCode(), 'HTML embed code')}
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                      data-testid="button-copy-html"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(generateEmbedCode(), 'livechat-embed.html')}
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                      data-testid="button-download-html"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  💡 Paste this code just before the closing <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">&lt;/body&gt;</code> tag in your HTML
                </p>
              </CardContent>
            </Card>

            {/* JavaScript Snippet */}
            <Card>
              <CardHeader>
                <CardTitle>JavaScript Snippet</CardTitle>
                <CardDescription>
                  Self-contained script for dynamic installation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-80">
                    <code>{generateJavaScript()}</code>
                  </pre>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generateJavaScript(), 'JavaScript snippet')}
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                      data-testid="button-copy-js"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(generateJavaScript(), 'livechat-widget.js')}
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                      data-testid="button-download-js"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  💡 Use this for Google Tag Manager or when you need more control over loading
                </p>
              </CardContent>
            </Card>

            {/* WordPress Installation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>WordPress Installation</CardTitle>
                    <CardDescription>
                      For WordPress sites via functions.php
                    </CardDescription>
                  </div>
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-80">
                    <code>{generateWordPressCode()}</code>
                  </pre>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generateWordPressCode(), 'WordPress code')}
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                      data-testid="button-copy-wordpress"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(generateWordPressCode(), 'livechat-functions.php')}
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                      data-testid="button-download-wordpress"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">WordPress Instructions:</h4>
                  <ol className="text-sm text-purple-700 dark:text-purple-300 space-y-1 list-decimal list-inside">
                    <li>Navigate to Appearance → Theme File Editor</li>
                    <li>Select functions.php from the right sidebar</li>
                    <li>Paste the code at the end of the file</li>
                    <li>Click "Update File" to save</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Widget Configuration
                </CardTitle>
                <CardDescription>
                  Customize your live chat widget appearance and behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input
                      id="clientId"
                      value={config.clientId}
                      onChange={(e) => setConfig({...config, clientId: e.target.value})}
                      data-testid="input-client-id"
                      disabled
                      className="bg-gray-100 dark:bg-gray-800"
                    />
                    <p className="text-xs text-gray-500">Auto-filled from your account</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={config.companyName}
                      onChange={(e) => setConfig({...config, companyName: e.target.value})}
                      data-testid="input-company-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryColor" className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Primary Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                        className="w-20 h-10"
                        data-testid="input-primary-color"
                      />
                      <Input
                        value={config.primaryColor}
                        onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                        className="flex-1"
                        data-testid="input-primary-color-hex"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Widget Position</Label>
                    <select
                      id="position"
                      value={config.position}
                      onChange={(e) => setConfig({...config, position: e.target.value})}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      data-testid="select-position"
                    >
                      <option value="bottom-right">Bottom Right</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="top-right">Top Right</option>
                      <option value="top-left">Top Left</option>
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="welcomeMessage">Welcome Message</Label>
                    <Textarea
                      id="welcomeMessage"
                      value={config.welcomeMessage}
                      onChange={(e) => setConfig({...config, welcomeMessage: e.target.value})}
                      rows={3}
                      data-testid="textarea-welcome-message"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="requireEmail"
                      checked={config.requireEmail}
                      onChange={(e) => setConfig({...config, requireEmail: e.target.checked})}
                      className="w-4 h-4"
                      data-testid="checkbox-require-email"
                    />
                    <Label htmlFor="requireEmail" className="font-normal">Require email address</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="enableSound"
                      checked={config.enableSound}
                      onChange={(e) => setConfig({...config, enableSound: e.target.checked})}
                      className="w-4 h-4"
                      data-testid="checkbox-enable-sound"
                    />
                    <Label htmlFor="enableSound" className="font-normal">Enable notification sounds</Label>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => {
                      setActiveTab('installation');
                      toast({ title: 'Configuration saved', description: 'Your settings have been updated in all code snippets' });
                    }}
                    className="w-full md:w-auto"
                    data-testid="button-save-config"
                  >
                    Save & View Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>
                  See how your widget will look on your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 min-h-96 relative">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="mb-2">Your website preview would appear here</p>
                    <p className="text-sm">The chat widget will be positioned in the <strong>{config.position}</strong></p>
                  </div>
                  
                  {/* Preview widget button */}
                  <div 
                    className={`absolute ${
                      config.position === 'bottom-right' ? 'bottom-6 right-6' :
                      config.position === 'bottom-left' ? 'bottom-6 left-6' :
                      config.position === 'top-right' ? 'top-6 right-6' :
                      'top-6 left-6'
                    }`}
                  >
                    <button 
                      className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
                      style={{ backgroundColor: config.primaryColor }}
                      data-testid="preview-widget-button"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Current Configuration:</h4>
                  <dl className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-blue-600 dark:text-blue-400">Position:</dt>
                      <dd className="font-medium text-blue-900 dark:text-blue-100">{config.position}</dd>
                    </div>
                    <div>
                      <dt className="text-blue-600 dark:text-blue-400">Color:</dt>
                      <dd className="font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <span className="w-4 h-4 rounded" style={{ backgroundColor: config.primaryColor }}></span>
                        {config.primaryColor}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-blue-600 dark:text-blue-400">Company:</dt>
                      <dd className="font-medium text-blue-900 dark:text-blue-100">{config.companyName}</dd>
                    </div>
                    <div>
                      <dt className="text-blue-600 dark:text-blue-400">Email Required:</dt>
                      <dd className="font-medium text-blue-900 dark:text-blue-100">{config.requireEmail ? 'Yes' : 'No'}</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
