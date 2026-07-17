import type { CountryOption, CountryRow } from "../types";

export interface RestCountry {
  codes: {
    alpha_3: string;
  };
  names: {
    common: string;
  };
  flag: {
    url_svg: string;
    url_png: string;
  };
  area: {
    kilometers: number;
    miles: number;
  };
}

export function toCountryOption(country: RestCountry): CountryOption {
  return {
    id: country.codes.alpha_3,
    name: country.names.common,
    flagUrl: country.flag.url_svg || country.flag.url_png,
  };
}

export function toCountryRow(country: RestCountry): CountryRow {
  return {
    id: country.codes.alpha_3,
    name: country.names.common,
    flagUrl: country.flag.url_svg || country.flag.url_png,
    areaKm2: country.area.kilometers,
    areaMi2: country.area.miles,
  };
}
