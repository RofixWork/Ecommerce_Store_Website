import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Quantity = ({ quantity, handleDecrement, handleIncrement }) => {
  return (
    <div className="flex">
      <button
        onClick={handleDecrement}
        className="border border-gray-300 border-r-0 w-[50px] h-[50px] cursor-pointer text-3xl flex justify-center items-center"
        type="button"
      >
        <AiOutlineMinus size={20} className="text-gray-900" />
      </button>
      <span className="w-[100px] border border-gray-300 outline-none text-lg font-bold flex items-center justify-center">
        {quantity}
      </span>
      <button
        onClick={handleIncrement}
        className="border border-gray-300 border-l-0 w-[50px] h-[50px] cursor-pointer text-3xl flex justify-center items-center"
        type="button"
      >
        <AiOutlinePlus size={20} className="text-gray-900" />
      </button>
    </div>
  );
};

export default Quantity;
