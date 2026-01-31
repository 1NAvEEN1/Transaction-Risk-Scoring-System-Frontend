import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { riskRuleService } from "../services/RiskRuleService";

// Async thunks
export const fetchRules = createAsyncThunk(
  "rules/fetchRules",
  async (_, { rejectWithValue }) => {
    try {
      const data = await riskRuleService.fetchRules();
      return data.riskRules;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRule = createAsyncThunk(
  "rules/createRule",
  async (input, { rejectWithValue }) => {
    try {
      const data = await riskRuleService.createRule(input);
      return data.createRiskRule;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRule = createAsyncThunk(
  "rules/updateRule",
  async ({ id, input }, { rejectWithValue }) => {
    try {
      const data = await riskRuleService.updateRule({ id, input });
      return data.updateRiskRule;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
  formLoading: false,
  formError: null,
};

const rulesSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    clearFormError: (state) => {
      state.formError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch rules
    builder
      .addCase(fetchRules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRules.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create rule
    builder
      .addCase(createRule.pending, (state) => {
        state.formLoading = true;
        state.formError = null;
      })
      .addCase(createRule.fulfilled, (state, action) => {
        state.formLoading = false;
        state.list.push(action.payload);
      })
      .addCase(createRule.rejected, (state, action) => {
        state.formLoading = false;
        state.formError = action.payload;
      });

    // Update rule
    builder
      .addCase(updateRule.pending, (state) => {
        state.formLoading = true;
        state.formError = null;
      })
      .addCase(updateRule.fulfilled, (state, action) => {
        state.formLoading = false;
        const index = state.list.findIndex((rule) => rule.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateRule.rejected, (state, action) => {
        state.formLoading = false;
        state.formError = action.payload;
      });
  },
});

export const { clearFormError } = rulesSlice.actions;

export default rulesSlice.reducer;
