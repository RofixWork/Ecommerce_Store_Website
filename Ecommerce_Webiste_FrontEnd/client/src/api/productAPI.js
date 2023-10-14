import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const productAPI = createApi({
  reducerPath: "productAPI",
  tagTypes: ["products"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/storeAPI/api/Product",
    prepareHeaders: (headers, { getState }) => {
      const { adminToken } = getState().auth;
      if (adminToken) {
        headers.set("Authorization", `Bearer ${adminToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (pageNumber) => ({
        url: `/Products?pageNumber=${pageNumber}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    createProduct: builder.mutation({
      query: (body) => {
        return {
          url: "/Create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    getCategoryProdcucts: builder.query({
      query: ({ categoryName, pageNumber }) => ({
        method: "GET",
        url: `/GetCategoryProducts/${categoryName}/${pageNumber}`,
      }),
    }),
    searchProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        method: "GET",
        url: `/SearchProducts/${keyword}/${pageNumber}`,
      }),
    }),
  }),
});
export default productAPI;
export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoryProdcuctsQuery,
  useSearchProductsQuery,
} = productAPI;
