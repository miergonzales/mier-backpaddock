import { call, put, takeLatest } from "redux-saga/effects";

import {
  addCountry,
  replaceCountry,
  searchCountries,
  updateCountry,
} from "./countries.actions";

import {
  addCountryFailure,
  addCountrySuccess,
  replaceCountryFailure,
  replaceCountrySuccess,
  searchCountriesFailure,
  searchCountriesSuccess,
  updateCountryFailure,
  updateCountrySuccess,
} from "./countries.slice";

import {
  getCountryByCode,
  searchCountries as searchCountriesService,
} from "./countries.service";

import type { CountryOption, CountryRow } from "./types";

function* searchCountriesSaga(action: ReturnType<typeof searchCountries>) {
  try {
    const countries: CountryOption[] = yield call(
      searchCountriesService,
      action.payload,
    );

    yield put(searchCountriesSuccess(countries));
  } catch (error) {
    yield put(
      searchCountriesFailure(
        error instanceof Error ? error.message : "Failed to search countries.",
      ),
    );
  }
}

function* addCountrySaga(action: ReturnType<typeof addCountry>) {
  try {
    const country: CountryRow = yield call(getCountryByCode, action.payload);

    yield put(addCountrySuccess(country));
  } catch (error) {
    yield put(
      addCountryFailure(
        error instanceof Error ? error.message : "Failed to add country.",
      ),
    );
  }
}

function* updateCountrySaga(action: ReturnType<typeof updateCountry>) {
  try {
    yield put(updateCountrySuccess(action.payload));
  } catch (error) {
    yield put(
      updateCountryFailure(
        error instanceof Error ? error.message : "Failed to update country.",
      ),
    );
  }
}

function* replaceCountrySaga(action: ReturnType<typeof replaceCountry>) {
  try {
    const country: CountryRow = yield call(
      getCountryByCode,
      action.payload.newCode,
    );

    yield put(
      replaceCountrySuccess({
        oldId: action.payload.oldId,
        country,
      }),
    );
  } catch (error) {
    yield put(
      replaceCountryFailure(
        error instanceof Error ? error.message : "Failed to replace country.",
      ),
    );
  }
}

export function* countriesSaga() {
  yield takeLatest(searchCountries.type, searchCountriesSaga);

  yield takeLatest(addCountry.type, addCountrySaga);

  yield takeLatest(updateCountry.type, updateCountrySaga);

  yield takeLatest(replaceCountry.type, replaceCountrySaga);
}
