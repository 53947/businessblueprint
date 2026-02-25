import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import type { CanonicalBusinessProfile } from "@shared/schema";

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CanonicalBusinessProfile;
  clientId: string;
  unlockToken: string;
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAY_LABELS: Record<string, string> = {
  monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday",
  friday: "Friday", saturday: "Saturday", sunday: "Sunday",
};

export function ProfileEditDialog({ open, onOpenChange, profile, clientId, unlockToken }: ProfileEditDialogProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("nap");

  // Form state
  const [form, setForm] = useState({
    businessName: profile.businessName,
    address1: profile.address1,
    address2: profile.address2 || "",
    city: profile.city,
    state: profile.state,
    zip: profile.zip,
    country: profile.country,
    phone: profile.phone,
    website: profile.website || "",
    email: profile.email || "",
    fax: profile.fax || "",
    categories: (profile.categories || []).join(", "),
    description: profile.description || "",
    shortDescription: profile.shortDescription || "",
    yearEstablished: profile.yearEstablished?.toString() || "",
    employeeCount: profile.employeeCount?.toString() || "",
    hours: (profile.hours as any) || {},
    logoUrl: profile.logoUrl || "",
    coverPhotoUrl: profile.coverPhotoUrl || "",
    photoUrls: (profile.photoUrls || []).join("\n"),
    facebookUrl: profile.facebookUrl || "",
    instagramUrl: profile.instagramUrl || "",
    linkedinUrl: profile.linkedinUrl || "",
    twitterUrl: profile.twitterUrl || "",
    youtubeUrl: profile.youtubeUrl || "",
    paymentMethods: (profile.paymentMethods || []).join(", "),
    amenities: (profile.amenities || []).join(", "),
    serviceArea: profile.serviceArea ? JSON.stringify(profile.serviceArea) : "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateHours = (day: string, field: "open" | "close", value: string) => {
    setForm((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: { ...(prev.hours[day] || { open: "", close: "" }), [field]: value },
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Record<string, any> = {
        businessName: form.businessName,
        address1: form.address1,
        address2: form.address2 || null,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
        phone: form.phone,
        website: form.website || null,
        email: form.email || null,
        fax: form.fax || null,
        categories: form.categories ? form.categories.split(",").map((s) => s.trim()).filter(Boolean) : null,
        description: form.description || null,
        shortDescription: form.shortDescription || null,
        yearEstablished: form.yearEstablished ? parseInt(form.yearEstablished) : null,
        employeeCount: form.employeeCount ? parseInt(form.employeeCount) : null,
        hours: Object.keys(form.hours).length > 0 ? form.hours : null,
        logoUrl: form.logoUrl || null,
        coverPhotoUrl: form.coverPhotoUrl || null,
        photoUrls: form.photoUrls ? form.photoUrls.split("\n").map((s) => s.trim()).filter(Boolean) : null,
        facebookUrl: form.facebookUrl || null,
        instagramUrl: form.instagramUrl || null,
        linkedinUrl: form.linkedinUrl || null,
        twitterUrl: form.twitterUrl || null,
        youtubeUrl: form.youtubeUrl || null,
        paymentMethods: form.paymentMethods ? form.paymentMethods.split(",").map((s) => s.trim()).filter(Boolean) : null,
        amenities: form.amenities ? form.amenities.split(",").map((s) => s.trim()).filter(Boolean) : null,
        serviceArea: form.serviceArea ? JSON.parse(form.serviceArea) : null,
      };

      const res = await fetch(`/api/clients/${clientId}/distribution/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Profile-Unlock-Token": unlockToken,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update profile");
      }

      toast({ title: "Profile Updated", description: "Your business profile has been saved. Resyncs flagged." });
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/distribution/profile`] });
      onOpenChange(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Business Profile</DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="nap">NAP</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="extra">Extra</TabsTrigger>
          </TabsList>

          <TabsContent value="nap" className="space-y-4 mt-4">
            <div>
              <Label>Business Name</Label>
              <Input value={form.businessName} onChange={(e) => updateField("businessName", e.target.value)} />
            </div>
            <div>
              <Label>Address Line 1</Label>
              <Input value={form.address1} onChange={(e) => updateField("address1", e.target.value)} />
            </div>
            <div>
              <Label>Address Line 2</Label>
              <Input value={form.address2} onChange={(e) => updateField("address2", e.target.value)} placeholder="Suite, Unit, etc." />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>City</Label>
                <Input value={form.city} onChange={(e) => updateField("city", e.target.value)} />
              </div>
              <div>
                <Label>State</Label>
                <Input value={form.state} onChange={(e) => updateField("state", e.target.value)} />
              </div>
              <div>
                <Label>ZIP</Label>
                <Input value={form.zip} onChange={(e) => updateField("zip", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
              </div>
              <div>
                <Label>Fax</Label>
                <Input value={form.fax} onChange={(e) => updateField("fax", e.target.value)} placeholder="Optional" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Website</Label>
                <Input value={form.website} onChange={(e) => updateField("website", e.target.value)} placeholder="https://" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={form.email} onChange={(e) => updateField("email", e.target.value)} type="email" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div>
              <Label>Categories (comma-separated)</Label>
              <Input value={form.categories} onChange={(e) => updateField("categories", e.target.value)} placeholder="Restaurant, Italian, Fine Dining" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={4} />
            </div>
            <div>
              <Label>Short Description (max 255 chars)</Label>
              <Input value={form.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} maxLength={255} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Year Established</Label>
                <Input value={form.yearEstablished} onChange={(e) => updateField("yearEstablished", e.target.value)} type="number" placeholder="2010" />
              </div>
              <div>
                <Label>Employee Count</Label>
                <Input value={form.employeeCount} onChange={(e) => updateField("employeeCount", e.target.value)} type="number" placeholder="25" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hours" className="space-y-3 mt-4">
            <p className="text-sm text-gray-500">Set your business hours for each day of the week.</p>
            {DAYS.map((day) => {
              const entry = form.hours[day] || { open: "", close: "" };
              return (
                <div key={day} className="grid grid-cols-[120px_1fr_1fr] gap-3 items-center">
                  <Label className="font-medium">{DAY_LABELS[day]}</Label>
                  <Input
                    type="time"
                    value={entry.open}
                    onChange={(e) => updateHours(day, "open", e.target.value)}
                    placeholder="Open"
                  />
                  <Input
                    type="time"
                    value={entry.close}
                    onChange={(e) => updateHours(day, "close", e.target.value)}
                    placeholder="Close"
                  />
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="media" className="space-y-4 mt-4">
            <div>
              <Label>Logo URL</Label>
              <Input value={form.logoUrl} onChange={(e) => updateField("logoUrl", e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <Label>Cover Photo URL</Label>
              <Input value={form.coverPhotoUrl} onChange={(e) => updateField("coverPhotoUrl", e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <Label>Photo URLs (one per line)</Label>
              <Textarea value={form.photoUrls} onChange={(e) => updateField("photoUrls", e.target.value)} rows={4} placeholder="https://...\nhttps://..." />
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4 mt-4">
            <div>
              <Label>Facebook URL</Label>
              <Input value={form.facebookUrl} onChange={(e) => updateField("facebookUrl", e.target.value)} placeholder="https://facebook.com/..." />
            </div>
            <div>
              <Label>Instagram URL</Label>
              <Input value={form.instagramUrl} onChange={(e) => updateField("instagramUrl", e.target.value)} placeholder="https://instagram.com/..." />
            </div>
            <div>
              <Label>LinkedIn URL</Label>
              <Input value={form.linkedinUrl} onChange={(e) => updateField("linkedinUrl", e.target.value)} placeholder="https://linkedin.com/..." />
            </div>
            <div>
              <Label>X / Twitter URL</Label>
              <Input value={form.twitterUrl} onChange={(e) => updateField("twitterUrl", e.target.value)} placeholder="https://x.com/..." />
            </div>
            <div>
              <Label>YouTube URL</Label>
              <Input value={form.youtubeUrl} onChange={(e) => updateField("youtubeUrl", e.target.value)} placeholder="https://youtube.com/..." />
            </div>
          </TabsContent>

          <TabsContent value="extra" className="space-y-4 mt-4">
            <div>
              <Label>Payment Methods (comma-separated)</Label>
              <Input value={form.paymentMethods} onChange={(e) => updateField("paymentMethods", e.target.value)} placeholder="Visa, Mastercard, Cash, Apple Pay" />
            </div>
            <div>
              <Label>Amenities (comma-separated)</Label>
              <Input value={form.amenities} onChange={(e) => updateField("amenities", e.target.value)} placeholder="WiFi, Parking, Wheelchair Access" />
            </div>
            <div>
              <Label>Service Area (JSON)</Label>
              <Textarea value={form.serviceArea} onChange={(e) => updateField("serviceArea", e.target.value)} rows={3} placeholder='{"radius": "25mi", "cities": ["Austin", "Round Rock"]}' />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
