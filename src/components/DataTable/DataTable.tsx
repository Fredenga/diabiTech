import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DataContext } from "../../context/dataContext";
import { calculateDailySummary } from "../../math/dailySummary";

export default function DataTable() {
  const { data } = React.useContext(DataContext);
  const [totals, setTotals] = React.useState<Totals[]>([]);
  const columns: GridColDef<(typeof totals)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "date",
      headerName: "Date",
      width: 130,
      editable: false
    },
    {
      field: "min",
      headerName: "Minimum",
      width: 110,
      editable: false
    },
    {
      field: "max",
      headerName: "Maximum",
      type: "number",
      width: 110,
      editable: true
    },
    {
      field: "std_dev",
      headerName: " Variability",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 110
    },
    {
      field: "mean",
      headerName: "Mean",
      type: "number",
      width: 110,
      editable: false
    }
  ];
  interface Totals {
    date: string;
    min: number;
    max: number;
    mean: number;
    std_dev: number;
    id: number;
  }

  React.useEffect(() => {
    const vals = calculateDailySummary(data);
    let count = 0;
    function getTotals() {
      let final: any[] = [];
      vals.forEach((val) => {
        final.push({ id: count++, ...val });
      });
      setTotals(final);
    }
    getTotals();
  }, []);

  return (
    <Box sx={{ height: 400, width: "90%" }}>
      {totals.length > 0 && (
        <DataGrid
          className="dataGrid"
          columns={columns}
          rows={totals}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7
              }
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }
            }
          }}
        />
      )}
    </Box>
  );
}
