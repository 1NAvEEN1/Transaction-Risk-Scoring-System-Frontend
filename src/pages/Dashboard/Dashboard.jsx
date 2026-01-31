import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
  Typography,
  Stack,
} from '@mui/material';
import PageHeader from '../../components/PageHeader/PageHeader';
import StatusChip from '../../components/StatusChip/StatusChip';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import {
  fetchTransactions,
  setStatusFilter,
  setPage,
  setSize,
} from '../../reducers/transactionsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    list,
    page,
    size,
    totalElements,
    statusFilter,
    loading,
    error,
  } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions({ page, size, status: statusFilter }));
  }, [dispatch, page, size, statusFilter]);

  const handleStatusFilterChange = (event) => {
    dispatch(setStatusFilter(event.target.value));
  };

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setSize(parseInt(event.target.value, 10)));
  };

  const handleRowClick = (id) => {
    navigate(`/transaction/${id}`);
  };

  const formatAmount = (amount, currency) => {
    return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRiskScoreColor = (score) => {
    if (score >= 70) return 'error.main';
    if (score >= 40) return 'warning.main';
    return 'success.main';
  };

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

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Transaction ID</strong></TableCell>
                <TableCell><strong>Customer</strong></TableCell>
                <TableCell align="right"><strong>Amount</strong></TableCell>
                <TableCell><strong>Merchant Category</strong></TableCell>
                <TableCell><strong>Timestamp</strong></TableCell>
                <TableCell align="center"><strong>Risk Score</strong></TableCell>
                <TableCell align="center"><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                // Loading skeleton
                [...Array(size)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                  </TableRow>
                ))
              ) : list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body2" color="text.secondary" py={4}>
                      No transactions found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                list.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    hover
                    onClick={() => handleRowClick(transaction.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {transaction.customerName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {transaction.customerId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {formatAmount(transaction.amount, transaction.currency)}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {transaction.merchantCategory}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDateTime(transaction.timestamp)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        color={getRiskScoreColor(transaction.riskScore)}
                      >
                        {transaction.riskScore}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <StatusChip status={transaction.status} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalElements}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={size}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>
    </Box>
  );
};

export default Dashboard;
