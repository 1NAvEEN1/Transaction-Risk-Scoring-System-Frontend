import PropTypes from 'prop-types';

// Common PropTypes shapes for reuse across components

export const CustomerShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string,
});

export const MatchedRuleShape = PropTypes.shape({
  ruleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  ruleName: PropTypes.string.isRequired,
  ruleType: PropTypes.oneOf(['AMOUNT_THRESHOLD', 'MERCHANT_CATEGORY', 'FREQUENCY']).isRequired,
  points: PropTypes.number.isRequired,
  reason: PropTypes.string,
});

export const TransactionShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  customerName: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currency: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  merchantCategory: PropTypes.oneOf(['RETAIL', 'GAMBLING', 'CRYPTO', 'OTHER']),
  riskScore: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['APPROVED', 'FLAGGED']).isRequired,
  matchedRules: PropTypes.arrayOf(MatchedRuleShape),
  matchedRulesJson: PropTypes.string,
});

export const RiskRuleShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  ruleName: PropTypes.string.isRequired,
  ruleType: PropTypes.oneOf(['AMOUNT_THRESHOLD', 'MERCHANT_CATEGORY', 'FREQUENCY']).isRequired,
  amountThreshold: PropTypes.number,
  merchantCategory: PropTypes.oneOf(['RETAIL', 'GAMBLING', 'CRYPTO', 'OTHER']),
  frequencyCount: PropTypes.number,
  frequencyWindowMinutes: PropTypes.number,
  riskPoints: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
});

export const PaginationModelShape = PropTypes.shape({
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
});

export const DataGridColumnShape = PropTypes.shape({
  field: PropTypes.string.isRequired,
  headerName: PropTypes.string,
  width: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  flex: PropTypes.number,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  headerAlign: PropTypes.oneOf(['left', 'center', 'right']),
  sortable: PropTypes.bool,
  renderCell: PropTypes.func,
  valueGetter: PropTypes.func,
});
