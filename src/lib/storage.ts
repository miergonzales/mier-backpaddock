import type { CountryRow } from "@/features/countries/types";

const STORAGE_KEY = "countries-report";

export function loadReport(): CountryRow[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveReport(report: CountryRow[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(report));
}
