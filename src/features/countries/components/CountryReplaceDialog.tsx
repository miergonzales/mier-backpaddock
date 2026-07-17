import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import CountryAutocomplete from "./CountryAutocomplete";

import type { CountryOption, CountryRow } from "../types";

interface CountryReplaceDialogProps {
  open: boolean;
  country: CountryRow | null;
  onClose: () => void;
  onReplace: (newCountryCode: string) => void;
}

export default function CountryReplaceDialog({
  open,
  country,
  onClose,
  onReplace,
}: CountryReplaceDialogProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null,
  );

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCountry(null);
    }
  }, [open]);

  const handleReplace = () => {
    if (!selectedCountry) {
      return;
    }

    if (selectedCountry.id === country?.id) {
      onClose();
      return;
    }

    onReplace(selectedCountry.id);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Replace Country</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Replace <strong>{country?.name}</strong> with another country.
        </Typography>

        <CountryAutocomplete
          value={selectedCountry}
          onChange={setSelectedCountry}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          disabled={!selectedCountry}
          onClick={handleReplace}
        >
          Replace
        </Button>
      </DialogActions>
    </Dialog>
  );
}
