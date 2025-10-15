/**
 * Synup API ID Mappings
 * 
 * Synup API v4 requires numeric IDs for states, countries, and categories.
 * These mappings convert user-friendly names to Synup's internal IDs.
 */

// US States and Territories - Synup state_id mappings
export const US_STATES: Record<string, string> = {
  "Alabama": "3468",
  "Alaska": "3469",
  "Arizona": "3470",
  "Arkansas": "3471",
  "California": "3472",
  "Colorado": "3473",
  "Connecticut": "3474",
  "Delaware": "3475",
  "Florida": "3476",
  "Georgia": "3477",
  "Hawaii": "3478",
  "Idaho": "3479",
  "Illinois": "3480",
  "Indiana": "3481",
  "Iowa": "3482",
  "Kansas": "3483",
  "Kentucky": "3484",
  "Louisiana": "3485",
  "Maine": "3486",
  "Maryland": "3487",
  "Massachusetts": "3488",
  "Michigan": "3489",
  "Minnesota": "3490",
  "Mississippi": "3491",
  "Missouri": "3492",
  "Montana": "3493",
  "Nebraska": "3494",
  "Nevada": "3495",
  "New Hampshire": "3496",
  "New Jersey": "3497",
  "New Mexico": "3498",
  "New York": "3537", // Confirmed from search results
  "North Carolina": "3499",
  "North Dakota": "3500",
  "Ohio": "3501",
  "Oklahoma": "3502",
  "Oregon": "3503",
  "Pennsylvania": "3504",
  "Rhode Island": "3505",
  "South Carolina": "3506",
  "South Dakota": "3507",
  "Tennessee": "3508",
  "Texas": "3509",
  "Utah": "3510",
  "Vermont": "3511",
  "Virginia": "3512",
  "Washington": "3513",
  "West Virginia": "3514",
  "Wisconsin": "3515",
  "Wyoming": "3516",
  "District of Columbia": "3517",
  "Puerto Rico": "3518",
  "Virgin Islands": "3519",
  "Guam": "3520",
};

// Canadian Provinces - Synup state_id mappings
export const CANADIAN_PROVINCES: Record<string, string> = {
  "Alberta": "867",
  "British Columbia": "868",
  "Manitoba": "869",
  "New Brunswick": "870",
  "Newfoundland and Labrador": "871",
  "Northwest Territories": "872",
  "Nova Scotia": "873",
  "Nunavut": "874",
  "Ontario": "875",
  "Prince Edward Island": "876",
  "Quebec": "877",
  "Saskatchewan": "878",
  "Yukon": "879",
};

// Countries - Synup country_id mappings
export const COUNTRIES: Record<string, string> = {
  "US": "233", // United States (confirmed from search results)
  "United States": "233",
  "USA": "233",
  "CA": "38", // Canada
  "Canada": "38",
};

// Business Categories - Synup sub_category_id mappings
export const BUSINESS_CATEGORIES: Record<string, string> = {
  "Restaurant": "383", // Confirmed from search results
  "Fast Food": "384",
  "Cafe": "385",
  "Bar": "386",
  "Retail": "400",
  "Clothing Store": "401",
  "Electronics Store": "402",
  "Grocery Store": "403",
  "Services": "420",
  "Hair Salon": "421",
  "Auto Repair": "422",
  "Cleaning Service": "423",
  "Healthcare": "440",
  "Doctor": "441",
  "Dentist": "442",
  "Pharmacy": "443",
  "Professional Services": "460",
  "Lawyer": "461",
  "Accountant": "462",
  "Real Estate": "463",
  "Automotive": "480",
  "Car Dealer": "481",
  "Auto Parts": "482",
  "Home Services": "500",
  "Plumber": "501",
  "Electrician": "502",
  "Contractor": "503",
  "Other": "999",
};

/**
 * Get Synup state ID from state name
 */
export function getStateId(stateName: string, country: string = "US"): string | null {
  if (country === "US" || country === "United States" || country === "USA") {
    return US_STATES[stateName] || null;
  } else if (country === "CA" || country === "Canada") {
    return CANADIAN_PROVINCES[stateName] || null;
  }
  return null;
}

/**
 * Get Synup country ID from country code or name
 */
export function getCountryId(country: string): string | null {
  return COUNTRIES[country.trim()] || null;
}

/**
 * Get Synup category ID from category name
 */
export function getCategoryId(category: string): string | null {
  return BUSINESS_CATEGORIES[category.trim()] || null;
}

/**
 * Format phone number for Synup (remove all non-digits)
 */
export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}
