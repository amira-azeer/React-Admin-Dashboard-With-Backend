import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }), // Environment variable
  reducerPath: "adminApi", // Slice name
  tagTypes: ["User", "Products"], // Helps identify particular data
  endpoints: (build) => ({
    
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),


  }),
}); 

export const {
   useGetUserQuery, // Has an added prefix (use) and suffix (Query)
   useGetProductsQuery,
} = api;
