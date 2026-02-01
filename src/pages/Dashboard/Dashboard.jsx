import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import PageHeader from "../../components/PageHeader/PageHeader";
import StatusChip from "../../components/StatusChip/StatusChip";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import DataGridTable from "../../components/DataGridTable/DataGridTable";
import TransactionDetailsDialog from "../TransactionDetails/TransactionDetailsDialog";
import {
  fetchTransactions,
  setStatusFilter,
  setPage,
  setSize,
} from "../../reducers/transactionsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list, page, size, totalElements, statusFilter, loading, error } =
    useSelector((state) => state.transactions);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  useEffect(() => {
    dispatch(fetchTransactions({ page, size, status: statusFilter }));
  }, [dispatch, page, size, statusFilter]);

  const handleStatusFilterChange = (event) => {
    dispatch(setStatusFilter(event.target.value));
  };

  const handleRowClick = (id) => {
    setSelectedTransactionId(id);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedTransactionId(null);
  };

  const formatAmount = (amount, currency) => {
    return `${currency} ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRiskScoreColor = (score) => {
    if (score >= 70) return "error.main";
    if (score >= 40) return "warning.main";
    return "success.main";
  };

  const columns = [
    {
      field: "id",
      headerName: "Transaction ID",
      minWidth: 140,
      flex: 0.8,
    },
    {
      field: "customerName",
      headerName: "Customer",
      minWidth: 240,
      flex: 1.3,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {params.row.customerName}
          </Typography>
          {/* <Typography variant="caption" color="text.secondary">
            ID: {params.row.customerId}
          </Typography> */}
        </Box>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 150,
      flex: 0.8,
      align: "right",
      headerAlign: "right",
      valueGetter: (value, row) => ({
        amount: row.amount,
        currency: row.currency,
      }),
      valueFormatter: (value) => {
        if (!value) return "";
        const { amount, currency } = value;
        if (amount == null || currency == null) return "";
        return formatAmount(amount, currency);
      },
    },
    {
      field: "merchantCategory",
      headerName: "Merchant Category",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      minWidth: 200,
      flex: 1,
      valueFormatter: (value) => (value ? formatDateTime(value) : ""),
    },
    {
      field: "riskScore",
      headerName: "Risk Score",
      minWidth: 130,
      flex: 0.7,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Typography
          fontWeight={600}
          color={getRiskScoreColor(params.value)}
          sx={{ width: "100%", textAlign: "center" }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => <StatusChip status={params.value} />,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Transactions"
        subtitle="Monitor and review transaction risk assessments"
        actions={
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status Filter</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              label="Status Filter"
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="FLAGGED">Flagged</MenuItem>
            </Select>
          </FormControl>
        }
      />

      {error && <ErrorAlert error={error} />}

      <DataGridTable
        noRowsText="No transactions found"
        dataGridProps={{
          rows: list,
          columns,
          loading,
          paginationMode: "server",
          rowCount: totalElements,
          paginationModel: { page, pageSize: size },
          onPaginationModelChange: (model) => {
            // Handle pageSize changes first (slice resets page to 0)
            if (model.pageSize !== size) {
              dispatch(setSize(model.pageSize));
              return;
            }
            if (model.page !== page) {
              dispatch(setPage(model.page));
            }
          },
          pageSizeOptions: [5, 10, 25, 50],
          onRowClick: (params) => handleRowClick(params.id),
          sx: {
            // '& .MuiDataGrid-row': { cursor: 'pointer' },
            height: "calc(100vh - 200px)",
          },
        }}
      />

      <TransactionDetailsDialog
        open={detailsOpen}
        transactionId={selectedTransactionId}
        onClose={handleCloseDetails}
      />
    </Box>
  );
};


Dashboard.propTypes = {};

export default Dashboard;
