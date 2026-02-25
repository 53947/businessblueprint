import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, ShieldCheck } from "lucide-react";

interface PinGateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  mode: "create" | "enter";
  onUnlocked: (token: string) => void;
}

export function PinGateDialog({ open, onOpenChange, clientId, mode, onUnlocked }: PinGateDialogProps) {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState<"enter" | "confirm">(mode === "create" ? "enter" : "enter");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = useCallback(() => {
    setPin("");
    setConfirmPin("");
    setStep("enter");
    setError("");
    setLoading(false);
  }, []);

  const handleOpenChange = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const submitVerify = async (pinValue: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/clients/${clientId}/distribution/profile/verify-pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinValue }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid PIN");
        setPin("");
        setLoading(false);
        return;
      }
      onUnlocked(data.unlockToken);
      handleOpenChange(false);
    } catch {
      setError("Failed to verify PIN");
      setLoading(false);
    }
  };

  const submitCreate = async (pinValue: string) => {
    setLoading(true);
    setError("");
    try {
      // Set PIN
      const setRes = await fetch(`/api/clients/${clientId}/distribution/profile/set-pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinValue }),
      });
      if (!setRes.ok) {
        const data = await setRes.json();
        setError(data.error || "Failed to set PIN");
        setLoading(false);
        return;
      }
      // Now verify to get token
      await submitVerify(pinValue);
    } catch {
      setError("Failed to create PIN");
      setLoading(false);
    }
  };

  const handlePinComplete = (value: string) => {
    if (mode === "enter") {
      submitVerify(value);
      return;
    }
    // Create mode
    if (step === "enter") {
      setPin(value);
      setStep("confirm");
      setConfirmPin("");
    } else {
      if (value !== pin) {
        setError("PINs do not match");
        setConfirmPin("");
        return;
      }
      submitCreate(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === "create" ? (
              <>
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Create Edit PIN
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 text-amber-600" />
                Enter Edit PIN
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? step === "enter"
                ? "Set a 4-digit PIN to protect your business profile from accidental edits."
                : "Confirm your PIN by entering it again."
              : "Enter your 4-digit PIN to unlock profile editing for 15 minutes."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          {loading ? (
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          ) : (
            <InputOTP
              maxLength={4}
              value={step === "confirm" ? confirmPin : pin}
              onChange={(val) => {
                setError("");
                if (step === "confirm") {
                  setConfirmPin(val);
                } else {
                  setPin(val);
                }
              }}
              onComplete={handlePinComplete}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          {mode === "create" && step === "confirm" && (
            <Button variant="ghost" size="sm" onClick={() => { setStep("enter"); setPin(""); setConfirmPin(""); setError(""); }}>
              Start over
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
