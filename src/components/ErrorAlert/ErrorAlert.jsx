import React from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@mui/material';

const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <Alert severity="error" onClose={onClose} sx={{ mb: 2 }}>
      <AlertTitle>Error</AlertTitle>
      {error}
    </Alert>
  );
};

ErrorAlert.propTypes = {
  error: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorAlert;
