import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryAPI = createApi({
  reducerPath: "categoryAPI",
  tagTypes: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/storeAPI/api/Category",
    prepareHeaders: (headers, { getState }) => {
      const { adminToken } = getState().auth;
      if (adminToken) {
        headers.set("Authorization", `Bearer ${adminToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //all
    allCategories: builder.query({
      query: () => {
        return {
          url: "/Categories",
          method: "GET",
        };
      },
    }),
    //get all [paginate]
    getCategories: builder.query({
      query: (pageNumber) => {
        return {
          url: `/Categories/${pageNumber}`,
          method: "GET",
        };
      },
      providesTags: ["categories"],
    }),
    //create
    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/Create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["categories"],
    }),
    //get one
    getCategory: builder.query({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
      providesTags: ["categories"],
    }),
    getRandomCategories: builder.query({
      query: () => ({
        url: "/GetRandomCategories",
        method: "GET",
      }),
    }),
    //update
    updateCategory: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["categories"],
    }),
    //delete
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});
export default categoryAPI;
export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAllCategoriesQuery,
  useGetRandomCategoriesQuery,
} = categoryAPI;
