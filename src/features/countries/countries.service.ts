import { apiFetch } from "@/lib/apiFetch";

import {
  toCountryOption,
  toCountryRow,
  type RestCountry,
} from "./utils/country.mapper";

import type {
  CountryOption,
  CountryRow,
  SearchCountriesRequest,
} from "./types";

const ENDPOINT = "/countries/v5";

interface SearchCountriesResponse {
  data: {
    objects: RestCountry[];
  };
}
export async function searchCountries({
  query,
}: SearchCountriesRequest): Promise<CountryOption[]> {
  const response = await apiFetch<SearchCountriesResponse>(
    `${ENDPOINT}?q=${encodeURIComponent(query)}&limit=5`,
  );

  return response.data.objects.map(toCountryOption);
}

export async function getCountryByCode(code: string): Promise<CountryRow> {
  const response = await apiFetch<SearchCountriesResponse>(
    `${ENDPOINT}/codes.alpha_3/${encodeURIComponent(code)}`,
  );

  const country = response.data.objects.find(
    (item) => item.codes.alpha_3 === code,
  );

  if (!country) {
    throw new Error("Country not found.");
  }

  return toCountryRow(country);
}
