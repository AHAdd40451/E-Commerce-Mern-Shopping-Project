import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
// import Slider from "../components/Slider";
import Slidert from "../components/slider/Slidert";
import axios from "axios"
import { publicRequest } from "../requestMethod";



const Home = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getproducts = async () => {
      try {
        const res = await publicRequest.get(`products`);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getproducts();
  }, []);
  console.log(products)
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slidert products={products} />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
