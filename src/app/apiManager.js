export const graphql = async ({ query, variables = {}, header = {} }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  
  const response = await fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(result.errors[0]?.message || 'GraphQL Error');
  }
  
  return result.data;
};
