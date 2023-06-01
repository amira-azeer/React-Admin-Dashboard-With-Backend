import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }), // Environment variable
  reducerPath: "adminApi", // Slice name
  tagTypes: ["User", "Products", "Customers", "Transactions", "Geography", "Sales"], // Helps identify particular data
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),

    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),

    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: {page, pageSize, sort, search},
      }),
      providesTags: ["Transactions"]
    }),

    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"]
    }),

    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"]
    }),

    
  }),
});


export const {
  useGetUserQuery, // Has an added prefix (use) and suffix (Query)
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
} = api;
