import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#E9ECF0]">
      <Header showNavigation={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#09080E] mb-4 font-['Archivo_Semi_Expanded',sans-serif]">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600">
            We're here to help. Reach out anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#064A6C]" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Tell us about your business and digital goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@business.com" />
              </div>

              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Your Business Name" />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your digital marketing goals..."
                  rows={4}
                />
              </div>

              <Button className="w-full bg-[#09080E] text-white hover:bg-[#09080E]/80">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Multiple ways to reach our team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-[#064A6C] mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">contact@businessblueprint.io</p>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-[#064A6C] mt-1" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">+1 (575) 201-3515</p>
                    <p className="text-sm text-gray-500">Mon-Sat 8am-5pm MST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-[#064A6C] mt-1" />
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-gray-600">Remote - businessblueprint.io</p>
                    <p className="text-sm text-gray-500">Serving businesses worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#E9ECF0] border-[#064A6C]/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  Start with a Free Assessment
                </h3>
                <p className="text-gray-600 mb-4">
                  Not ready to talk? Get your Digital IQ Score first.
                </p>
                <Button
                  className="bg-[#09080E] text-white hover:bg-[#09080E]/80"
                  onClick={() => window.location.href = '/assessment'}
                  data-testid="btn-take-assessment"
                >
                  Take Free Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
