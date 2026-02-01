import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
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
  Divider,
} from "@mui/material";
import RuleTypeFields from "../../components/RuleTypeFields/RuleTypeFields";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import {
  createRule,
  updateRule,
  clearFormError,
} from "../../reducers/rulesSlice";
import { ruleValidationSchema } from "../../validation/ruleValidation";
import { showAlertMessage } from "../../app/alertMessageController";

const RuleFormModal = ({ open, onClose, rule }) => {
  const dispatch = useDispatch();
  const { formLoading, formError } = useSelector((state) => state.rules);

  const isEditMode = !!rule;

  const formik = useFormik({
    initialValues: {
      ruleName: "",
      ruleType: "",
      amountThreshold: "",
      merchantCategory: "",
      frequencyCount: "",
      frequencyWindowMinutes: "",
      riskPoints: "",
      active: true,
    },
    validationSchema: ruleValidationSchema,
    onSubmit: async (values) => {
      const input = {
        ruleName: values.ruleName.trim(),
        ruleType: values.ruleType,
        riskPoints: parseInt(values.riskPoints),
        active: values.active,
      };

      // Add rule type specific fields
      if (values.ruleType === "AMOUNT_THRESHOLD") {
        input.amountThreshold = parseFloat(values.amountThreshold);
      } else if (values.ruleType === "MERCHANT_CATEGORY") {
        input.merchantCategory = values.merchantCategory;
      } else if (values.ruleType === "FREQUENCY") {
        input.frequencyCount = parseInt(values.frequencyCount);
        input.frequencyWindowMinutes = parseInt(values.frequencyWindowMinutes);
      }

      try {
        if (isEditMode) {
          await dispatch(updateRule({ id: rule.id, input })).unwrap();
        } else {
          await dispatch(createRule(input)).unwrap();
        }
        onClose();
      } catch (error) {
        showAlertMessage({ message: error.message, type: "error" });
      }
    },
  });

  useEffect(() => {
    if (rule) {
      formik.setValues({
        ruleName: rule.ruleName || "",
        ruleType: rule.ruleType || "",
        amountThreshold: rule.amountThreshold || "",
        merchantCategory: rule.merchantCategory || "",
        frequencyCount: rule.frequencyCount || "",
        frequencyWindowMinutes: rule.frequencyWindowMinutes || "",
        riskPoints: rule.riskPoints || "",
        active: rule.active ?? true,
      });
    } else {
      formik.resetForm();
    }
    dispatch(clearFormError());
  }, [rule, open, dispatch]);

  const handleRuleTypeFieldChange = (field, value) => {
    formik.setFieldValue(field, value);
    formik.setFieldTouched(field, true, false);
  };

  const handleClose = () => {
    if (!formLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1.5, mt: -1 }}>
        {isEditMode ? "Edit Risk Rule" : "Create Risk Rule"}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box mt={0}>
          {formError && (
            <ErrorAlert
              error={formError}
              onClose={() => dispatch(clearFormError())}
            />
          )}

          <form id="rule-form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  name="ruleName"
                  label="Rule Name"
                  value={formik.values.ruleName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.ruleName && Boolean(formik.errors.ruleName)
                  }
                  helperText={
                    (formik.touched.ruleName && formik.errors.ruleName) ||
                    "Enter a descriptive name for this rule"
                  }
                  required
                  size="small"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched.ruleType && Boolean(formik.errors.ruleType)
                  }
                  required
                  size="small"
                >
                  <InputLabel>Rule Type</InputLabel>
                  <Select
                    name="ruleType"
                    value={formik.values.ruleType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Rule Type"
                    disabled={isEditMode}
                  >
                    <MenuItem value="AMOUNT_THRESHOLD">
                      Amount Threshold
                    </MenuItem>
                    <MenuItem value="MERCHANT_CATEGORY">
                      Merchant Category
                    </MenuItem>
                    <MenuItem value="FREQUENCY">Frequency</MenuItem>
                  </Select>
                  <FormHelperText>
                    {(formik.touched.ruleType && formik.errors.ruleType) ||
                      "Select the type of risk rule"}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  name="riskPoints"
                  label="Risk Points"
                  type="number"
                  value={formik.values.riskPoints}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.riskPoints &&
                    Boolean(formik.errors.riskPoints)
                  }
                  helperText={
                    (formik.touched.riskPoints && formik.errors.riskPoints) ||
                    "Points added when rule matches"
                  }
                  required
                  inputProps={{ min: "1" }}
                  size="small"
                />
              </Grid>

              {formik.values.ruleType && (
                <Grid size={{ xs: 12 }}>
                  <RuleTypeFields
                    ruleType={formik.values.ruleType}
                    formData={formik.values}
                    errors={formik.errors}
                    onChange={handleRuleTypeFieldChange}
                  />
                </Grid>
              )}

              {/* <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      name="active"
                      checked={formik.values.active}
                      onChange={formik.handleChange}
                      color="success"
                    />
                  }
                  label="Active"
                />
              </Grid> */}
            </Grid>
          </form>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{ display: "flex", justifyContent: "space-between", height: 55 }}
      >
        <Button
          onClick={handleClose}
          disabled={formLoading}
          variant="outlined"
          sx={{ ml: -1.5 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="rule-form"
          variant="contained"
          disabled={formLoading}
          sx={{ mr: -1.5 }}
        >
          {formLoading ? "Saving..." : isEditMode ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RuleFormModal;
