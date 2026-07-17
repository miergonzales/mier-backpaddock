import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { GridActionsCellItem, type GridColDef } from "@mui/x-data-grid";

import type { CountryRow } from "../types";

interface GetColumnsProps {
  onCountryClick: (country: CountryRow) => void;
  onDelete: (id: string) => void;
}

export function getColumns({
  onCountryClick,
  onDelete,
}: GetColumnsProps): GridColDef<CountryRow>[] {
  return [
    {
      field: "flag",
      headerName: "Flag image",
      width: 90,
      sortable: false,
      renderCell: ({ row }) => (
        <img src={row.flagUrl} alt={row.name} width={36} />
      ),
    },
    {
      field: "name",
      headerName: "Country name",
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="text"
          sx={{ textTransform: "none" }}
          onClick={() => onCountryClick(row)}
        >
          {row.name}
        </Button>
      ),
    },
    {
      field: "areaKm2",
      headerName: "Area in km²",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "areaMi2",
      headerName: "Area in mi²",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 80,
      getActions: ({ id }) => [
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => onDelete(id as string)}
        />,
      ],
    },
  ];
}
