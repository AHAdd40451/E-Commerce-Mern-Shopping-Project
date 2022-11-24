import styled from "styled-components";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";
import { publicRequest } from "../requestMethod";


const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    const getproducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `products?category=${cat}`
            : "products"
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getproducts();
  }, [products, cat, filters, sort]);

  useEffect(() => {
    cat &&
      setFilteredProduct(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );

  }, [products, cat, filters]);


  useEffect(() => {
    if (sort === "newest") {
      setFilteredProduct((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProduct((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProduct((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [products, cat, filters, sort]);
  // console.log(filteredProduct)


  return (
    <Container>
      {cat
        ? filteredProduct.map((item) => <Product item={item} key={item._id} />)
        : products
          .slice(0, 8)
          .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
