import { createAction } from "@reduxjs/toolkit";

import type { SearchCountriesRequest, UpdateCountryRequest } from "./types";

export const searchCountries = createAction<SearchCountriesRequest>(
  "countries/searchCountries",
);

export const addCountry = createAction<string>("countries/addCountry");

export const updateCountry = createAction<UpdateCountryRequest>(
  "countries/updateCountry",
);

export const removeCountry = createAction<string>("countries/removeCountry");

export const replaceCountry = createAction<{
  oldId: string;
  newCode: string;
}>("countries/replaceCountry");
