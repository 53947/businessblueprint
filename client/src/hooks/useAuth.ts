import { useQuery } from "@tanstack/react-query";

interface AuthResponse {
  user: any | null;
}

export function useAuth() {
  const { data, isLoading } = useQuery<AuthResponse>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  const user = data?.user ?? null;

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
