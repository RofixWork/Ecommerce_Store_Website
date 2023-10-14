import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const orderAPI = createApi({
  reducerPath: "orderAPI",
  tagTypes: ["orders"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7180/api/Order",
    prepareHeaders: (headers, { getState }) => {
      const { adminToken } = getState().auth;
      if (adminToken) {
        headers.set("Authorization", `Bearer ${adminToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (pageNumber) => ({
        method: "GET",
        url: `/orders/${pageNumber}`,
      }),
      providesTags: ["orders"],
    }),
    getOrder: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/${id}`,
      }),
      providesTags: ["orders"],
    }),
    orderUpdatePartial: builder.mutation({
      query: ({ id, path }) => ({
        method: "PATCH",
        url: `/${id}`,
        body: [
          {
            path: `/${path}`,
            op: "replace",
            value: "true",
          },
        ],
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});
export default orderAPI;
export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useOrderUpdatePartialMutation,
} = orderAPI;
