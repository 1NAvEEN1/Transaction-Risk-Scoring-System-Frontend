import React from 'react';
import PropTypes from 'prop-types';
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
          size="small"
        />
      )}

      {ruleType === 'MERCHANT_CATEGORY' && (
        <FormControl fullWidth error={!!errors.merchantCategory} required size="small">
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
            size="small"
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
            size="small"
          />
        </>
      )}
    </Box>
  );
};

RuleTypeFields.propTypes = {
  ruleType: PropTypes.oneOf(['AMOUNT_THRESHOLD', 'MERCHANT_CATEGORY', 'FREQUENCY']).isRequired,
  formData: PropTypes.shape({
    amountThreshold: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    merchantCategory: PropTypes.oneOf(['RETAIL', 'GAMBLING', 'CRYPTO', 'OTHER']),
    frequencyCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    frequencyWindowMinutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  errors: PropTypes.shape({
    amountThreshold: PropTypes.string,
    merchantCategory: PropTypes.string,
    frequencyCount: PropTypes.string,
    frequencyWindowMinutes: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RuleTypeFields;
