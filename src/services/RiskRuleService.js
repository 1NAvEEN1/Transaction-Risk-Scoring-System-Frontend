import { graphql } from "../app/apiManager";
import {
  GET_RISK_RULES,
  CREATE_RISK_RULE,
  UPDATE_RISK_RULE,
} from "../graphql/queries";

export const riskRuleService = {
  // Fetch all risk rules
  fetchRules: async () => {
    return await graphql({ query: GET_RISK_RULES });
  },

  // Create new risk rule
  createRule: async (input) => {
    return await graphql({ 
      query: CREATE_RISK_RULE, 
      variables: { input } 
    });
  },

  // Update existing risk rule
  updateRule: async ({ id, input }) => {
    return await graphql({ 
      query: UPDATE_RISK_RULE, 
      variables: { id, input } 
    });
  },
};
