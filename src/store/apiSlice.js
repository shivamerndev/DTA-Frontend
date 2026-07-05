import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dta-backend-4i1g.onrender.com/api/v1",
    credentials: "include"
  }),
  tagTypes: ["User", "Attendance", "OTRequest", "Report"],
  endpoints: () => ({}),
});
