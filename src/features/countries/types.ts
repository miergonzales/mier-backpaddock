export interface CountryOption {
  id: string;
  name: string;
  flagUrl: string;
}

export interface CountryRow extends CountryOption {
  areaKm2: number;
  areaMi2: number;
}

export interface SearchCountriesRequest {
  query: string;
}

export interface UpdateCountryRequest {
  id: string;
  areaKm2: number;
  areaMi2: number;
}

export interface ReplaceCountryRequest {
  oldId: string;
  newCode: string;
}
