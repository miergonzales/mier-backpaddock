import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/storage", () => ({
  loadReport: () => [],
}));

import reducer, {
  addCountryFailure,
  addCountrySuccess,
  removeCountry,
  replaceCountryFailure,
  replaceCountrySuccess,
  searchCountriesFailure,
  searchCountriesSuccess,
  updateCountryFailure,
  updateCountrySuccess,
} from "../countries.slice";

import {
  addCountry,
  replaceCountry,
  searchCountries,
  updateCountry,
} from "../countries.actions";

const country = {
  id: "CAN",
  name: "Canada",
  flagUrl: "",
  areaKm2: 100,
  areaMi2: 38,
};

describe("countries.slice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts search loading", () => {
    const state = reducer(
      undefined,
      searchCountries({
        query: "can",
      }),
    );

    expect(state.searchLoading).toBe(true);
  });

  it("stores search results", () => {
    const state = reducer(
      undefined,
      searchCountriesSuccess([
        {
          id: "CAN",
          name: "Canada",
          flagUrl: "",
        },
      ]),
    );

    expect(state.searchResults).toHaveLength(1);
  });

  it("adds country", () => {
    const state = reducer(undefined, addCountrySuccess(country));

    expect(state.report).toHaveLength(1);
  });

  it("does not add duplicate country", () => {
    const first = reducer(undefined, addCountrySuccess(country));

    const second = reducer(first, addCountrySuccess(country));

    expect(second.report).toHaveLength(1);
  });

  it("updates country", () => {
    const populated = reducer(undefined, addCountrySuccess(country));

    const updated = reducer(
      populated,
      updateCountrySuccess({
        id: "CAN",
        areaKm2: 999,
        areaMi2: 385,
      }),
    );

    expect(updated.report[0].areaKm2).toBe(999);
    expect(updated.report[0].areaMi2).toBe(385);
  });

  it("removes country", () => {
    const populated = reducer(undefined, addCountrySuccess(country));

    const removed = reducer(populated, removeCountry("CAN"));

    expect(removed.report).toHaveLength(0);
  });

  it("replaces country", () => {
    const populated = reducer(undefined, addCountrySuccess(country));

    const replaced = reducer(
      populated,
      replaceCountrySuccess({
        oldId: "CAN",
        country: {
          id: "USA",
          name: "United States",
          flagUrl: "",
          areaKm2: 200,
          areaMi2: 77,
        },
      }),
    );

    expect(replaced.report[0].id).toBe("USA");
  });

  it("stores search error", () => {
    const state = reducer(undefined, searchCountriesFailure("error"));

    expect(state.error).toBe("error");
  });

  it("stores add error", () => {
    const state = reducer(undefined, addCountryFailure("error"));

    expect(state.error).toBe("error");
  });

  it("stores update error", () => {
    const state = reducer(undefined, updateCountryFailure("error"));

    expect(state.error).toBe("error");
  });

  it("stores replace error", () => {
    const state = reducer(undefined, replaceCountryFailure("error"));

    expect(state.error).toBe("error");
  });

  it("starts update loading", () => {
    const state = reducer(
      undefined,
      updateCountry({
        id: "CAN",
        areaKm2: 1,
        areaMi2: 2,
      }),
    );

    expect(state.reportLoading).toBe(true);
  });

  it("starts replace loading", () => {
    const state = reducer(
      undefined,
      replaceCountry({
        oldId: "CAN",
        newCode: "USA",
      }),
    );

    expect(state.reportLoading).toBe(true);
  });

  it("starts add loading", () => {
    const state = reducer(undefined, addCountry("CAN"));

    expect(state.reportLoading).toBe(true);
  });
});
