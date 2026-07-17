import { beforeEach, describe, expect, it, vi } from "vitest";

import { apiFetch } from "@/lib/apiFetch";

import { getCountryByCode, searchCountries } from "../countries.service";

vi.mock("@/lib/apiFetch", () => ({
  apiFetch: vi.fn(),
}));

const mockCountry = {
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
    kilometers: 100,
    miles: 38.61,
  },
};

describe("countries.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("searchCountries returns mapped options", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      data: {
        objects: [mockCountry],
      },
    });

    const result = await searchCountries({
      query: "can",
    });

    expect(apiFetch).toHaveBeenCalledWith("/countries/v5?q=can&limit=5");

    expect(result).toEqual([
      {
        id: "CAN",
        name: "Canada",
        flagUrl: "canada.svg",
      },
    ]);
  });

  it("getCountryByCode returns mapped row", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      data: {
        objects: [mockCountry],
      },
    });

    const result = await getCountryByCode("CAN");

    expect(result.areaKm2).toBe(100);
    expect(result.areaMi2).toBe(38.61);
  });

  it("throws when country is missing", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      data: {
        objects: [],
      },
    });

    await expect(getCountryByCode("CAN")).rejects.toThrow("Country not found.");
  });
});
