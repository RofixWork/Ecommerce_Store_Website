// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useGetRandomCategoriesQuery } from "../../api/categoryAPI";
import Spinner from "../Spinner";

// images
const images = [
  "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1477901492169-d59e6428fc90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
];

const Slider = () => {
  const { isSuccess, data, isLoading } = useGetRandomCategoriesQuery();
  const sliderData = data?.randomCategories?.length
    ? data?.randomCategories?.map((category, index) => {
        return {
          id: category.id,
          image: images[index],
          category: category.name,
          btnText: "Browse Collections",
          btnLink: `/cat-products/${category.name}`,
        };
      })
    : [];
  return (
    <div className="mt-[60px]">
      {!isLoading ? (
        isSuccess && data?.randomCategories?.length ? (
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {sliderData?.length ? (
              <>
                {sliderData.map(({ id, image, category, btnLink, btnText }) => {
                  return (
                    <SwiperSlide key={id}>
                      <img src={image} alt={id} loading="lazy" />
                      <div className="swiper-slide-overlay">
                        <div className="text-white">
                          <h1 className="capitalize text-2xl sm:text-4xl lg:text-5xl font-bold mb-5">
                            {category}
                          </h1>
                          <Link
                            to={btnLink}
                            className="bg-indigo-500 px-5 font-semibold py-3 rounded-sm cursor-pointer hover:bg-indigo-600 transition-all inline-block"
                          >
                            {btnText}
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </>
            ) : null}
          </Swiper>
        ) : null
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Slider;
