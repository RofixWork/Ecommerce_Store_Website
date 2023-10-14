import React, { useEffect, useState } from "react";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import Wrapper from "../../Layout/Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../api/categoryAPI";
const UpdateCategory = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(() => {
    return { name: "" };
  });
  //get param
  const { id } = useParams();
  //get one category ny id
  const { isLoading, data, isSuccess } = useGetCategoryQuery(id);

  //update categou
  const [
    updateCategory,
    { error, isSuccess: categoryUpdateSuccess, data: getCategoryData },
  ] = useUpdateCategoryMutation();
  console.log(error);
  //get all errors
  const getErrors = error?.data?.errors || [];
  //update
  const handleUpdateCategory = (e) => {
    e.preventDefault();
    updateCategory({ id, body: categoryData });
  };

  useEffect(() => {
    if (isSuccess) {
      setCategoryData((prev) => {
        return { ...prev, name: data?.category?.name };
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    let time;
    if (categoryUpdateSuccess) {
      time = setTimeout(() => {
        navigate("/dashboard/categories");
      }, 1000);
    }

    return () => {
      clearTimeout(time);
    };
  }, [categoryUpdateSuccess]);

  return (
    <Wrapper>
      <ScreenHeader
        title="categories"
        link="/dashboard/categories"
        icon={<ArrowSmallLeftIcon className="h-5 w-5" />}
      />
      <form onSubmit={handleUpdateCategory} className="w-full sm:w-8/12">
        <h3 className="text-xl font-semibold mb-3">Update Category Name</h3>
        {/* ?print errors */}
        {getErrors?.length
          ? getErrors.map((error, index) => {
              return (
                <div className="alert-error" key={index}>
                  <h3>{error}</h3>
                </div>
              );
            })
          : null}
        {/* ?print errors */}
        {/* print message success */}
        {categoryUpdateSuccess ? (
          <div className="alert-success">
            <h3>{getCategoryData?.message}</h3>
          </div>
        ) : null}
        {/* print message sucess */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Category Name..."
            className="form-control"
            value={categoryData.name}
            onChange={(e) =>
              setCategoryData((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
        </div>
        <button className="btn-submit">
          {isLoading ? "Loading..." : "Update Category"}
        </button>
      </form>
    </Wrapper>
  );
};

export default UpdateCategory;
