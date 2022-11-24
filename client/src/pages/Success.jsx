import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { userRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";

const Success = () => {
  // const location = useLocation();
  // in Cart.jsx I sent data and cart.Please check that page for the changes.(in video it's only data)
  // const data = location.state.stripeData;
  // const cart = location.state.products;
  // const currentUser = useSelector((state) => state.user.currentUser);
  const data = useSelector((state) => state.cartData.currentCartData);
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);


  const [orderId, setOrderId] = useState(null);



  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);

      } catch { }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  const Navigate = useNavigate()
  const homepage = () => {
    Navigate("/")



  }
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }} onClick={homepage}>Go to Homepage</button>
    </div>
  );
};

export default Success;