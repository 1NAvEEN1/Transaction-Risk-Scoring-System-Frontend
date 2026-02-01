import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  Stack,
  Button,
  Skeleton,
  Chip,
  IconButton,
} from "@mui/material";
import {
  ArrowBack,
  Person,
  AttachMoney,
  CalendarToday,
  Store,
  Warning,
  Close,
} from "@mui/icons-material";
import StatusChip from "../../components/StatusChip/StatusChip";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import {
  fetchTransactionById,
  clearSelectedTransaction,
} from "../../reducers/transactionsSlice";

export default function TransactionDetailsDialog({
  open,
  transactionId,
  onClose,
}) {
  const dispatch = useDispatch();
  const { selectedTransaction, loading, error } = useSelector(
    (state) => state.transactions,
  );

  useEffect(() => {
    if (!open) return undefined;
    if (transactionId == null) return undefined;

    dispatch(fetchTransactionById(Number(transactionId)));

    return () => {
      dispatch(clearSelectedTransaction());
    };
  }, [dispatch, open, transactionId]);

  const handleClose = () => {
    dispatch(clearSelectedTransaction());
    onClose?.();
  };

  const formatAmount = (amount, currency) => {
    if (amount == null || currency == null) return "";
    return `${currency} ${Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getRiskScoreColor = (score) => {
    if (score >= 70) return "error.main";
    if (score >= 40) return "warning.main";
    return "success.main";
  };

  const getRuleTypeColor = (ruleType) => {
    switch (ruleType) {
      case "AMOUNT_THRESHOLD":
        return "primary";
      case "MERCHANT_CATEGORY":
        return "secondary";
      case "FREQUENCY":
        return "warning";
      default:
        return "default";
    }
  };

  const title = selectedTransaction
    ? `Transaction #${selectedTransaction.id}`
    : "Transaction Details";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle sx={{ pb: 1.5, position: "relative" }}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            // color: 'grey.500',
          }}
        >
          <Close />
        </IconButton>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          mt={-1}
        >
          <Box>
            <Typography variant="h6" fontWeight={800}>
              {title}
            </Typography>
          </Box>
          {/* {selectedTransaction?.status ? (
            <StatusChip status={selectedTransaction.status} />
          ) : null} */}
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" mt={-2} mb={1}>
          Detailed transaction information and risk assessment
        </Typography>
        {loading ? (
          <Box>
            <Skeleton variant="rectangular" height={48} sx={{ mb: 2 }} />
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                p: 2,
              }}
            >
              <Skeleton variant="rectangular" height={420} />
            </Box>
          </Box>
        ) : error ? (
          <Box>
            <ErrorAlert error={error} />
          </Box>
        ) : !selectedTransaction ? (
          <Typography variant="body2" color="text.secondary">
            No transaction selected.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {/* Transaction Information */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <Typography variant="h6" fontWeight={700} mb={3}>
                  Transaction Information
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mb={1}
                    >
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

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mb={1}
                    >
                      <AttachMoney color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Amount
                      </Typography>
                    </Stack>
                    <Typography variant="h5" fontWeight={700}>
                      {formatAmount(
                        selectedTransaction.amount,
                        selectedTransaction.currency,
                      )}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mb={1}
                    >
                      <CalendarToday color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Timestamp
                      </Typography>
                    </Stack>
                    <Typography variant="body1">
                      {formatDateTime(selectedTransaction.timestamp)}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mb={1}
                    >
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
              </Box>
            </Grid>

            {/* Risk Assessment */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  p: 3,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Risk Assessment
                </Typography>

                <Box mb={3}>
                  <Typography
                    variant="h1"
                    fontWeight={700}
                    color={getRiskScoreColor(selectedTransaction.riskScore)}
                  >
                    {selectedTransaction.riskScore}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Risk Score
                  </Typography>
                </Box>

                <StatusChip status={selectedTransaction.status} />
              </Box>
            </Grid>

            {/* Matched Rules */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  p: 3,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" mb={3}>
                  <Warning color="warning" />
                  <Typography variant="h6" fontWeight={700}>
                    Matched Risk Rules (
                    {selectedTransaction.matchedRules?.length ?? 0})
                  </Typography>
                </Stack>

                {(selectedTransaction.matchedRules?.length ?? 0) === 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    py={4}
                  >
                    No risk rules were triggered for this transaction
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {selectedTransaction.matchedRules.map((rule) => (
                      <Grid size={{ xs: 12, md: 6 }} key={rule.ruleId}>
                        <Card variant="outlined" sx={{height:"100%"}}>
                          <CardContent>
                            <Stack spacing={2}>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start"
                              >
                                <Box>
                                  <Typography
                                    variant="subtitle1"
                                    fontWeight={700}
                                  >
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
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
              </Box>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}

TransactionDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  transactionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func,
};
