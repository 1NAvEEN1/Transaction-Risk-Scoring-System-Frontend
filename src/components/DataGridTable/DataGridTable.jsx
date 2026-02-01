import React from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function DefaultNoRowsOverlay({ text = "No records found" }) {
  return (
    <Box sx={{ py: 6, px: 2, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}

DefaultNoRowsOverlay.propTypes = {
  text: PropTypes.string,
};

/**
 * Reusable table wrapper around MUI X DataGrid.
 *
 * Usage:
 * <DataGridTable dataGridProps={{ rows, columns, paginationModel, onPaginationModelChange, ... }} />
 */
export default function DataGridTable({
  dataGridProps,
  boxSx,
  noRowsText,
  noResultsText,
}) {
  const {
    rows = [],
    columns = [],
    autoHeight = false,
    pagination = true,
    disableRowSelectionOnClick = true,
    pageSizeOptions = [5, 10, 25, 50],
    slots,
    slotProps,
    sx,
    ...rest
  } = dataGridProps ?? {};

  const mergedSlots = {
    noRowsOverlay: () => (
      <DefaultNoRowsOverlay text={noRowsText ?? "No records found"} />
    ),
    noResultsOverlay: () => (
      <DefaultNoRowsOverlay text={noResultsText ?? "No matching records"} />
    ),
    ...slots,
  };

  return (
    <Box
      sx={{
        width: "100%",
        ...boxSx,
        border: "1px solid #e0e0e0",
        borderRadius: 1,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={autoHeight}
        pagination={pagination}
        density="compact"
        pageSizeOptions={pageSizeOptions}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableColumnSorting={true}
        slots={mergedSlots}
        slotProps={slotProps}
        sx={{
          ...sx,
          borderRadius: 1,
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
          "& .MuiDataGrid-row": {
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#f8fbfb",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#e5edee",
            fontWeight: 600,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
          },
          "& .MuiTablePagination-root": {
            backgroundColor: "grey.200",
            // borderTop: "1.5px solid #e0e0e0",
            overflow: "hidden",
            height: "40px",
            minHeight: "40px",
          },
          "& .MuiDataGrid-footerContainer": {
            height: "40px",
            minHeight: "40px",
          },
          "& .MuiTablePagination-displayedRows, & .MuiTablePagination-actions, & .MuiTablePagination-selectLabel":
            {
              mt: -3,
            },
          "& .MuiTablePagination-select": {
            mt: -2.5,
            pt: 1.5,
            fontSize: "0.875rem",
          },
        }}
        {...rest}
      />
    </Box>
  );
}

DataGridTable.propTypes = {
  dataGridProps: PropTypes.shape({
    rows: PropTypes.array,
    columns: PropTypes.array,
    autoHeight: PropTypes.bool,
    pagination: PropTypes.bool,
    disableRowSelectionOnClick: PropTypes.bool,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    paginationModel: PropTypes.shape({
      page: PropTypes.number,
      pageSize: PropTypes.number,
    }),
    onPaginationModelChange: PropTypes.func,
    rowCount: PropTypes.number,
    paginationMode: PropTypes.oneOf(['client', 'server']),
    loading: PropTypes.bool,
    onRowClick: PropTypes.func,
    slots: PropTypes.object,
    slotProps: PropTypes.object,
    sx: PropTypes.object,
  }),
  boxSx: PropTypes.object,
  noRowsText: PropTypes.string,
  noResultsText: PropTypes.string,
};
