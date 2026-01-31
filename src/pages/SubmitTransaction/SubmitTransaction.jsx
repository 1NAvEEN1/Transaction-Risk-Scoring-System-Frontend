import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
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
import { submitTransaction, clearSubmitError } from '../../reducers/transactionsSlice';
import { fetchCustomers } from '../../reducers/customersSlice';

const SubmitTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { submitLoading, submitError, selectedTransaction } = useSelector(
    (state) => state.transactions
  );
  const { list: customers, loading: customersLoading } = useSelector(
    (state) => state.customers
  );

  const [formData, setFormData] = useState({
    customerId: '',
    amount: '',
    currency: 'USD',
    timestamp: new Date().toISOString().slice(0, 16),
    merchantCategory: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTransaction && !submitLoading && !submitError) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/transaction/${selectedTransaction.id}`);
      }, 1500);
    }
  }, [selectedTransaction, submitLoading, submitError, navigate]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Clear error for this field
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customerId) {
      newErrors.customerId = 'Customer is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.currency) {
      newErrors.currency = 'Currency is required';
    }

    if (!formData.timestamp) {
      newErrors.timestamp = 'Timestamp is required';
    }

    if (!formData.merchantCategory) {
      newErrors.merchantCategory = 'Merchant category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validate()) {
      return;
    }

    const input = {
      customerId: parseInt(formData.customerId),
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      timestamp: new Date(formData.timestamp).toISOString(),
      merchantCategory: formData.merchantCategory,
    };

    dispatch(submitTransaction(input));
  };

  const handleReset = () => {
    setFormData({
      customerId: '',
      amount: '',
      currency: 'USD',
      timestamp: new Date().toISOString().slice(0, 16),
      merchantCategory: '',
    });
    setErrors({});
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

      <Paper elevation={2} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.customerId} required>
                <InputLabel>Customer</InputLabel>
                <Select
                  value={formData.customerId}
                  onChange={handleChange('customerId')}
                  label="Customer"
                  disabled={customersLoading}
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.email})
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.customerId || 'Select the customer making the transaction'}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={handleChange('amount')}
                error={!!errors.amount}
                helperText={errors.amount || 'Enter transaction amount'}
                required
                inputProps={{ step: '0.01', min: '0.01' }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.currency} required>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  onChange={handleChange('currency')}
                  label="Currency"
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                  <MenuItem value="LKR">LKR</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.currency || 'Select transaction currency'}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Timestamp"
                type="datetime-local"
                value={formData.timestamp}
                onChange={handleChange('timestamp')}
                error={!!errors.timestamp}
                helperText={errors.timestamp || 'Select transaction date and time'}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.merchantCategory} required>
                <InputLabel>Merchant Category</InputLabel>
                <Select
                  value={formData.merchantCategory}
                  onChange={handleChange('merchantCategory')}
                  label="Merchant Category"
                >
                  <MenuItem value="RETAIL">Retail</MenuItem>
                  <MenuItem value="GAMBLING">Gambling</MenuItem>
                  <MenuItem value="CRYPTO">Crypto</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.merchantCategory || 'Select merchant category'}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
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
      </Paper>

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

export default SubmitTransaction;
