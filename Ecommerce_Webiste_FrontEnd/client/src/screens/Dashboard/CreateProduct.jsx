import React, { useEffect, useState } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "../../Layout/Wrapper";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import { useAllCategoriesQuery } from "../../api/categoryAPI";
import { TwitterPicker } from "react-color";
import { v4 as uuidv4 } from "uuid";
import Colors from "../../components/Colors";
import Sizes from "../../components/Sizes";
import ImagePreview from "../../components/ImagePreview";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateProductMutation } from "../../api/productAPI";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  //navigate
  const navigate = useNavigate();
  //create product by mutation
  const [
    createProduct,
    {
      isLoading,
      isSuccess: isProductCreateSuccess,
      data: productData,
      error,
      isError,
    },
  ] = useCreateProductMutation();
  //get errors
  const getAllErrors = error?.data?.errors || [];
  //get categories
  const { data, isSuccess } = useAllCategoriesQuery();
  //text editor state
  const [value, setValue] = useState("");

  //data
  const [state, setState] = useState(() => ({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "0",
    colors: [],
    sizes: [],
    image1: "",
    image2: "",
    image3: "",
  }));
  //image preview
  const [imagesPreview, setImagesPreview] = useState(() => {
    return {
      image1: "",
      image2: "",
      image3: "",
    };
  });
  //sizes
  const [sizes] = useState(() => {
    return [
      { id: uuidv4(), name: "xsm" },
      { id: uuidv4(), name: "sm" },
      { id: uuidv4(), name: "md" },
      { id: uuidv4(), name: "lg" },
      { id: uuidv4(), name: "xl" },
    ];
  });
  //handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  //handle colors
  const handleColors = (color) => {
    //check color {exist or not}
    const isExist = state.colors.some((c) => c.color === color.hex);
    //not exist
    if (!isExist) {
      setState((prev) => {
        return {
          ...prev,
          colors: [...prev.colors, { id: uuidv4(), color: color.hex }],
        };
      });
    }
    //exist
    else {
      alert(`The Color <${color.hex}> already Exist`);
    }
  };

  //delete Color
  const handleDeleteColor = (id) => {
    setState((prev) => {
      const filterColors = prev.colors.filter((c) => c.id !== id);
      return { ...prev, colors: filterColors };
    });
  };

  //handle sizes
  const handleSizes = (size) => {
    const isSizeExist = state.sizes.some((s) => s.id === size.id);
    if (isSizeExist) {
      alert(`The Size <${size.name}> already Exist`);
      return;
    }
    setState((prev) => {
      return { ...prev, sizes: [...state.sizes, size] };
    });
  };

  //delete size
  const handleDeleteSize = (id) => {
    setState((prev) => {
      const filterSizes = state.sizes.filter((s) => s.id !== id);
      return { ...prev, sizes: filterSizes };
    });
  };

  //handle images
  const handleChangeImage = (e) => {
    const files = e.target.files;
    if (files.length <= 0) return;

    const extensionsAllowed = ["image/png", "image/jpeg"];

    if (!extensionsAllowed.includes(files[0].type)) {
      toast.success(`This extension <${files[0].type}> not allowed`);
      return;
    }

    //save image and create url (base 64)
    const reader = new FileReader();
    setState((prev) => {
      return { ...prev, [e.target.name]: files[0] };
    });
    reader.onloadend = (ev) => {
      setImagesPreview((prev) => {
        return { ...prev, [e.target.name]: ev.target.result };
      });
    };
    reader.readAsDataURL(files[0]);
  };
  //create products
  const handleCreateProduct = (e) => {
    e.preventDefault();
    const {
      title,
      price,
      discount,
      stock,
      category,
      colors,
      sizes,
      image1,
      image2,
      image3,
    } = state;
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Price", price);
    formData.append("Discount", discount);
    formData.append("Stock", stock);
    formData.append("CategoryId", parseInt(category));
    formData.append("Colors", JSON.stringify(colors));
    formData.append("Sizes", JSON.stringify(sizes));
    formData.append("Image1", image1);
    formData.append("Image2", image2);
    formData.append("Image3", image3);
    formData.append("Description", value);
    createProduct(formData);
  };
  //handle errors by use effect hook
  useEffect(() => {
    if (getAllErrors.length) {
      getAllErrors.forEach((error) => {
        toast.error(error);
      });
    }
  }, [isError]);
  //product has been created
  useEffect(() => {
    let time;
    if (productData) {
      toast.success(productData.message);
      time = setTimeout(() => {
        navigate("/dashboard/products");
      }, 1000);
    }
    return () => clearTimeout(time);
  }, [isProductCreateSuccess]);
  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <ScreenHeader
        title="product List"
        link="/dashboard/products"
        icon={<ArrowSmallLeftIcon className="h-5 w-5" />}
      />
      {/* form */}
      <form
        onSubmit={handleCreateProduct}
        className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-2"
      >
        <div className="grid gap-x-2 grid-cols-1 md:grid-cols-2 md:col-span-2">
          <div className="mb-4">
            <h4 className="mb-4 text-gray-300">Title</h4>
            <input
              type="text"
              className="form-control"
              placeholder="Ttile..."
              value={state.title}
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <h4 className="mb-4 text-gray-300">Price</h4>
            <input
              type="number"
              className="form-control"
              placeholder="Price..."
              value={state.price}
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <h4 className="mb-4 text-gray-300">Discount</h4>
            <input
              type="number"
              className="form-control"
              placeholder="Discount..."
              value={state.discount}
              name="discount"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <h4 className="mb-4 text-gray-300">Stock</h4>
            <input
              type="number"
              className="form-control"
              placeholder="Stock..."
              value={state.stock}
              name="stock"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <h4 className="mb-4 text-gray-300">Choose Category</h4>
            <select
              className="form-control capitalize"
              value={state.category}
              name="category"
              onChange={handleChange}
            >
              <option hidden>Choose_Category</option>
              {isSuccess && data?.categories?.length
                ? data?.categories?.map((category) => {
                    return (
                      <option
                        className="capitalize"
                        value={category.id}
                        key={category.id}
                      >
                        {category.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="mb-4">
            <h4 className="mb-4 text-gray-300">Choose Colors</h4>
            <TwitterPicker onChangeComplete={handleColors} />
          </div>
          <div className="mb-4">
            <h4 className="mb-4 text-gray-300">Select Size</h4>
            <div className="flex gap-x-3 flex-wrap">
              {sizes.length ? (
                <>
                  {sizes.map((size) => {
                    return (
                      <div
                        key={size.id}
                        onClick={() => handleSizes(size)}
                        className="mb-2 px-3 py-1 border border-white rounded-sm font-semibold uppercase cursor-pointer"
                        id={size.id}
                      >
                        {size.name}
                      </div>
                    );
                  })}
                </>
              ) : null}
            </div>
          </div>
          <div className="mb-4 col-span-2">
            <h4 className="mb-4 text-gray-300">Choose Image 1</h4>
            <input
              type="file"
              className="file:bg-indigo-600 file:text-white file:px-5 file:py-3 file:rounded-md file:border-0 file:capitalize file:cursor-pointer file:font-mono"
              name="image1"
              onChange={handleChangeImage}
            />
          </div>
          <div className="mb-4 col-span-2">
            <h4 className="mb-4 text-gray-300">Choose Image 2</h4>
            <input
              type="file"
              className="file:bg-indigo-600 file:text-white file:px-5 file:py-3 file:rounded-md file:border-0 file:capitalize file:cursor-pointer file:font-mono"
              name="image2"
              onChange={handleChangeImage}
            />
          </div>
          <div className="mb-4 col-span-2">
            <h4 className="mb-4 text-gray-300">Choose Image 3</h4>
            <input
              type="file"
              className="file:bg-indigo-600 file:text-white file:px-5 file:py-3 file:rounded-md file:border-0 file:capitalize file:cursor-pointer file:font-mono"
              name="image3"
              onChange={handleChangeImage}
            />
          </div>
          <div className="mb-3 col-span-2">
            <h4 className="mb-4 text-gray-300">Description</h4>
            <ReactQuill
              theme="snow"
              value={value}
              placeholder="Description"
              onChange={setValue}
            />
          </div>
          <div className="mb-3">
            <button className="btn-submit">
              {isLoading ? "Loading" : "Save Product"}
            </button>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <Colors
              colors={state.colors}
              handleDeleteColor={handleDeleteColor}
            />
          </div>
          <div className="mb-4">
            <Sizes sizes={state.sizes} handleDeleteSize={handleDeleteSize} />
          </div>
          <div className="mb-4">
            <ImagePreview url={imagesPreview.image1} heading={"image One"} />
            <ImagePreview url={imagesPreview.image2} heading={"image Two"} />
            <ImagePreview url={imagesPreview.image3} heading={"image Three"} />
          </div>
        </div>
      </form>
      {/* form */}
    </Wrapper>
  );
};

export default CreateProduct;
