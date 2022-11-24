const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/product");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const { MONGO_URL, PASS_SEC, JWT_TOKEN, STRIPE_KEY } = require('./config/key')

const cors = require("cors");

dotenv.config();

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB conect Succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productsRoute);
app.use("/api/carts", CartRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/checkout", stripeRoute);

if (process.env.NODE_ENV == 'production') {
  const path = require("path");
  app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')))
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}
app.listen("https://e-commerce-mern-shopping-project.vercel.app/", () => {
  console.log("backend server is running");
});
