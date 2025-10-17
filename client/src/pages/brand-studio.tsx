import { useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Palette, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Download,
  Plus,
  Shield,
  Eye,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Asset {
  id: number;
  name: string;
  type: 'logo' | 'icon' | 'image';
  url: string;
  size: string;
  uploadedAt: string;
}

export default function BrandStudio() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('logos');
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null);
  
  // Mock assets - will be replaced with real data
  const [logos, setLogos] = useState<Asset[]>([
    { id: 1, name: 'Business Blueprint Logo', type: 'logo', url: '/assets/bb-logo.png', size: '45 KB', uploadedAt: '2024-01-15' },
    { id: 2, name: 'Business Blueprint Icon', type: 'icon', url: '/assets/bb-icon.png', size: '12 KB', uploadedAt: '2024-01-15' },
  ]);

  // Brand colors
  const [brandColors, setBrandColors] = useState([
    { id: 1, name: 'Core Black', hex: '#09080E', usage: 'Primary text, headers' },
    { id: 2, name: 'Triad Blue', hex: '#0000FF', usage: 'Brand primary' },
    { id: 3, name: 'Business Blueprint', hex: '#FFA500', usage: 'Business Blueprint brand' },
    { id: 4, name: 'Inbox Blue', hex: '#0080FF', usage: '/inbox app color' },
    { id: 5, name: '/send Yellow', hex: '#E6B747', usage: '/send app color' },
    { id: 6, name: '/livechat Purple', hex: '#8000FF', usage: '/livechat app color' },
  ]);

  const [newColor, setNewColor] = useState({ name: '', hex: '#000000', usage: '' });

  const handleFileUpload = (type: 'logo' | 'icon' | 'image') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        // Create object URL for preview
        const url = URL.createObjectURL(file);
        const sizeInKB = Math.round(file.size / 1024);
        const today = new Date().toISOString().split('T')[0];
        
        // Create new asset object
        const newAsset: Asset = {
          id: Date.now(),
          name: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
          type: type,
          url: url,
          size: `${sizeInKB} KB`,
          uploadedAt: today
        };
        
        // Add to state
        setLogos([...logos, newAsset]);
        
        toast({
          title: 'Upload successful',
          description: `${file.name} has been uploaded`,
        });
      }
    };
    input.click();
  };

  const deleteAsset = (id: number) => {
    const asset = logos.find(l => l.id === id);
    if (asset && asset.url.startsWith('blob:')) {
      // Revoke object URL to free memory
      URL.revokeObjectURL(asset.url);
    }
    setLogos(logos.filter(logo => logo.id !== id));
    toast({
      title: 'Asset deleted',
      description: 'The asset has been removed',
    });
  };

  const downloadAsset = (asset: Asset) => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = asset.url;
    link.download = `${asset.name}.png`;
    link.click();
    toast({
      title: 'Download started',
      description: `${asset.name} is downloading`,
    });
  };

  const addColor = () => {
    if (!newColor.name || !newColor.hex) {
      toast({
        title: 'Error',
        description: 'Please fill in color name and hex value',
        variant: 'destructive',
      });
      return;
    }

    setBrandColors([...brandColors, { ...newColor, id: Date.now() }]);
    setNewColor({ name: '', hex: '#000000', usage: '' });
    toast({
      title: 'Color added',
      description: `${newColor.name} has been added to your brand palette`,
    });
  };

  const deleteColor = (id: number) => {
    setBrandColors(brandColors.filter(color => color.id !== id));
    toast({
      title: 'Color removed',
      description: 'The color has been removed from your palette',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header showNavigation={true} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="title-brand-studio">
                Brand Studio
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your logos, icons, colors, and brand assets
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="logos" data-testid="tab-logos">
              <ImageIcon className="w-4 h-4 mr-2" />
              Logos & Icons
            </TabsTrigger>
            <TabsTrigger value="colors" data-testid="tab-colors">
              <Palette className="w-4 h-4 mr-2" />
              Brand Colors
            </TabsTrigger>
            <TabsTrigger value="assets" data-testid="tab-assets">
              <Upload className="w-4 h-4 mr-2" />
              Asset Library
            </TabsTrigger>
          </TabsList>

          {/* Logos & Icons Tab */}
          <TabsContent value="logos" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Logos & Icons</CardTitle>
                    <CardDescription>
                      Upload and manage your brand logos and icons
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleFileUpload('logo')} data-testid="button-upload-logo">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <Button onClick={() => handleFileUpload('icon')} variant="outline" data-testid="button-upload-icon">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Icon
                    </Button>
                    <Button onClick={() => handleFileUpload('image')} variant="outline" data-testid="button-upload-image">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {logos.map((asset) => (
                    <div key={asset.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4" data-testid={`asset-${asset.id}`}>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-40 flex items-center justify-center mb-4 overflow-hidden p-2">
                        {asset.url.startsWith('blob:') || asset.url.startsWith('http') ? (
                          <img 
                            src={asset.url} 
                            alt={asset.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <ImageIcon className="w-16 h-16 text-gray-400" />
                        )}
                      </div>
                      <h3 className="font-semibold mb-2" data-testid={`asset-name-${asset.id}`}>{asset.name}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span>{asset.size}</span>
                        <span>{asset.uploadedAt}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1" 
                          onClick={() => setPreviewAsset(asset)}
                          data-testid={`button-preview-${asset.id}`}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => downloadAsset(asset)}
                          data-testid={`button-download-${asset.id}`}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => deleteAsset(asset.id)}
                          className="text-red-600 hover:text-red-700"
                          data-testid={`button-delete-${asset.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Upload Card */}
                  <button 
                    onClick={() => handleFileUpload('logo')}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 h-full min-h-[300px] flex flex-col items-center justify-center hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors"
                    data-testid="button-upload-new-asset"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Upload New Asset</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG, SVG up to 10MB</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brand Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Color Palette</CardTitle>
                <CardDescription>
                  Define and manage your brand colors for consistent use across the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Color List */}
                <div className="space-y-3">
                  {brandColors.map((color) => (
                    <div 
                      key={color.id} 
                      className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      data-testid={`color-${color.id}`}
                    >
                      <div 
                        className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: color.hex }}
                        data-testid={`color-preview-${color.id}`}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold" data-testid={`color-name-${color.id}`}>{color.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono" data-testid={`color-hex-${color.id}`}>{color.hex}</p>
                        {color.usage && (
                          <p className="text-xs text-gray-500 mt-1" data-testid={`color-usage-${color.id}`}>{color.usage}</p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(color.hex);
                          toast({ title: 'Copied!', description: `${color.hex} copied to clipboard` });
                        }}
                        data-testid={`button-copy-color-${color.id}`}
                      >
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteColor(color.id)}
                        className="text-red-600 hover:text-red-700"
                        data-testid={`button-delete-color-${color.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add New Color */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Add New Color</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="colorName">Color Name</Label>
                      <Input
                        id="colorName"
                        placeholder="e.g., Primary Blue"
                        value={newColor.name}
                        onChange={(e) => setNewColor({...newColor, name: e.target.value})}
                        data-testid="input-color-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="colorHex">Hex Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="colorHex"
                          type="color"
                          value={newColor.hex}
                          onChange={(e) => setNewColor({...newColor, hex: e.target.value})}
                          className="w-20"
                          data-testid="input-color-picker"
                        />
                        <Input
                          value={newColor.hex}
                          onChange={(e) => setNewColor({...newColor, hex: e.target.value})}
                          className="flex-1"
                          data-testid="input-color-hex"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="colorUsage">Usage (Optional)</Label>
                      <Input
                        id="colorUsage"
                        placeholder="e.g., Primary buttons"
                        value={newColor.usage}
                        onChange={(e) => setNewColor({...newColor, usage: e.target.value})}
                        data-testid="input-color-usage"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>&nbsp;</Label>
                      <Button onClick={addColor} className="w-full" data-testid="button-add-color">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Color
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Palette */}
            <Card>
              <CardHeader>
                <CardTitle>Export Color Palette</CardTitle>
                <CardDescription>
                  Download your brand colors in various formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button variant="outline" data-testid="button-export-css">
                    <Download className="w-4 h-4 mr-2" />
                    CSS Variables
                  </Button>
                  <Button variant="outline" data-testid="button-export-json">
                    <Download className="w-4 h-4 mr-2" />
                    JSON
                  </Button>
                  <Button variant="outline" data-testid="button-export-scss">
                    <Download className="w-4 h-4 mr-2" />
                    SCSS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Asset Library Tab */}
          <TabsContent value="assets" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Asset Library</CardTitle>
                    <CardDescription>
                      All uploaded images and media files
                    </CardDescription>
                  </div>
                  <Button onClick={() => handleFileUpload('image')} data-testid="button-upload-asset">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Asset
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">No assets uploaded yet</p>
                  <Button onClick={() => handleFileUpload('image')} data-testid="button-upload-first-asset">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Your First Asset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Admin Access Notice */}
        <Card className="mt-6 bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 text-purple-900 dark:text-purple-100">Admin Access</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Brand Studio is accessible from the admin panel. Changes made here will be reflected across all platform components.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Preview Dialog */}
      <Dialog open={!!previewAsset} onOpenChange={() => setPreviewAsset(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewAsset?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {previewAsset?.url ? (
              <img 
                src={previewAsset.url} 
                alt={previewAsset.name}
                className="max-w-full max-h-96 object-contain"
                data-testid="preview-image"
              />
            ) : (
              <ImageIcon className="w-32 h-32 text-gray-400" />
            )}
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Size: {previewAsset?.size}</p>
              <p>Uploaded: {previewAsset?.uploadedAt}</p>
            </div>
            <Button onClick={() => previewAsset && downloadAsset(previewAsset)} data-testid="button-download-from-preview">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
