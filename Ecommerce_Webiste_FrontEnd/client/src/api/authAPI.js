import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApi = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/storeAPI/api/Auth" }),
  endpoints: (builder) => {
    return {
      authRegister: builder.mutation({
        query: (registerData) => ({
          url: "/Register",
          method: "POST",
          body: registerData,
        }),
      }),
      authLogin: builder.mutation({
        query: (loginData) => {
          return {
            url: "/Login",
            method: "POST",
            body: loginData,
          };
        },
      }),
    };
  },
});
export default authApi;
export const { useAuthLoginMutation, useAuthRegisterMutation } = authApi;
