import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }), // Environment variable
  reducerPath: "adminApi", // Slice name
  tagTypes: ["User"], // Helps identify particular data
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"]
    }),
  }),
}); 

export const {
   useGetUserQuery, // Has an added prefix (use) and suffix (Query)
} = api;
