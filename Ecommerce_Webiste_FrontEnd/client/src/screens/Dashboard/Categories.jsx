import { PlusIcon } from "@heroicons/react/24/solid";
import Wrapper from "../../Layout/Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../api/categoryAPI";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Categories = () => {
  //get patam value
  const { pageNumber } = useParams();
  //resposne data
  const { data, isLoading } = useGetCategoriesQuery(pageNumber || 1);
  const [deleteCategory, { isSuccess, data: deleteCategryData }] =
    useDeleteCategoryMutation();

  //delete category
  const handleDeleteCategory = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this category"
    );
    if (confirm) {
      deleteCategory(id);
    }
  };

  return (
    <Wrapper>
      <ScreenHeader
        title="add category"
        link="/dashboard/add-category"
        icon={<PlusIcon className="h-5 w-5" />}
      />
      {/* print message success */}
      {isSuccess ? (
        <div className="alert-success">
          <h3>{deleteCategryData?.message}</h3>
        </div>
      ) : null}
      {/* print message sucess */}
      {!isLoading ? (
        data?.categories?.items.length ? (
          <table className="w-full bg-gray-900 rounded-md">
            <thead>
              <tr className="border-b border-b-gray-800 text-left">
                <th className="px-3 py-4 uppercase text-gray-400">Name</th>
                <th className="px-3 py-4 uppercase text-gray-400  ">Edit</th>
                <th className="px-3 py-4 uppercase text-gray-400">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.categories?.items?.map((category) => {
                return (
                  <tr key={category.id} className="odd:bg-gray-800">
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      {category.name}
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      <Link to={`/dashboard/update-category/${category.id}`}>
                        Edit
                      </Link>
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h3>No Items</h3>
        )
      ) : (
        <Spinner />
      )}
      {/* paginate */}
      <Pagination
        pageNumber={data?.categories?.pageNumber}
        count={data?.categories?.count}
        pageSize={data?.categories?.pageSize}
        link="/dashboard/categories"
      />
    </Wrapper>
  );
};

export default Categories;
