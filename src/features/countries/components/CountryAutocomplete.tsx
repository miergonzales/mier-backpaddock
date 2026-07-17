import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { searchCountries } from "../countries.actions";
import type { CountryOption } from "../types";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

const SEARCH_DELAY = 400;

interface CountryAutocompleteProps {
  value: CountryOption | null;
  onChange: (country: CountryOption | null) => void;

  filterExisting?: boolean;
}

export default function CountryAutocomplete({
  value,
  onChange,
  filterExisting = true,
}: CountryAutocompleteProps) {
  const dispatch = useAppDispatch();

  const { searchResults, searchLoading, report } = useAppSelector(
    (state) => state.countries,
  );

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const query = inputValue.trim();

    if (!query) {
      return;
    }

    const timeout = window.setTimeout(() => {
      dispatch(
        searchCountries({
          query,
        }),
      );
    }, SEARCH_DELAY);

    return () => window.clearTimeout(timeout);
  }, [dispatch, inputValue]);

  const availableCountries = useMemo(() => {
    if (!filterExisting) {
      return searchResults;
    }

    const existingIds = new Set(report.map((country) => country.id));

    return searchResults.filter((country) => !existingIds.has(country.id));
  }, [filterExisting, report, searchResults]);

  return (
    <Autocomplete
      fullWidth
      options={availableCountries}
      value={value}
      inputValue={inputValue}
      loading={searchLoading}
      loadingText="Searching countries..."
      noOptionsText="No countries found"
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, selected) => option.id === selected.id}
      onChange={(_, country) => {
        onChange(country);
      }}
      onInputChange={(_, value) => {
        setInputValue(value);
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            component="img"
            src={option.flagUrl}
            alt={option.name}
            sx={{
              width: 28,
              height: 18,
              objectFit: "cover",
              borderRadius: 0.5,
              border: 1,
              borderColor: "divider",
            }}
          />
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country"
          placeholder="Search country..."
        />
      )}
    />
  );
}
