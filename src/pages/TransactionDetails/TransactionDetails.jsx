import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  Stack,
  Button,
  Skeleton,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Person,
  AttachMoney,
  CalendarToday,
  Store,
  Warning,
} from '@mui/icons-material';
import PageHeader from '../../components/PageHeader/PageHeader';
import StatusChip from '../../components/StatusChip/StatusChip';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import {
  fetchTransactionById,
  clearSelectedTransaction,
} from '../../reducers/transactionsSlice';

const TransactionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedTransaction, loading, error } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactionById(parseInt(id)));
    return () => {
      dispatch(clearSelectedTransaction());
    };
  }, [dispatch, id]);

  const formatAmount = (amount, currency) => {
    return `${currency} ${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getRiskScoreColor = (score) => {
    if (score >= 70) return 'error.main';
    if (score >= 40) return 'warning.main';
    return 'success.main';
  };

  const getRuleTypeColor = (ruleType) => {
    switch (ruleType) {
      case 'AMOUNT_THRESHOLD':
        return 'primary';
      case 'MERCHANT_CATEGORY':
        return 'secondary';
      case 'FREQUENCY':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 3 }} />
        <Paper elevation={2} sx={{ p: 3 }}>
          <Skeleton variant="rectangular" height={400} />
        </Paper>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="Transaction Details" />
        <ErrorAlert error={error} />
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          Back to Transactions
        </Button>
      </Box>
    );
  }

  if (!selectedTransaction) {
    return null;
  }

  return (
    <Box>
      <PageHeader
        title={`Transaction #${selectedTransaction.id}`}
        subtitle="Detailed transaction information and risk assessment"
        actions={
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/dashboard')}
            variant="outlined"
          >
            Back
          </Button>
        }
      />

      <Grid container spacing={3}>
        {/* Transaction Information */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Transaction Information
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Person color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Customer
                  </Typography>
                </Stack>
                <Typography variant="body1" fontWeight={600}>
                  {selectedTransaction.customerName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ID: {selectedTransaction.customerId}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <AttachMoney color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Amount
                  </Typography>
                </Stack>
                <Typography variant="h5" fontWeight={700}>
                  {formatAmount(
                    selectedTransaction.amount,
                    selectedTransaction.currency
                  )}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <CalendarToday color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Timestamp
                  </Typography>
                </Stack>
                <Typography variant="body1">
                  {formatDateTime(selectedTransaction.timestamp)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Store color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Merchant Category
                  </Typography>
                </Stack>
                <Typography variant="body1" fontWeight={600}>
                  {selectedTransaction.merchantCategory}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Risk Assessment */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Risk Assessment
            </Typography>

            <Box mb={3}>
              <Typography variant="h1" fontWeight={700} color={getRiskScoreColor(selectedTransaction.riskScore)}>
                {selectedTransaction.riskScore}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Risk Score
              </Typography>
            </Box>

            <StatusChip status={selectedTransaction.status} />
          </Paper>
        </Grid>

        {/* Matched Rules */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={3}>
              <Warning color="warning" />
              <Typography variant="h6" fontWeight={700}>
                Matched Risk Rules ({selectedTransaction.matchedRules.length})
              </Typography>
            </Stack>

            {selectedTransaction.matchedRules.length === 0 ? (
              <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                No risk rules were triggered for this transaction
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {selectedTransaction.matchedRules.map((rule) => (
                  <Grid item xs={12} md={6} key={rule.ruleId}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                          >
                            <Box>
                              <Typography variant="subtitle1" fontWeight={700}>
                                {rule.ruleName}
                              </Typography>
                              <Chip
                                label={rule.ruleType}
                                size="small"
                                color={getRuleTypeColor(rule.ruleType)}
                                sx={{ mt: 0.5 }}
                              />
                            </Box>
                            <Chip
                              label={`+${rule.points} pts`}
                              color="error"
                              size="small"
                              sx={{ fontWeight: 700 }}
                            />
                          </Stack>

                          <Divider />

                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Reason
                            </Typography>
                            <Typography variant="body2" mt={0.5}>
                              {rule.reason}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionDetails;
