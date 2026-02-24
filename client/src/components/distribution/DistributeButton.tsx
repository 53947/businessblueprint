import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

interface DistributeButtonProps {
  clientId: string;
  targetSlugs?: string[];
  label?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function DistributeButton({
  clientId,
  targetSlugs,
  label = "Distribute",
  variant = "default",
  size = "default",
}: DistributeButtonProps) {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      const body = targetSlugs ? { targetSlugs } : undefined;
      const res = await apiRequest("POST", `/api/clients/${clientId}/distribution/distribute`, body);
      return res.json();
    },
    onSuccess: (data) => {
      const total = data.results?.length || 0;
      const succeeded = data.results?.filter((r: any) => r.success).length || 0;
      toast({
        title: "Distribution Complete",
        description: `${succeeded}/${total} targets processed successfully`,
      });
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/distribution/submissions`] });
      queryClient.invalidateQueries({ queryKey: [`/api/clients/${clientId}/distribution/status`] });
    },
    onError: (error: any) => {
      toast({
        title: "Distribution Failed",
        description: error.message || "Failed to distribute listings",
        variant: "destructive",
      });
    },
  });

  return (
    <Button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      variant={variant}
      size={size}
    >
      {mutation.isPending ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Send className="w-4 h-4 mr-2" />
      )}
      {mutation.isPending ? "Distributing..." : label}
    </Button>
  );
}
