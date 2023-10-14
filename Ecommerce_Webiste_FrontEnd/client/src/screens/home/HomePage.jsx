import React from "react";
import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import Categories from "../../components/home/Categories";
import HomeProducts from "../../components/home/HomeProducts";

const HomePage = () => {
  return (
    <>
      <Nav />
      <Slider />
      <div className="container">
        <Categories />
        <HomeProducts />
      </div>
    </>
  );
};

export default HomePage;
