import { graphql } from "../app/apiManager";
import { GET_CUSTOMERS } from "../graphql/queries";

export const customerService = {
  // Fetch all customers
  fetchCustomers: async () => {
    return await graphql({ query: GET_CUSTOMERS });
  },
};
