"use client";
import { useState, useMemo } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {

  const [priceSortDirection, setPriceSortDirection] = useState<"asc" | "desc" | "">("");

const sortedProductList = useMemo(() => {
  if (!Array.isArray(products)) return [];

  return [...products].sort((a, b) => {
    if (priceSortDirection === "asc") return a.price - b.price;
    if (priceSortDirection === "desc") return b.price - a.price;
    return 0;
  });
}, [products, priceSortDirection]);


  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="  mb-4 flex items-center flex-col">
        <h1
          className=" headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* <p className=" text-base text-secondary">Best in the Market</p> */}
      </section>

      <section className="flex justify-end lg:mx-20 mb-4">
        <div className="px-6 py-3 bg-white rounded-md shadow-sm border border-gray-200">
          <label
            className="text-sm font-medium text-gray-700 mr-3 self-center"
            htmlFor="priceSort"
          >
            Sort by price:
          </label>
          <select
            id="priceSort"
            className="text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition duration-150 ease-in-out"
            value={priceSortDirection}
            onChange={(e) => setPriceSortDirection(e.target.value as "asc" | "desc" | "")}
          >
            <option value="">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3
       lg:mx-20 overflow-hidden
      "
      >
        {/* === MAP PRODUCTS  */}
        {sortedProductList?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
