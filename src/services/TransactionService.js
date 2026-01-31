import { graphql } from "../app/apiManager";
import {
  GET_TRANSACTIONS,
  GET_TRANSACTION_BY_ID,
  SUBMIT_TRANSACTION,
} from "../graphql/queries";

export const transactionService = {
  // Fetch paginated transactions with optional status filter
  fetchTransactions: async ({ page = 0, size = 10, status = null }) => {
    const variables = { page, size };
    if (status && status !== 'ALL') {
      variables.status = status;
    }
    return await graphql({ query: GET_TRANSACTIONS, variables });
  },

  // Fetch single transaction by ID
  fetchTransactionById: async (id) => {
    return await graphql({ 
      query: GET_TRANSACTION_BY_ID, 
      variables: { id } 
    });
  },

  // Submit new transaction
  submitTransaction: async (input) => {
    return await graphql({ 
      query: SUBMIT_TRANSACTION, 
      variables: { input } 
    });
  },
};
