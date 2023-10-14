import React from "react";
import { useAllCategoriesQuery } from "../../api/categoryAPI";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { faker } from "@faker-js/faker";
import Skeleton from "./Skeleton";
import { Link } from "react-router-dom";

const Categories = () => {
  const { data, isSuccess } = useAllCategoriesQuery();
  return (
    <>
      {isSuccess && data?.categories?.length ? (
        <div className="mt-10 px-4">
          <Swiper
            className="w-full h-[150px]"
            modules={[Virtual]}
            slidesPerView={4}
            spaceBetween={20}
            virtual
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              991: {
                slidesPerView: 3,
              },
              1300: {
                slidesPerView: 4,
              },
            }}
          >
            {data?.categories?.map((category) => {
              return (
                <SwiperSlide
                  className={`overflow-hidden text-white capitalize rounded-md text-xl font-semibold relative`}
                  key={category.id}
                  virtualIndex={category.id}
                >
                  <img
                    src={faker.image.urlLoremFlickr({ category: "fashion" })}
                    loading="lazy"
                    alt={category.name}
                  />
                  <div className="swiper-slide-overlay">
                    <Link to={`/cat-products/${category.name}`}>
                      {category.name}
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <Skeleton numberOfItems="4" height="150px" />
      )}
    </>
  );
};

export default Categories;
