import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

const StatusChip = ({ status }) => {
  const getStatusProps = () => {
    switch (status) {
      case 'APPROVED':
        return {
          label: 'Approved',
          color: 'success',
        };
      case 'FLAGGED':
        return {
          label: 'Flagged',
          color: 'error',
        };
      default:
        return {
          label: status,
          color: 'default',
        };
    }
  };

  const { label, color } = getStatusProps();

  return (
    <Chip 
      label={label} 
      color={color} 
      size="small" 
      sx={{ fontWeight: 600 }}
    />
  );
};

StatusChip.propTypes = {
  status: PropTypes.oneOf(['APPROVED', 'FLAGGED']).isRequired,
};

export default StatusChip;
