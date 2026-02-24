import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Lock, Unlock, Edit, ChevronDown, ChevronRight,
  MapPin, Phone, Globe, Mail, Building2, Image, Share2, CreditCard,
} from "lucide-react";
import { HoursDisplay } from "./HoursDisplay";
import { SocialLinksDisplay } from "./SocialLinksDisplay";
import type { CanonicalBusinessProfile } from "@shared/schema";

interface ProfileViewProps {
  profile: CanonicalBusinessProfile;
  isUnlocked: boolean;
  onEditClick: () => void;
}

function CollapsibleSection({ title, icon: Icon, children, defaultOpen = false }: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 w-full py-3 px-1 hover:bg-gray-50 rounded-md transition-colors">
        {open ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
        <Icon className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-10 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ProfileView({ profile, isUnlocked, onEditClick }: ProfileViewProps) {
  const fullAddress = [
    profile.address1,
    profile.address2,
    `${profile.city}, ${profile.state} ${profile.zip}`,
    profile.country !== "US" ? profile.country : null,
  ].filter(Boolean).join(", ");

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl">{profile.businessName}</CardTitle>
            <Badge variant="secondary" className="text-xs">v{profile.dataVersion}</Badge>
          </div>
          <Button onClick={onEditClick} size="sm">
            {isUnlocked ? (
              <Unlock className="w-4 h-4 mr-2 text-green-600" />
            ) : (
              <Lock className="w-4 h-4 mr-2" />
            )}
            Edit Profile
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-1">
        {/* Core NAP - always visible */}
        <div className="grid md:grid-cols-2 gap-4 pb-4 border-b">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-sm font-medium">{fullAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-medium">{profile.phone}</p>
            </div>
          </div>
          {profile.website && (
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Website</p>
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline">
                  {profile.website}
                </a>
              </div>
            </div>
          )}
          {profile.email && (
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium">{profile.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Collapsible sections */}
        <CollapsibleSection title="Business Details" icon={Building2}>
          <div className="space-y-3 text-sm">
            {profile.description && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Description</p>
                <p className="text-gray-700">{profile.description}</p>
              </div>
            )}
            {profile.categories && profile.categories.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Categories</p>
                <div className="flex flex-wrap gap-1">
                  {profile.categories.map((cat) => (
                    <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-6">
              {profile.yearEstablished && (
                <div>
                  <p className="text-xs text-gray-500">Year Established</p>
                  <p className="font-medium">{profile.yearEstablished}</p>
                </div>
              )}
              {profile.employeeCount && (
                <div>
                  <p className="text-xs text-gray-500">Employees</p>
                  <p className="font-medium">{profile.employeeCount}</p>
                </div>
              )}
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Hours" icon={Building2}>
          <HoursDisplay hours={profile.hours as any} />
        </CollapsibleSection>

        <CollapsibleSection title="Media" icon={Image}>
          <div className="space-y-3 text-sm">
            {profile.logoUrl && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Logo</p>
                <img src={profile.logoUrl} alt="Logo" className="w-16 h-16 object-contain rounded border" />
              </div>
            )}
            {profile.coverPhotoUrl && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Cover Photo</p>
                <img src={profile.coverPhotoUrl} alt="Cover" className="w-48 h-24 object-cover rounded border" />
              </div>
            )}
            {profile.photoUrls && profile.photoUrls.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Photos ({profile.photoUrls.length})</p>
                <div className="flex flex-wrap gap-2">
                  {profile.photoUrls.map((url, i) => (
                    <img key={i} src={url} alt={`Photo ${i + 1}`} className="w-20 h-20 object-cover rounded border" />
                  ))}
                </div>
              </div>
            )}
            {!profile.logoUrl && !profile.coverPhotoUrl && (!profile.photoUrls || profile.photoUrls.length === 0) && (
              <p className="text-gray-500 italic">No media uploaded</p>
            )}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Social Links" icon={Share2}>
          <SocialLinksDisplay
            facebookUrl={profile.facebookUrl}
            instagramUrl={profile.instagramUrl}
            linkedinUrl={profile.linkedinUrl}
            twitterUrl={profile.twitterUrl}
            youtubeUrl={profile.youtubeUrl}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Additional Info" icon={CreditCard}>
          <div className="space-y-3 text-sm">
            {profile.paymentMethods && profile.paymentMethods.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Payment Methods</p>
                <div className="flex flex-wrap gap-1">
                  {profile.paymentMethods.map((m) => (
                    <Badge key={m} variant="outline" className="text-xs">{m}</Badge>
                  ))}
                </div>
              </div>
            )}
            {profile.amenities && profile.amenities.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Amenities</p>
                <div className="flex flex-wrap gap-1">
                  {profile.amenities.map((a) => (
                    <Badge key={a} variant="outline" className="text-xs">{a}</Badge>
                  ))}
                </div>
              </div>
            )}
            {profile.serviceArea != null && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Service Area</p>
                <p className="text-gray-700">{JSON.stringify(profile.serviceArea)}</p>
              </div>
            )}
            {!profile.paymentMethods?.length && !profile.amenities?.length && profile.serviceArea == null && (
              <p className="text-gray-500 italic">No additional info set</p>
            )}
          </div>
        </CollapsibleSection>
      </CardContent>
    </Card>
  );
}
