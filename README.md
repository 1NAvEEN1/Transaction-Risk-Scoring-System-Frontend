# Transaction Risk Scoring System - Frontend

A comprehensive React-based frontend for the Transaction Risk Scoring System built with Material-UI, Redux Toolkit, and GraphQL.

## Features

- **Transaction Dashboard**: View and filter transactions with pagination
- **Submit Transactions**: Create new transactions with risk assessment
- **Transaction Details**: Detailed view of transaction risk analysis and matched rules
- **Risk Rules Management**: Configure and manage risk assessment rules
- **Real-time Risk Scoring**: Instant feedback on transaction risk levels
- **Responsive Design**: Mobile-friendly interface using Material-UI

## Tech Stack

- **React 19** - UI library
- **Redux Toolkit** - State management
- **Material-UI (MUI) v7** - Component library and design system
- **React Router v7** - Client-side routing
- **Vite** - Build tool and dev server
- **GraphQL** - API communication

## Project Structure

```
src/
├── app/
│   ├── apiManager.js          # API client with GraphQL support
│   ├── store.js               # Redux store configuration
│   └── ...
├── components/                 # Reusable UI components
│   ├── PageHeader/
│   ├── StatusChip/
│   ├── ErrorAlert/
│   ├── ConfirmDialog/
│   ├── RuleTypeFields/
│   └── ...
├── graphql/
│   └── queries.js             # GraphQL queries and mutations
├── layout/
│   └── Layout.jsx             # Main app layout with navigation
├── pages/                     # Page components
│   ├── Dashboard/
│   ├── SubmitTransaction/
│   ├── TransactionDetails/
│   └── RiskRules/
├── reducers/                  # Redux slices
│   ├── transactionsSlice.js
│   ├── rulesSlice.js
│   └── customersSlice.js
├── services/                  # API service layer
│   ├── TransactionService.js
│   ├── RiskRuleService.js
│   └── CustomerService.js
├── theme/                     # MUI theme configuration
└── utils/                     # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend server running on port 8080

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Update .env file with your backend URL
VITE_BASE_URL = http://localhost:8080
```

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BASE_URL` | Backend API base URL | `http://localhost:8080` |

## GraphQL Integration

The frontend communicates with the backend using GraphQL. All queries and mutations are defined in `src/graphql/queries.js`:

### Queries
- `GET_TRANSACTIONS` - Fetch paginated transactions with optional status filter
- `GET_TRANSACTION_BY_ID` - Get detailed transaction information
- `GET_RISK_RULES` - Fetch all risk rules
- `GET_CUSTOMERS` - Fetch all customers

### Mutations
- `SUBMIT_TRANSACTION` - Submit a new transaction for risk assessment
- `CREATE_RISK_RULE` - Create a new risk rule
- `UPDATE_RISK_RULE` - Update an existing risk rule

## Redux State Management

### Slices

#### Transactions Slice
- Manages transaction list, pagination, filters, and selected transaction
- Async thunks: `fetchTransactions`, `fetchTransactionById`, `submitTransaction`

#### Rules Slice
- Manages risk rules list and form state
- Async thunks: `fetchRules`, `createRule`, `updateRule`

#### Customers Slice
- Manages customer list for transaction submission
- Async thunk: `fetchCustomers`

## Key Components

### PageHeader
Reusable page header with title, subtitle, and action buttons.

### StatusChip
Displays transaction status (APPROVED/FLAGGED) with color-coded chips.

### ErrorAlert
Dismissible error alert component for displaying error messages.

### RuleTypeFields
Dynamic form fields that render based on the selected rule type:
- **AMOUNT_THRESHOLD**: Amount input
- **MERCHANT_CATEGORY**: Category dropdown
- **FREQUENCY**: Count and time window inputs

## Pages

### Dashboard (`/dashboard`)
- Lists all transactions in a paginated table
- Filter by status (ALL, APPROVED, FLAGGED)
- Click row to view transaction details
- Displays risk score with color coding

### Submit Transaction (`/submit`)
- Form to create new transactions
- Customer selection dropdown
- Amount, currency, timestamp, and merchant category inputs
- Real-time validation
- Redirects to transaction details on success

### Transaction Details (`/transaction/:id`)
- Complete transaction information
- Risk score and status
- List of matched rules with details
- Visual breakdown of risk assessment

### Risk Rules Management (`/rules`)
- Table view of all risk rules
- Create new rules with modal form
- Edit existing rules
- Toggle rule active/inactive status
- Dynamic form fields based on rule type

## Styling and Theme

The app uses a custom Material-UI theme configured in `src/theme/`. Theme includes:
- Custom color palette
- Typography settings
- Component overrides
- Responsive breakpoints

## API Error Handling

All API calls include error handling:
- Network errors are caught and displayed
- GraphQL errors are extracted and shown to users
- Form validation errors are displayed inline
- Success messages use Snackbar notifications

## Development Guidelines

1. **Component Structure**: Use functional components with hooks
2. **State Management**: Use Redux for global state, local state for UI-only concerns
3. **API Calls**: Always use service layer, never call API directly from components
4. **Styling**: Use MUI's `sx` prop for component-level styles
5. **Type Safety**: Follow existing patterns for consistency (TypeScript optional)
6. **Error Handling**: Always handle errors gracefully with user-friendly messages

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
