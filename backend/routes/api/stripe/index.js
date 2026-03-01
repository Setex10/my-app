const express = require("express");
const actualizarInventario = require("../../../utils/actualizarInventario");
const route = express.Router()
const stripe = require("../../../stripe.js");

route.post("/api/stripe-webhook",
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    console.log("hdasas")
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

    const lineItems = await stripe.checkout.sessions.listLineItems(
            session.id,
            { expand: ["data.price.product"] }
    );

    await actualizarInventario(lineItems.data);
    }

    res.json({ received: true });
  }
);

module.exports = route