import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
  Save,
  Edit2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

interface Asset {
  id: number;
  name: string;
  type: 'logo' | 'icon' | 'additional';
  fileName: string;
  size: number;
  url?: string;
  createdAt: string;
}

export default function BrandStudio() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('logos');
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null);
  const [assetUrls, setAssetUrls] = useState<Record<number, string>>({});
  const createdUrlsRef = useRef<Set<string>>(new Set());
  const [renamingAsset, setRenamingAsset] = useState<{ id: number; currentName: string } | null>(null);
  const [newFileName, setNewFileName] = useState('');

  // Fetch all brand assets
  const { data: assetsData, isLoading } = useQuery<{ success: boolean; assets: Asset[] }>({
    queryKey: ['/api/brand-assets'],
  });

  const assets = assetsData?.assets || [];

  // Convert base64 to blob URLs when assets change
  useEffect(() => {
    const fetchAssetData = async () => {
      // Get current asset IDs
      const currentAssetIds = new Set(assets.map(a => a.id));
      
      // Remove URLs for assets that no longer exist
      const urlsToRemove: number[] = [];
      Object.keys(assetUrls).forEach(idStr => {
        const id = parseInt(idStr);
        if (!currentAssetIds.has(id)) {
          // Asset was deleted, revoke its URL
          const url = assetUrls[id];
          URL.revokeObjectURL(url);
          createdUrlsRef.current.delete(url);
          urlsToRemove.push(id);
        }
      });
      
      if (urlsToRemove.length > 0) {
        setAssetUrls(prev => {
          const newUrls = { ...prev };
          urlsToRemove.forEach(id => delete newUrls[id]);
          return newUrls;
        });
      }
      
      // Fetch URLs for new assets
      const urls: Record<number, string> = {};
      
      for (const asset of assets) {
        if (!assetUrls[asset.id]) {
          try {
            const response = await fetch(`/api/brand-assets/${asset.id}`);
            const data = await response.json();
            
            if (data.success && data.asset.data) {
              // Convert base64 to blob URL
              const byteCharacters = atob(data.asset.data);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: data.asset.mimeType });
              const url = URL.createObjectURL(blob);
              urls[asset.id] = url;
              createdUrlsRef.current.add(url);
            }
          } catch (error) {
            console.error('Error fetching asset data:', error);
          }
        }
      }
      
      if (Object.keys(urls).length > 0) {
        setAssetUrls(prev => ({ ...prev, ...urls }));
      }
    };

    fetchAssetData();
  }, [assets]);

  // Cleanup all blob URLs on unmount only
  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
      createdUrlsRef.current.clear();
    };
  }, []);

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async ({ file, name, type }: { file: File; name: string; type: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('type', type);

      const response = await fetch('/api/brand-assets', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/brand-assets'] });
      toast({
        title: 'Upload successful',
        description: 'Your asset has been uploaded and saved',
      });
    },
    onError: (error) => {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Rename mutation
  const renameMutation = useMutation({
    mutationFn: async ({ id, newFileName }: { id: number; newFileName: string }) => {
      const response = await fetch(`/api/brand-assets/${id}/rename`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: newFileName }),
      });

      if (!response.ok) {
        throw new Error('Rename failed');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/brand-assets'] });
      toast({
        title: 'Rename successful',
        description: 'Asset filename has been updated',
      });
    },
    onError: (error) => {
      toast({
        title: 'Rename failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/brand-assets/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      return response.json();
    },
    onSuccess: (_, id) => {
      // Revoke blob URL and remove from tracking
      if (assetUrls[id]) {
        URL.revokeObjectURL(assetUrls[id]);
        createdUrlsRef.current.delete(assetUrls[id]);
        setAssetUrls(prev => {
          const { [id]: _, ...rest } = prev;
          return rest;
        });
      }
      queryClient.invalidateQueries({ queryKey: ['/api/brand-assets'] });
      toast({
        title: 'Asset deleted',
        description: 'The asset has been removed',
      });
    },
    onError: (error) => {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

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

  const handleFileUpload = (type: 'logo' | 'icon' | 'additional') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const name = file.name.replace(/\.[^/.]+$/, ''); // Remove file extension
        uploadMutation.mutate({ file, name, type });
      }
    };
    input.click();
  };

  const deleteAsset = (id: number) => {
    deleteMutation.mutate(id);
  };

  const startRename = (asset: Asset) => {
    setRenamingAsset({ id: asset.id, currentName: asset.fileName });
    setNewFileName(asset.fileName);
  };

  const handleRename = () => {
    if (!renamingAsset || !newFileName) return;
    renameMutation.mutate({ id: renamingAsset.id, newFileName });
    setRenamingAsset(null);
    setNewFileName('');
  };

  const downloadAsset = (asset: Asset) => {
    const url = assetUrls[asset.id];
    if (!url) {
      toast({
        title: 'Error',
        description: 'Asset data not loaded yet',
        variant: 'destructive',
      });
      return;
    }

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = asset.fileName;
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
      <Header showNavigation={true} brand="businessblueprint" />
      
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
            {/* Primary Logo Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-blue-600" />
                      Primary Logo
                    </CardTitle>
                    <CardDescription>
                      Main logo displayed in header, email signatures, and marketing materials
                    </CardDescription>
                  </div>
                  <Button onClick={() => handleFileUpload('logo')} data-testid="button-upload-logo">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {assets.filter(a => a.type === 'logo').length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {assets.filter(a => a.type === 'logo').map((asset) => (
                      <div key={asset.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-32 flex items-center justify-center mb-3 p-2">
                          {assetUrls[asset.id] ? (
                            <img src={assetUrls[asset.id]} alt={asset.name} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <ImageIcon className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                        <h4 className="font-medium text-sm mb-2">{asset.name}</h4>
                        <p className="text-xs text-gray-500 mb-3">{Math.round(asset.size / 1024)} KB</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => setPreviewAsset(asset)}>
                            <Eye className="w-3 h-3 mr-1" />Preview
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => deleteAsset(asset.id)} className="text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <button 
                    onClick={() => handleFileUpload('logo')}
                    className="w-full border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-8 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                  >
                    <ImageIcon className="w-16 h-16 text-blue-400 mb-3" />
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">Upload Primary Logo</p>
                    <p className="text-sm text-gray-500">PNG, JPG, SVG • Recommended: 300x80px</p>
                  </button>
                )}
              </CardContent>
            </Card>

            {/* Icon/Favicon Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-600" />
                      Favicon & App Icons
                    </CardTitle>
                    <CardDescription>
                      Upload favicon files with exact filenames for automatic website integration
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Blueprint_Avatar.png - 512x512 */}
                <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">Avatar / App Icon (512×512)</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        Must be named: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-purple-600">Blueprint_Avatar.png</code>
                      </p>
                      <p className="text-xs text-gray-500">Used for: Apple Touch Icon, profile images, app icons</p>
                    </div>
                  </div>
                  {assets.find(a => a.fileName === 'Blueprint_Avatar.png') ? (
                    <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded p-3">
                      <img 
                        src={assetUrls[assets.find(a => a.fileName === 'Blueprint_Avatar.png')!.id]} 
                        alt="Avatar" 
                        className="w-16 h-16 rounded object-contain bg-white"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">✓ Uploaded</p>
                        <p className="text-xs text-green-600 dark:text-green-400">Available at /assets/Blueprint_Avatar.png</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => startRename(assets.find(a => a.fileName === 'Blueprint_Avatar.png')!)}>
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteAsset(assets.find(a => a.fileName === 'Blueprint_Avatar.png')!.id)} className="text-red-600">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleFileUpload('icon')} variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Blueprint_Avatar.png
                    </Button>
                  )}
                </div>

                {/* Blueprint_Favicon.png - 64x64 */}
                <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">Favicon PNG (64×64)</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        Must be named: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-purple-600">Blueprint_Favicon.png</code>
                      </p>
                      <p className="text-xs text-gray-500">Used for: Browser tabs (PNG format)</p>
                    </div>
                  </div>
                  {assets.find(a => a.fileName === 'Blueprint_Favicon.png') ? (
                    <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded p-3">
                      <img 
                        src={assetUrls[assets.find(a => a.fileName === 'Blueprint_Favicon.png')!.id]} 
                        alt="Favicon PNG" 
                        className="w-16 h-16 rounded object-contain bg-white"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">✓ Uploaded</p>
                        <p className="text-xs text-green-600 dark:text-green-400">Available at /assets/Blueprint_Favicon.png</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => deleteAsset(assets.find(a => a.fileName === 'Blueprint_Favicon.png')!.id)} className="text-red-600">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleFileUpload('icon')} variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Blueprint_Favicon.png
                    </Button>
                  )}
                </div>

                {/* Blueprint_Favicon.ico - Multi-resolution */}
                <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">Favicon ICO (Multi-resolution)</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        Must be named: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-purple-600">Blueprint_Favicon.ico</code>
                      </p>
                      <p className="text-xs text-gray-500">Used for: Browser tabs (legacy ICO format, 16/32/64px)</p>
                    </div>
                  </div>
                  {assets.find(a => a.fileName === 'Blueprint_Favicon.ico') ? (
                    <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded p-3">
                      <div className="w-16 h-16 flex items-center justify-center bg-white rounded">
                        <Shield className="w-8 h-8 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">✓ Uploaded</p>
                        <p className="text-xs text-green-600 dark:text-green-400">Available at /assets/Blueprint_Favicon.ico</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => deleteAsset(assets.find(a => a.fileName === 'Blueprint_Favicon.ico')!.id)} className="text-red-600">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleFileUpload('icon')} variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Blueprint_Favicon.ico
                    </Button>
                  )}
                </div>

                {/* All Other Icons */}
                {assets.filter(a => 
                  a.type === 'icon' && 
                  !['Blueprint_Avatar.png', 'Blueprint_Favicon.png', 'Blueprint_Favicon.ico'].includes(a.fileName)
                ).length > 0 && (
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-sm mb-4">Other Icons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {assets.filter(a => 
                        a.type === 'icon' && 
                        !['Blueprint_Avatar.png', 'Blueprint_Favicon.png', 'Blueprint_Favicon.ico'].includes(a.fileName)
                      ).map((asset) => (
                        <div key={asset.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-24 flex items-center justify-center mb-3 p-2">
                            {assetUrls[asset.id] ? (
                              <img src={assetUrls[asset.id]} alt={asset.name} className="max-w-full max-h-full object-contain" />
                            ) : (
                              <Shield className="w-12 h-12 text-gray-400" />
                            )}
                          </div>
                          <h4 className="font-medium text-sm mb-2">{asset.name}</h4>
                          <p className="text-xs text-gray-500 mb-3">{Math.round(asset.size / 1024)} KB</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => setPreviewAsset(asset)}>
                              <Eye className="w-3 h-3 mr-1" />Preview
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => deleteAsset(asset.id)} className="text-red-600">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Images Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-green-600" />
                      Additional Brand Images
                    </CardTitle>
                    <CardDescription>
                      Marketing images, hero graphics, and other visual assets
                    </CardDescription>
                  </div>
                  <Button onClick={() => handleFileUpload('additional')} variant="outline" data-testid="button-upload-image">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {assets.filter(a => a.type === 'additional').length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {assets.filter(a => a.type === 'additional').map((asset) => (
                      <div key={asset.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-40 flex items-center justify-center mb-3 p-2">
                          {assetUrls[asset.id] ? (
                            <img src={assetUrls[asset.id]} alt={asset.name} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <ImageIcon className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                        <h4 className="font-medium text-sm mb-2">{asset.name}</h4>
                        <p className="text-xs text-gray-500 mb-3">{Math.round(asset.size / 1024)} KB</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => setPreviewAsset(asset)}>
                            <Eye className="w-3 h-3 mr-1" />Preview
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => downloadAsset(asset)}>
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => deleteAsset(asset.id)} className="text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <button 
                    onClick={() => handleFileUpload('additional')}
                    className="w-full border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-8 flex flex-col items-center justify-center hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950 transition-colors"
                  >
                    <ImageIcon className="w-16 h-16 text-green-400 mb-3" />
                    <p className="text-green-600 dark:text-green-400 font-semibold mb-1">Upload Additional Images</p>
                    <p className="text-sm text-gray-500">PNG, JPG, SVG up to 10MB</p>
                  </button>
                )}
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
                  <Button onClick={() => handleFileUpload('additional')} data-testid="button-upload-asset">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Asset
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">No assets uploaded yet</p>
                  <Button onClick={() => handleFileUpload('additional')} data-testid="button-upload-first-asset">
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
              <p>Size: {previewAsset ? `${Math.round(previewAsset.size / 1024)} KB` : ''}</p>
              <p>Uploaded: {previewAsset?.createdAt ? new Date(previewAsset.createdAt).toLocaleDateString() : ''}</p>
            </div>
            <Button onClick={() => previewAsset && downloadAsset(previewAsset)} data-testid="button-download-from-preview">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog open={!!renamingAsset} onOpenChange={() => setRenamingAsset(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Asset</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newFileName">New Filename</Label>
              <Input
                id="newFileName"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="e.g., Blueprint_Favicon.png"
              />
              <p className="text-xs text-gray-500">
                Current: {renamingAsset?.currentName}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRenamingAsset(null)}>
              Cancel
            </Button>
            <Button onClick={handleRename} disabled={!newFileName}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
