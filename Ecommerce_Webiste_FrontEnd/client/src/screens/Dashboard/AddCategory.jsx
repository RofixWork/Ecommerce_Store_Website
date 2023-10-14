import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import Wrapper from "../../Layout/Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { useEffect, useState } from "react";
import { useCreateCategoryMutation } from "../../api/categoryAPI";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  //API
  const [createCategory, { error, isLoading, isSuccess, data }] =
    useCreateCategoryMutation();
  //use state
  const [categoryData, setCategoryData] = useState(() => {
    return { name: "" };
  });
  //get errors
  const getErrors = error?.data?.errors || [];
  //create cateory func
  const createCategoryFunc = (e) => {
    e.preventDefault();
    createCategory(categoryData);
  };
  //effect
  useEffect(() => {
    let time;
    if (isSuccess) {
      time = setTimeout(() => {
        navigate("/dashboard/categories");
      }, 1000);
    }
    return () => clearTimeout(time);
  }, [isSuccess]);

  return (
    <Wrapper>
      <ScreenHeader
        title="categories"
        link="/dashboard/categories"
        icon={<ArrowSmallLeftIcon className="h-5 w-5" />}
      />
      <form onSubmit={createCategoryFunc} className="w-full sm:w-8/12">
        <h3 className="text-xl font-semibold mb-3">Create a new Category</h3>
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
        {isSuccess ? (
          <div className="alert-success">
            <h3>{data?.message}</h3>
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
          {isLoading ? "Loading..." : "Create Category"}
        </button>
      </form>
    </Wrapper>
  );
};

export default AddCategory;
