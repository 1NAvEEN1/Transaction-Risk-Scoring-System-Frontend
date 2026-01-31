import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Typography,
  Skeleton,
  Switch,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import PageHeader from '../../components/PageHeader/PageHeader';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import RuleFormModal from './RuleFormModal';
import {
  fetchRules,
  updateRule,
} from '../../reducers/rulesSlice';

const RiskRules = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.rules);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  useEffect(() => {
    dispatch(fetchRules());
  }, [dispatch]);

  const handleCreateClick = () => {
    setSelectedRule(null);
    setOpenModal(true);
  };

  const handleEditClick = (rule) => {
    setSelectedRule(rule);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRule(null);
  };

  const handleToggleActive = (rule) => {
    const input = {
      ruleName: rule.ruleName,
      ruleType: rule.ruleType,
      amountThreshold: rule.amountThreshold,
      merchantCategory: rule.merchantCategory,
      frequencyCount: rule.frequencyCount,
      frequencyWindowMinutes: rule.frequencyWindowMinutes,
      riskPoints: rule.riskPoints,
      active: !rule.active,
    };
    dispatch(updateRule({ id: rule.id, input }));
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

  const getRuleTypeDetails = (rule) => {
    switch (rule.ruleType) {
      case 'AMOUNT_THRESHOLD':
        return `Threshold: $${rule.amountThreshold?.toFixed(2)}`;
      case 'MERCHANT_CATEGORY':
        return `Category: ${rule.merchantCategory}`;
      case 'FREQUENCY':
        return `${rule.frequencyCount} transactions in ${rule.frequencyWindowMinutes} minutes`;
      default:
        return '';
    }
  };

  return (
    <Box>
      <PageHeader
        title="Risk Rules Management"
        subtitle="Configure and manage risk assessment rules"
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Create Rule
          </Button>
        }
      />

      {error && <ErrorAlert error={error} />}

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Rule Name</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Configuration</strong></TableCell>
                <TableCell align="center"><strong>Risk Points</strong></TableCell>
                <TableCell align="center"><strong>Active</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                  </TableRow>
                ))
              ) : list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2" color="text.secondary" py={4}>
                      No risk rules found. Create your first rule to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                list.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {rule.ruleName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={rule.ruleType}
                        size="small"
                        color={getRuleTypeColor(rule.ruleType)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {getRuleTypeDetails(rule)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" fontWeight={700} color="error.main">
                        +{rule.riskPoints}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={rule.active}
                        onChange={() => handleToggleActive(rule)}
                        color="success"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(rule)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <RuleFormModal
        open={openModal}
        onClose={handleCloseModal}
        rule={selectedRule}
      />
    </Box>
  );
};

export default RiskRules;
