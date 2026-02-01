import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  Chip,
  Typography,
  Switch,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import PageHeader from "../../components/PageHeader/PageHeader";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import DataGridTable from "../../components/DataGridTable/DataGridTable";
import RuleFormModal from "./RuleFormModal";
import { fetchRules, updateRule } from "../../reducers/rulesSlice";

const RiskRules = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.rules);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

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

  const getRuleTypeDetails = (rule) => {
    switch (rule.ruleType) {
      case "AMOUNT_THRESHOLD":
        return `Threshold: $${rule.amountThreshold?.toFixed(2)}`;
      case "MERCHANT_CATEGORY":
        return `Category: ${rule.merchantCategory}`;
      case "FREQUENCY":
        return `${rule.frequencyCount} transactions in ${rule.frequencyWindowMinutes} minutes`;
      default:
        return "";
    }
  };

  const columns = [
    {
      field: "ruleName",
      headerName: "Rule Name",
      minWidth: 220,
      flex: 1.3,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "ruleType",
      headerName: "Type",
      minWidth: 180,
      flex: 0.9,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={getRuleTypeColor(params.value)}
        />
      ),
    },
    {
      field: "configuration",
      headerName: "Configuration",
      minWidth: 320,
      flex: 1.6,
      sortable: false,
      valueGetter: (value, row) => getRuleTypeDetails(row),
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "riskPoints",
      headerName: "Risk Points",
      minWidth: 130,
      flex: 0.7,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Typography
          fontWeight={600}
          color="error.main"
          sx={{ width: "100%", textAlign: "center" }}
        >
          +{params.value}
        </Typography>
      ),
    },
    {
      field: "active",
      headerName: "Active",
      minWidth: 110,
      flex: 0.6,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Switch
          checked={Boolean(params.value)}
          onChange={(event) => {
            event.stopPropagation();
            handleToggleActive(params.row);
          }}
          color="success"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 110,
      flex: 0.6,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            handleEditClick(params.row);
          }}
          color="primary"
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

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
            sx={{ bgcolor: "primary.light" }}
          >
            Create Rule
          </Button>
        }
      />

      {error && <ErrorAlert error={error} />}

      <DataGridTable
        noRowsText="No risk rules found. Create your first rule to get started."
        dataGridProps={{
          rows: list,
          columns,
          loading,
          paginationModel,
          onPaginationModelChange: setPaginationModel,
          pageSizeOptions: [5, 10, 25, 50],
          sx: { height: "calc(100vh - 200px)" },
        }}
      />

      <RuleFormModal
        open={openModal}
        onClose={handleCloseModal}
        rule={selectedRule}
      />
    </Box>
  );
};

export default RiskRules;
