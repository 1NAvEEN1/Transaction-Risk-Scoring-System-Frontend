import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';
import PageHeader from '../../components/PageHeader/PageHeader';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import { submitTransaction, clearSubmitError, clearSelectedTransaction } from '../../reducers/transactionsSlice';
import { fetchCustomers } from '../../reducers/customersSlice';
import { transactionValidationSchema, getLocalDateTimeString } from '../../validation/transactionValidation';

const SubmitTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { submitLoading, submitError, selectedTransaction } = useSelector(
    (state) => state.transactions
  );
  const { list: customers = [], loading: customersLoading } = useSelector(
    (state) => state.customers
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const hasNavigated = useRef(false);

  const formik = useFormik({
    initialValues: {
      customerId: '',
      amount: '',
      currency: 'USD',
      timestamp: getLocalDateTimeString(),
      merchantCategory: '',
    },
    validationSchema: transactionValidationSchema,
    onSubmit: (values) => {
      hasNavigated.current = false;
      const input = {
        customerId: parseInt(values.customerId),
        amount: parseFloat(values.amount),
        currency: values.currency,
        timestamp: new Date(values.timestamp).toISOString(),
        merchantCategory: values.merchantCategory,
      };
      dispatch(submitTransaction(input));
    },
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTransaction && !submitLoading && !submitError && !hasNavigated.current) {
      hasNavigated.current = true;
      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/dashboard`);
        dispatch(clearSelectedTransaction());
      }, 1500);
    }
  }, [selectedTransaction, submitLoading, submitError, navigate, dispatch]);

  // Clear selected transaction when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearSelectedTransaction());
    };
  }, [dispatch]);

  const handleReset = () => {
    formik.resetForm();
    formik.setFieldValue('timestamp', getLocalDateTimeString());
    dispatch(clearSubmitError());
  };

  return (
    <Box>
      <PageHeader
        title="Submit Transaction"
        subtitle="Submit a new transaction for risk assessment"
      />

      {submitError && (
        <ErrorAlert error={submitError} onClose={() => dispatch(clearSubmitError())} />
      )}

      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          p: 3,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl 
                fullWidth 
                error={formik.touched.customerId && Boolean(formik.errors.customerId)} 
                required 
                size="small"
              >
                <InputLabel>Customer</InputLabel>
                <Select
                  name="customerId"
                  value={formik.values.customerId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Customer"
                  disabled={customersLoading}
                  size="small"
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.email})
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.customerId && formik.errors.customerId 
                    ? formik.errors.customerId 
                    : 'Select the customer making the transaction'}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="amount"
                label="Amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={
                  formik.touched.amount && formik.errors.amount 
                    ? formik.errors.amount 
                    : 'Enter transaction amount'
                }
                required
                inputProps={{ step: '0.01', min: '0.01' }}
                size="small"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl 
                fullWidth 
                error={formik.touched.currency && Boolean(formik.errors.currency)} 
                required 
                size="small"
              >
                <InputLabel>Currency</InputLabel>
                <Select
                  name="currency"
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Currency"
                  size="small"
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                  <MenuItem value="LKR">LKR</MenuItem>
                </Select>
                <FormHelperText>
                  {formik.touched.currency && formik.errors.currency 
                    ? formik.errors.currency 
                    : 'Select transaction currency'}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="timestamp"
                label="Timestamp"
                type="datetime-local"
                value={formik.values.timestamp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.timestamp && Boolean(formik.errors.timestamp)}
                helperText={
                  formik.touched.timestamp && formik.errors.timestamp 
                    ? formik.errors.timestamp 
                    : 'Select transaction date and time'
                }
                required
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl 
                fullWidth 
                error={formik.touched.merchantCategory && Boolean(formik.errors.merchantCategory)} 
                required 
                size="small"
              >
                <InputLabel>Merchant Category</InputLabel>
                <Select
                  name="merchantCategory"
                  value={formik.values.merchantCategory}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Merchant Category"
                  size="small"
                >
                  <MenuItem value="RETAIL">Retail</MenuItem>
                  <MenuItem value="GAMBLING">Gambling</MenuItem>
                  <MenuItem value="CRYPTO">Crypto</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
                <FormHelperText>
                  {formik.touched.merchantCategory && formik.errors.merchantCategory 
                    ? formik.errors.merchantCategory 
                    : 'Select merchant category'}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box display="flex" gap={2} justifyContent="space-between" mt={0}>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={submitLoading}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitLoading}
                >
                  {submitLoading ? 'Submitting...' : 'Submit Transaction'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Transaction submitted successfully! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
};


SubmitTransaction.propTypes = {};

export default SubmitTransaction;
