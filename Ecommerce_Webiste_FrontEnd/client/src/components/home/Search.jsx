import { LiaSearchSolid } from "react-icons/lia";
import useForm from "../../hooks/Form";
import { useNavigate } from "react-router-dom";

const Search = ({ toggleSearchBar, setToggleSearchBar }) => {
  const navigate = useNavigate();
  const { state, onChange } = useForm({ keyword: "" });
  const handleSearchProducts = (e) => {
    e.preventDefault();
    navigate(`/search-products/${state.keyword}`);
    setToggleSearchBar("opacity-0 invisible");
  };
  return (
    <div
      className={`px-2 sm:px-0 fixed inset-0 bg-black/80 w-full min-h-screen flex justify-center transition-all duration-300 ease-in ${toggleSearchBar}`}
      onClick={() => setToggleSearchBar("opacity-0 invisible")}
    >
      <form
        onSubmit={handleSearchProducts}
        className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mt-10 relative"
      >
        <input
          value={state.keyword}
          name="keyword"
          onChange={onChange}
          onClick={(e) => e.stopPropagation()}
          type="text"
          className="w-full bg-white px-4 py-3 pr-14 rounded-sm block outline-none focus:ring-1 focus:ring-gray-300 transition-all text-lg font-semibold"
          placeholder="Search..."
        />
        <LiaSearchSolid className="absolute top-[14px] right-4" size={25} />
      </form>
    </div>
  );
};

export default Search;
