# Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- MySQL running on localhost:3306
- Backend Spring Boot application ready

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd Transaction-Risk-Scoring-System-Backend

# Run the application
./mvnw spring-boot:run

# For Windows
mvnw.cmd spring-boot:run
```

Backend will start on `http://localhost:8080`
GraphiQL interface: `http://localhost:8080/graphiql`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd Transaction-Risk-Scoring-System-Frontend

# Install dependencies (first time only)
npm install

# Update .env file
# Change VITE_BASE_URL to: http://localhost:8080

# Start development server
npm run dev
```

Frontend will start on `http://localhost:5173`

### 3. Access the Application

1. Open browser to `http://localhost:5173`
2. Navigate to `/dashboard` to see the Transaction Risk Scoring System

### 4. First-Time Usage

The backend should have sample data from `DataInitializer`. You can:

1. **View Transactions**: Click "Transactions" in the sidebar
2. **Submit a Transaction**: 
   - Click "Submit Transaction"
   - Select a customer
   - Enter amount, currency, and merchant category
   - Submit to see risk assessment

3. **Manage Rules**: Click "Risk Rules" to create/edit risk rules
4. **View Details**: Click any transaction to see detailed risk breakdown

## Troubleshooting

### Backend Not Running
```bash
# Check if port 8080 is available
netstat -ano | findstr :8080

# Check MySQL connection
# Ensure MySQL is running and credentials in application.yml are correct
```

### Frontend Connection Issues
```bash
# Verify .env file
# Should have: VITE_BASE_URL = http://localhost:8080

# Clear browser cache and restart dev server
npm run dev
```

### Database Issues
```bash
# Create database manually if needed
mysql -u root -p
CREATE DATABASE riskdb;
exit;
```

## Environment Configuration

### Frontend `.env`
```env
VITE_BASE_URL = http://localhost:8080
```

### Backend `application.yml`
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/riskdb?createDatabaseIfNotExist=true...
    username: root
    password: 1234
```

## Available URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **GraphQL Endpoint**: http://localhost:8080/graphql
- **GraphiQL IDE**: http://localhost:8080/graphiql

## Testing GraphQL Queries

You can test queries directly in GraphiQL:

### Example: Get Transactions
```graphql
query {
  transactions(page: 0, size: 10, status: "ALL") {
    content {
      id
      customerName
      amount
      riskScore
      status
    }
    totalElements
  }
}
```

### Example: Submit Transaction
```graphql
mutation {
  submitTransaction(input: {
    customerId: 1
    amount: 5000.0
    currency: "USD"
    timestamp: "2026-01-31T10:00:00Z"
    merchantCategory: "GAMBLING"
  }) {
    id
    riskScore
    status
    matchedRules {
      ruleName
      points
    }
  }
}
```

## Production Build

```bash
# Build frontend for production
cd Transaction-Risk-Scoring-System-Frontend
npm run build

# Build artifacts will be in dist/ folder

# Backend JAR
cd Transaction-Risk-Scoring-System-Backend
./mvnw clean package
# JAR will be in target/ folder
```

## Need Help?

- Check `README.md` for detailed documentation
- Check `IMPLEMENTATION_SUMMARY.md` for complete feature list
- Review GraphQL schema in backend: `src/main/resources/graphql/schema.graphqls`
