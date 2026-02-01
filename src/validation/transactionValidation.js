import * as Yup from "yup";

// Helper function to get local datetime string for datetime-local input
const getLocalDateTimeString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const transactionValidationSchema = Yup.object({
  customerId: Yup.number()
    .required('Customer is required')
    .positive('Please select a valid customer'),
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be greater than 0')
    .test('is-decimal', 'Amount must be a valid number', (value) => 
      value ? /^\d+(\.\d{1,2})?$/.test(value.toString()) : true
    ),
  currency: Yup.string()
    .required('Currency is required')
    .oneOf(['USD', 'EUR', 'GBP', 'LKR'], 'Invalid currency'),
  merchantCategory: Yup.string()
    .required('Merchant category is required')
    .oneOf(['RETAIL', 'GAMBLING', 'CRYPTO', 'OTHER'], 'Invalid merchant category'),
});

export { getLocalDateTimeString };
