import { useState } from "react";

import { DataGrid, type GridRowModel } from "@mui/x-data-grid";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  removeCountry,
  replaceCountry,
  updateCountry,
} from "../countries.actions";
import type { CountryRow } from "../types";
import CountryReplaceDialog from "./CountryReplaceDialog";
import { getColumns } from "./columns";
import DeleteCountryDialog from "./DeleteCountryDialog";
import CountryFooter from "./DataGridFooter";

const KM2_TO_MI2 = 0.386102;

export default function CountryDataGrid() {
  const dispatch = useAppDispatch();

  const { report, reportLoading } = useAppSelector((state) => state.countries);

  const [countryToReplace, setCountryToReplace] = useState<CountryRow | null>(
    null,
  );

  const [countryToDelete, setCountryToDelete] = useState<CountryRow | null>(
    null,
  );

  const processRowUpdate = (
    newRow: GridRowModel,
    oldRow: GridRowModel,
  ): CountryRow => {
    const updatedRow = {
      ...(newRow as CountryRow),
    };

    const previousRow = oldRow as CountryRow;

    if (updatedRow.areaKm2 !== previousRow.areaKm2) {
      updatedRow.areaMi2 = Number((updatedRow.areaKm2 * KM2_TO_MI2).toFixed(2));
    } else if (updatedRow.areaMi2 !== previousRow.areaMi2) {
      updatedRow.areaKm2 = Number((updatedRow.areaMi2 / KM2_TO_MI2).toFixed(2));
    }

    dispatch(
      updateCountry({
        id: updatedRow.id,
        areaKm2: updatedRow.areaKm2,
        areaMi2: updatedRow.areaMi2,
      }),
    );

    return updatedRow;
  };

  const totalKm2 = report.reduce((sum, country) => sum + country.areaKm2, 0);

  const totalMi2 = report.reduce((sum, country) => sum + country.areaMi2, 0);

  return (
    <>
      <DataGrid
        rows={report}
        columns={getColumns({
          onCountryClick: setCountryToReplace,
          onDelete: (id) => {
            const country = report.find((item) => item.id === id);

            if (country) {
              setCountryToDelete(country);
            }
          },
        })}
        loading={reportLoading}
        editMode="row"
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10,
            },
          },
        }}
        slots={{
          footer: () => (
            <CountryFooter totalKm2={totalKm2} totalMi2={totalMi2} />
          ),
        }}
        disableRowSelectionOnClick
      />

      <CountryReplaceDialog
        open={Boolean(countryToReplace)}
        country={countryToReplace}
        onClose={() => setCountryToReplace(null)}
        onReplace={(newCode) => {
          if (!countryToReplace) {
            return;
          }

          dispatch(
            replaceCountry({
              oldId: countryToReplace.id,
              newCode,
            }),
          );

          setCountryToReplace(null);
        }}
      />
      <DeleteCountryDialog
        open={Boolean(countryToDelete)}
        countryName={countryToDelete?.name}
        onCancel={() => setCountryToDelete(null)}
        onConfirm={() => {
          if (!countryToDelete) {
            return;
          }

          dispatch(removeCountry(countryToDelete.id));

          setCountryToDelete(null);
        }}
      />
    </>
  );
}
