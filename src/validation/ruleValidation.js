import * as Yup from "yup";

export const ruleValidationSchema = Yup.object({
  ruleName: Yup.string()
    .trim()
    .required("Rule name is required")
    .min(1, "Rule name cannot be empty"),
  ruleType: Yup.string()
    .required("Rule type is required")
    .oneOf(
      ["AMOUNT_THRESHOLD", "MERCHANT_CATEGORY", "FREQUENCY"],
      "Invalid rule type",
    ),
  riskPoints: Yup.number()
    .required("Risk points is required")
    .positive("Risk points must be greater than 0")
    .integer("Risk points must be a whole number"),
  amountThreshold: Yup.number().when("ruleType", {
    is: "AMOUNT_THRESHOLD",
    then: (schema) =>
      schema
        .required("Amount threshold is required")
        .positive("Amount threshold must be greater than 0"),
    otherwise: (schema) => schema.notRequired(),
  }),
  merchantCategory: Yup.string().when("ruleType", {
    is: "MERCHANT_CATEGORY",
    then: (schema) => schema.required("Merchant category is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  frequencyCount: Yup.number().when("ruleType", {
    is: "FREQUENCY",
    then: (schema) =>
      schema
        .required("Frequency count is required")
        .positive("Frequency count must be greater than 0")
        .integer("Frequency count must be a whole number"),
    otherwise: (schema) => schema.notRequired(),
  }),
  frequencyWindowMinutes: Yup.number().when("ruleType", {
    is: "FREQUENCY",
    then: (schema) =>
      schema
        .required("Time window is required")
        .positive("Time window must be greater than 0")
        .integer("Time window must be a whole number"),
    otherwise: (schema) => schema.notRequired(),
  }),
  active: Yup.boolean(),
});
