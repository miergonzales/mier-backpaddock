import { describe, expect, it } from "vitest";

import {
  toCountryOption,
  toCountryRow,
  type RestCountry,
} from "../utils/country.mapper";

const mockCountry: RestCountry = {
  codes: {
    alpha_3: "CAN",
  },
  names: {
    common: "Canada",
  },
  flag: {
    url_svg: "canada.svg",
    url_png: "canada.png",
  },
  area: {
    kilometers: 9984670,
    miles: 3855101.1,
  },
};

describe("country.mapper", () => {
  it("maps RestCountry to CountryOption", () => {
    expect(toCountryOption(mockCountry)).toEqual({
      id: "CAN",
      name: "Canada",
      flagUrl: "canada.svg",
    });
  });

  it("uses png when svg is empty", () => {
    expect(
      toCountryOption({
        ...mockCountry,
        flag: {
          url_svg: "",
          url_png: "fallback.png",
        },
      }),
    ).toEqual({
      id: "CAN",
      name: "Canada",
      flagUrl: "fallback.png",
    });
  });

  it("maps RestCountry to CountryRow", () => {
    expect(toCountryRow(mockCountry)).toEqual({
      id: "CAN",
      name: "Canada",
      flagUrl: "canada.svg",
      areaKm2: 9984670,
      areaMi2: 3855101.1,
    });
  });
});
