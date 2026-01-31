// Transaction Queries
export const GET_TRANSACTIONS = `
  query GetTransactions($page: Int, $size: Int, $status: String) {
    transactions(page: $page, size: $size, status: $status) {
      content {
        id
        customerId
        customerName
        amount
        currency
        timestamp
        merchantCategory
        riskScore
        status
      }
      page
      size
      totalElements
      totalPages
    }
  }
`;

export const GET_TRANSACTION_BY_ID = `
  query GetTransaction($id: Long!) {
    transaction(id: $id) {
      id
      customerId
      customerName
      amount
      currency
      timestamp
      merchantCategory
      riskScore
      status
      matchedRules {
        ruleId
        ruleName
        ruleType
        points
        reason
      }
    }
  }
`;

// Transaction Mutation
export const SUBMIT_TRANSACTION = `
  mutation SubmitTransaction($input: TransactionInput!) {
    submitTransaction(input: $input) {
      id
      customerId
      customerName
      amount
      currency
      timestamp
      merchantCategory
      riskScore
      status
      matchedRules {
        ruleId
        ruleName
        ruleType
        points
        reason
      }
    }
  }
`;

// Risk Rules Queries
export const GET_RISK_RULES = `
  query GetRiskRules {
    riskRules {
      id
      ruleName
      ruleType
      amountThreshold
      merchantCategory
      frequencyCount
      frequencyWindowMinutes
      riskPoints
      active
    }
  }
`;

// Risk Rule Mutations
export const CREATE_RISK_RULE = `
  mutation CreateRiskRule($input: RiskRuleInput!) {
    createRiskRule(input: $input) {
      id
      ruleName
      ruleType
      amountThreshold
      merchantCategory
      frequencyCount
      frequencyWindowMinutes
      riskPoints
      active
    }
  }
`;

export const UPDATE_RISK_RULE = `
  mutation UpdateRiskRule($id: Long!, $input: RiskRuleInput!) {
    updateRiskRule(id: $id, input: $input) {
      id
      ruleName
      ruleType
      amountThreshold
      merchantCategory
      frequencyCount
      frequencyWindowMinutes
      riskPoints
      active
    }
  }
`;

// Customers Query
export const GET_CUSTOMERS = `
  query GetCustomers {
    customers {
      id
      name
      email
      riskProfile
      country
    }
  }
`;
