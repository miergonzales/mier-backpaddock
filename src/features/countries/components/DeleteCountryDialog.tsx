import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface DeleteCountryDialogProps {
  open: boolean;
  countryName?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const COUNTDOWN_SECONDS = 3;

export default function DeleteCountryDialog({
  open,
  countryName,
  onCancel,
  onConfirm,
}: DeleteCountryDialogProps) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (!open) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSecondsLeft(COUNTDOWN_SECONDS);

    const timer = window.setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [open]);

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Country</DialogTitle>

      <DialogContent>
        <Typography gutterBottom>
          Are you sure you want to remove <strong>{countryName}</strong>?
        </Typography>

        <Typography color="warning.main">
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>

        <Button
          color="error"
          variant="contained"
          disabled={secondsLeft > 0}
          onClick={onConfirm}
        >
          {secondsLeft > 0 ? `Delete (${secondsLeft})` : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
