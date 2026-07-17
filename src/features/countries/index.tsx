import { useState } from "react";

import { Button, Container, Stack, Typography } from "@mui/material";

import { useAppDispatch } from "@/store/hooks";

import { addCountry } from "./countries.actions";
import { CountryAutocomplete, CountryDataGrid } from "./components/exports";
import type { CountryOption } from "./types";

export default function Countries() {
  const dispatch = useAppDispatch();

  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null,
  );

  const handleAdd = () => {
    if (!selectedCountry) {
      return;
    }

    dispatch(addCountry(selectedCountry.id));
    setSelectedCountry(null);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          Country Report
        </Typography>

        <Stack direction="row" spacing={2}>
          <CountryAutocomplete
            value={selectedCountry}
            onChange={setSelectedCountry}
          />

          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!selectedCountry}
          >
            Add
          </Button>
        </Stack>

        <CountryDataGrid />
      </Stack>
    </Container>
  );
}
