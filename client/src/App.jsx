import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Cart } from "./pages/Cart";
import { Routes, Route, Navigate } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import("./app.css")


const App = () => {
  const user = useSelector((state) => state.user.currentUser)
  return (
    <>

      <Routes>

        <Route path="/success" element={<Success />} />
        <Route path="/cart" element={<Cart />} />

        <Route exact path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate replace to="/" /> : <Register />}
        />
      </Routes>

    </>
  );
};

export default App;
