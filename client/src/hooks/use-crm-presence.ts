import { useQuery } from "@tanstack/react-query";

export type CrmPresenceState = "unauthenticated" | "loading" | "error" | "empty" | "ready";

interface CrmContact {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  companyId?: number;
  tags?: string[];
  [key: string]: any;
}

interface CrmCompany {
  id: number;
  name: string;
  [key: string]: any;
}

interface CrmSegment {
  id: number;
  name: string;
  memberCount?: number;
  [key: string]: any;
}

interface UseCrmPresenceResult {
  state: CrmPresenceState;
  contacts: CrmContact[];
  companies: CrmCompany[];
  segments: CrmSegment[];
  contactsCount: number;
  companiesCount: number;
  segmentsCount: number;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useCrmPresence(): UseCrmPresenceResult {
  const clientId = typeof window !== 'undefined' ? sessionStorage.getItem("clientId") : null;
  const isAuthenticated = !!clientId;
  
  const { 
    data: contacts = [], 
    isLoading: contactsLoading, 
    isError: contactsError,
    isSuccess: contactsSuccess 
  } = useQuery<CrmContact[]>({
    queryKey: ['/api/crm/contacts'],
    enabled: isAuthenticated,
    retry: false,
  });

  const { 
    data: companies = [], 
    isLoading: companiesLoading,
    isError: companiesError,
    isSuccess: companiesSuccess 
  } = useQuery<CrmCompany[]>({
    queryKey: ['/api/crm/companies'],
    enabled: isAuthenticated,
    retry: false,
  });

  const { 
    data: segmentsData, 
    isLoading: segmentsLoading,
    isError: segmentsError,
    isSuccess: segmentsSuccess 
  } = useQuery<{ segments: CrmSegment[] }>({
    queryKey: ['/api/crm/integration/segments'],
    enabled: isAuthenticated,
    retry: false,
  });

  const segments = segmentsData?.segments || [];
  const contactsCount = contacts?.length || 0;
  const companiesCount = companies?.length || 0;
  const segmentsCount = segments?.length || 0;
  
  const isLoading = contactsLoading || companiesLoading || segmentsLoading;
  const hasError = contactsError || companiesError || segmentsError;
  const allSuccess = contactsSuccess && companiesSuccess && segmentsSuccess;
  const hasAnyData = contactsCount > 0 || companiesCount > 0 || segmentsCount > 0;

  let state: CrmPresenceState;
  
  if (!isAuthenticated) {
    state = "unauthenticated";
  } else if (isLoading) {
    state = "loading";
  } else if (hasError) {
    state = "error";
  } else if (allSuccess && !hasAnyData) {
    state = "empty";
  } else if (allSuccess && hasAnyData) {
    state = "ready";
  } else {
    // Fallback while queries settle
    state = "loading";
  }

  return {
    state,
    contacts,
    companies,
    segments,
    contactsCount,
    companiesCount,
    segmentsCount,
    isLoading,
    isAuthenticated,
  };
}
