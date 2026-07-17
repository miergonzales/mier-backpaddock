import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  addCountry,
  replaceCountry,
  searchCountries,
  updateCountry,
} from "./countries.actions";

import type { CountryOption, CountryRow, UpdateCountryRequest } from "./types";
import { loadReport } from "@/lib/storage";

interface CountriesState {
  searchResults: CountryOption[];
  report: CountryRow[];

  searchLoading: boolean;
  reportLoading: boolean;

  error: string | null;
}

interface ReplaceCountryPayload {
  oldId: string;
  country: CountryRow;
}

const initialState: CountriesState = {
  searchResults: [],
  report: [],

  searchLoading: false,
  reportLoading: false,

  error: null,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    ...initialState,
    report: loadReport(),
  },
  reducers: {
    searchCountriesSuccess(state, action: PayloadAction<CountryOption[]>) {
      state.searchLoading = false;
      state.searchResults = action.payload;
    },

    searchCountriesFailure(state, action: PayloadAction<string>) {
      state.searchLoading = false;
      state.error = action.payload;
    },

    clearSearchResults(state) {
      state.searchResults = [];
    },

    addCountrySuccess(state, action: PayloadAction<CountryRow>) {
      state.reportLoading = false;

      const exists = state.report.some(
        (country) => country.id === action.payload.id,
      );

      if (!exists) {
        state.report.push(action.payload);
      }
    },

    addCountryFailure(state, action: PayloadAction<string>) {
      state.reportLoading = false;
      state.error = action.payload;
    },

    updateCountrySuccess(state, action: PayloadAction<UpdateCountryRequest>) {
      state.reportLoading = false;

      const country = state.report.find(
        (item) => item.id === action.payload.id,
      );

      if (!country) {
        return;
      }

      country.areaKm2 = action.payload.areaKm2;
      country.areaMi2 = action.payload.areaMi2;
    },

    updateCountryFailure(state, action: PayloadAction<string>) {
      state.reportLoading = false;
      state.error = action.payload;
    },

    removeCountry(state, action) {
      state.report = state.report.filter(
        (country) => country.id !== action.payload,
      );
    },
    replaceCountrySuccess(state, action: PayloadAction<ReplaceCountryPayload>) {
      state.reportLoading = false;

      const index = state.report.findIndex(
        (c) => c.id === action.payload.oldId,
      );

      if (index !== -1) {
        state.report[index] = action.payload.country;
      }
    },

    replaceCountryFailure(state, action: PayloadAction<string>) {
      state.reportLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCountries, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(addCountry, (state) => {
        state.reportLoading = true;
        state.error = null;
      })
      .addCase(updateCountry, (state) => {
        state.reportLoading = true;
        state.error = null;
      })
      .addCase(replaceCountry, (state) => {
        state.reportLoading = true;
        state.error = null;
      });
  },
});

export const {
  searchCountriesSuccess,
  searchCountriesFailure,
  clearSearchResults,

  addCountrySuccess,
  addCountryFailure,

  updateCountrySuccess,
  updateCountryFailure,

  replaceCountrySuccess,
  replaceCountryFailure,
} = countriesSlice.actions;

export default countriesSlice.reducer;
