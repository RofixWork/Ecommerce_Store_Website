import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const paymentAPI = createApi({
  reducerPath: "paymentAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/storeAPI/api/Payments",
  }),
  endpoints: (builder) => ({
    sendPayment: builder.mutation({
      query: (payemntData) => ({
        method: "POST",
        url: "/create-checkout-session",
        body: payemntData,
      }),
    }),
    verifyPayment: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/verify-payment/${id}`,
      }),
    }),
  }),
});

export default paymentAPI;
export const { useSendPaymentMutation, useVerifyPaymentQuery } = paymentAPI;
