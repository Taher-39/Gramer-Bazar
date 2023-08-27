import React from "react";
import ProductDetails from "../features/productList/components/ProductDetails";
import Navbar from "../features/navbar/Navbar";

const ProductDetailsPage = () => {
  return (
    <div>
      <Navbar/>
      <ProductDetails />
    </div>
  );
};

export default ProductDetailsPage;
