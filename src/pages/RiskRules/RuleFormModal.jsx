import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';
import RuleTypeFields from '../../components/RuleTypeFields/RuleTypeFields';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import {
  createRule,
  updateRule,
  clearFormError,
} from '../../reducers/rulesSlice';

const RuleFormModal = ({ open, onClose, rule }) => {
  const dispatch = useDispatch();
  const { formLoading, formError } = useSelector((state) => state.rules);

  const isEditMode = !!rule;

  const [formData, setFormData] = useState({
    ruleName: '',
    ruleType: '',
    amountThreshold: '',
    merchantCategory: '',
    frequencyCount: '',
    frequencyWindowMinutes: '',
    riskPoints: '',
    active: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (rule) {
      setFormData({
        ruleName: rule.ruleName || '',
        ruleType: rule.ruleType || '',
        amountThreshold: rule.amountThreshold || '',
        merchantCategory: rule.merchantCategory || '',
        frequencyCount: rule.frequencyCount || '',
        frequencyWindowMinutes: rule.frequencyWindowMinutes || '',
        riskPoints: rule.riskPoints || '',
        active: rule.active ?? true,
      });
    } else {
      setFormData({
        ruleName: '',
        ruleType: '',
        amountThreshold: '',
        merchantCategory: '',
        frequencyCount: '',
        frequencyWindowMinutes: '',
        riskPoints: '',
        active: true,
      });
    }
    setErrors({});
    dispatch(clearFormError());
  }, [rule, open, dispatch]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const handleRuleTypeFieldChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.ruleName.trim()) {
      newErrors.ruleName = 'Rule name is required';
    }

    if (!formData.ruleType) {
      newErrors.ruleType = 'Rule type is required';
    }

    if (!formData.riskPoints || parseInt(formData.riskPoints) <= 0) {
      newErrors.riskPoints = 'Risk points must be greater than 0';
    }

    // Rule type specific validation
    if (formData.ruleType === 'AMOUNT_THRESHOLD') {
      if (!formData.amountThreshold || parseFloat(formData.amountThreshold) <= 0) {
        newErrors.amountThreshold = 'Amount threshold must be greater than 0';
      }
    }

    if (formData.ruleType === 'MERCHANT_CATEGORY') {
      if (!formData.merchantCategory) {
        newErrors.merchantCategory = 'Merchant category is required';
      }
    }

    if (formData.ruleType === 'FREQUENCY') {
      if (!formData.frequencyCount || parseInt(formData.frequencyCount) <= 0) {
        newErrors.frequencyCount = 'Frequency count must be greater than 0';
      }
      if (!formData.frequencyWindowMinutes || parseInt(formData.frequencyWindowMinutes) <= 0) {
        newErrors.frequencyWindowMinutes = 'Time window must be greater than 0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const input = {
      ruleName: formData.ruleName.trim(),
      ruleType: formData.ruleType,
      riskPoints: parseInt(formData.riskPoints),
      active: formData.active,
    };

    // Add rule type specific fields
    if (formData.ruleType === 'AMOUNT_THRESHOLD') {
      input.amountThreshold = parseFloat(formData.amountThreshold);
    } else if (formData.ruleType === 'MERCHANT_CATEGORY') {
      input.merchantCategory = formData.merchantCategory;
    } else if (formData.ruleType === 'FREQUENCY') {
      input.frequencyCount = parseInt(formData.frequencyCount);
      input.frequencyWindowMinutes = parseInt(formData.frequencyWindowMinutes);
    }

    try {
      if (isEditMode) {
        await dispatch(updateRule({ id: rule.id, input })).unwrap();
      } else {
        await dispatch(createRule(input)).unwrap();
      }
      onClose();
    } catch (error) {
      // Error is handled by Redux state
    }
  };

  const handleClose = () => {
    if (!formLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditMode ? 'Edit Risk Rule' : 'Create Risk Rule'}
      </DialogTitle>
      <DialogContent>
        <Box mt={2}>
          {formError && (
            <ErrorAlert error={formError} onClose={() => dispatch(clearFormError())} />
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Rule Name"
                  value={formData.ruleName}
                  onChange={handleChange('ruleName')}
                  error={!!errors.ruleName}
                  helperText={errors.ruleName || 'Enter a descriptive name for this rule'}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.ruleType} required>
                  <InputLabel>Rule Type</InputLabel>
                  <Select
                    value={formData.ruleType}
                    onChange={handleChange('ruleType')}
                    label="Rule Type"
                    disabled={isEditMode} // Don't allow changing rule type in edit mode
                  >
                    <MenuItem value="AMOUNT_THRESHOLD">Amount Threshold</MenuItem>
                    <MenuItem value="MERCHANT_CATEGORY">Merchant Category</MenuItem>
                    <MenuItem value="FREQUENCY">Frequency</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.ruleType || 'Select the type of risk rule'}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Risk Points"
                  type="number"
                  value={formData.riskPoints}
                  onChange={handleChange('riskPoints')}
                  error={!!errors.riskPoints}
                  helperText={errors.riskPoints || 'Points added when rule matches'}
                  required
                  inputProps={{ min: '1' }}
                />
              </Grid>

              {formData.ruleType && (
                <Grid item xs={12}>
                  <RuleTypeFields
                    ruleType={formData.ruleType}
                    formData={formData}
                    errors={errors}
                    onChange={handleRuleTypeFieldChange}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.active}
                      onChange={handleChange('active')}
                      color="success"
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={formLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={formLoading}
        >
          {formLoading ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RuleFormModal;
