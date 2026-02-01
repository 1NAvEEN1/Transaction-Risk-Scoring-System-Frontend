import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionService } from "../services/TransactionService";

// Async thunks
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async ({ page = 0, size = 10, status = 'ALL', searchQuery = '' }, { rejectWithValue }) => {
    try {
      const data = await transactionService.fetchTransactions({ page, size, status, searchQuery });
      return data.transactions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransactionById = createAsyncThunk(
  "transactions/fetchTransactionById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await transactionService.fetchTransactionById(id);
      return data.transaction;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitTransaction = createAsyncThunk(
  "transactions/submitTransaction",
  async (input, { rejectWithValue }) => {
    try {
      const data = await transactionService.submitTransaction(input);
      return data.submitTransaction;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  page: 0,
  size: 10,
  totalElements: 0,
  totalPages: 0,
  statusFilter: 'ALL',
  searchQuery: '',
  selectedTransaction: null,
  loading: false,
  error: null,
  submitLoading: false,
  submitError: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      state.page = 0; // Reset to first page when filter changes
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 0; // Reset to first page when search changes
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
      state.page = 0; // Reset to first page when size changes
    },
    clearSelectedTransaction: (state) => {
      state.selectedTransaction = null;
    },
    clearSubmitError: (state) => {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch transactions
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.content;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch transaction by ID
    builder
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTransaction = action.payload;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Submit transaction
    builder
      .addCase(submitTransaction.pending, (state) => {
        state.submitLoading = true;
        state.submitError = null;
      })
      .addCase(submitTransaction.fulfilled, (state, action) => {
        state.submitLoading = false;
        state.selectedTransaction = action.payload;
      })
      .addCase(submitTransaction.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitError = action.payload;
      });
  },
});

export const {
  setStatusFilter,
  setSearchQuery,
  setPage,
  setSize,
  clearSelectedTransaction,
  clearSubmitError,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
