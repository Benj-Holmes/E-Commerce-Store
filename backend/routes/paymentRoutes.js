const { Router } = require('express');
const pool = require('../config/db');
const router = Router();
const Stripe = require("stripe")
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

const attemptPayment = async (req, res) => {
    // Stripe Config
    const line_items = req.body.cartItems.map((item) => {
        
        const priceWithoutPoundSymbol = item.price.replace('£', '');
        const unitAmount = parseInt(parseFloat(priceWithoutPoundSymbol) * 100, 10);

        return {
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: item.name,
                    description: item.description,
                    metadata: {
                        id: item.product_id
                    },
                },
                unit_amount: unitAmount,
            },
            quantity: item.quantity,
        }
    })
         
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout-success',
      cancel_url: 'http://localhost:3000/account',
    });
  
    res.send({url: session.url});
  }


router.post('/create-checkout-session', attemptPayment);


module.exports = router;