const router = require("express").Router();
const Stripe = require("stripe");
const { MONGO_URL, PASS_SEC, JWT_TOKEN, STRIPE_KEY } = require('../config/key')

const stripe = Stripe(STRIPE_KEY);
router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
