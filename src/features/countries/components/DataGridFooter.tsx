import { GridFooterContainer, GridPagination } from "@mui/x-data-grid";

interface CountryFooterProps {
  totalKm2: number;
  totalMi2: number;
}

export default function CountryFooter({
  totalKm2,
  totalMi2,
}: CountryFooterProps) {
  return (
    <GridFooterContainer
      sx={{
        px: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <strong>
        Total Area:{" "}
        {totalKm2.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}{" "}
        km² |{" "}
        {totalMi2.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}{" "}
        mi²
      </strong>

      <GridPagination />
    </GridFooterContainer>
  );
}
