import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const userOrderAPI = createApi({
  reducerPath: "userOrderAPI",
  tagTypes: ["userOrders"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/storeAPI/api/Order",
    prepareHeaders: (headers, { getState }) => {
      const { userToken } = getState().auth;
      if (userToken) {
        headers.set("Authorization", `Bearer ${userToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: ({ pageNumber, userId }) => ({
        method: "GET",
        url: `/user-orders/${pageNumber}?userId=${userId}`,
      }),
      providesTags: ["userOrders"],
    }),
    getUserOrderDetails: builder.query({
      query: ({ orderId, userId }) => ({
        method: "GET",
        url: `/user-order-details/${orderId}?userId=${userId}`,
      }),
      providesTags: ["userOrders"],
    }),
    userUpdateOrderPartial: builder.mutation({
      query: ({ id, userId, path }) => ({
        method: "PATCH",
        url: `/user-update-order/${id}?userId=${userId}`,
        body: [
          {
            path: `/${path}`,
            op: "replace",
            value: "true",
          },
          {
            path: "/updatedData",
            op: "replace",
            value: new Date(),
          },
        ],
      }),
      invalidatesTags: ["userOrders"],
    }),
  }),
});

export default userOrderAPI;
export const {
  useGetUserOrdersQuery,
  useGetUserOrderDetailsQuery,
  useUserUpdateOrderPartialMutation,
} = userOrderAPI;
