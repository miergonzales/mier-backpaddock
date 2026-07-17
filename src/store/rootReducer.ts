import { combineReducers } from "@reduxjs/toolkit";

import countriesReducer from "@/features/countries/countries.slice";

export const rootReducer = combineReducers({
  countries: countriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
