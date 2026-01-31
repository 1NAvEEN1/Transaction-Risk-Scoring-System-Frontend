import React from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
} from '@mui/material';

const RuleTypeFields = ({ ruleType, formData, errors, onChange }) => {
  const handleChange = (field) => (event) => {
    onChange(field, event.target.value);
  };

  return (
    <Box>
      {ruleType === 'AMOUNT_THRESHOLD' && (
        <TextField
          fullWidth
          label="Amount Threshold"
          type="number"
          name="amountThreshold"
          value={formData.amountThreshold || ''}
          onChange={handleChange('amountThreshold')}
          error={!!errors.amountThreshold}
          helperText={errors.amountThreshold || 'Minimum amount to trigger this rule'}
          required
          inputProps={{ step: '0.01', min: '0' }}
        />
      )}

      {ruleType === 'MERCHANT_CATEGORY' && (
        <FormControl fullWidth error={!!errors.merchantCategory} required>
          <InputLabel>Merchant Category</InputLabel>
          <Select
            name="merchantCategory"
            value={formData.merchantCategory || ''}
            onChange={handleChange('merchantCategory')}
            label="Merchant Category"
          >
            <MenuItem value="RETAIL">Retail</MenuItem>
            <MenuItem value="GAMBLING">Gambling</MenuItem>
            <MenuItem value="CRYPTO">Crypto</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
          </Select>
          <FormHelperText>
            {errors.merchantCategory || 'Select the merchant category to monitor'}
          </FormHelperText>
        </FormControl>
      )}

      {ruleType === 'FREQUENCY' && (
        <>
          <TextField
            fullWidth
            label="Frequency Count"
            type="number"
            name="frequencyCount"
            value={formData.frequencyCount || ''}
            onChange={handleChange('frequencyCount')}
            error={!!errors.frequencyCount}
            helperText={errors.frequencyCount || 'Number of transactions'}
            required
            inputProps={{ min: '1' }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Time Window (Minutes)"
            type="number"
            name="frequencyWindowMinutes"
            value={formData.frequencyWindowMinutes || ''}
            onChange={handleChange('frequencyWindowMinutes')}
            error={!!errors.frequencyWindowMinutes}
            helperText={errors.frequencyWindowMinutes || 'Time window in minutes'}
            required
            inputProps={{ min: '1' }}
          />
        </>
      )}
    </Box>
  );
};

export default RuleTypeFields;
