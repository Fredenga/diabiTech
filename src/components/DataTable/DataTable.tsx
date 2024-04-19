import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { rows } from "../../data";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "day",
    headerName: "Day",
    width: 130,
    editable: false,
  },
  {
    field: "min",
    headerName: "Minimum",
    width: 110,
    editable: false,
  },
  {
    field: "max",
    headerName: "Maximum",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "stdDev",
    headerName: " Variability",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 110,
  },
  {
    field: "mean",
    headerName: "Mean",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    type: "string",
    width: 110,
    editable: false,
  },
];

export default function DataTable() {
  return (
    <Box sx={{ height: 400, width: "90%" }}>
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
}
