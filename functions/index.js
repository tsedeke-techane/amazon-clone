const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (req, res) => {    
    res.send("Hello from Firebase!");
}
);
app.post("/payment/create", async (req, res)=> {
    const total = req.query.total;
    if (total > 0) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd",
        });
        res.status(201).json( {
            clientSecret: paymentIntent.client_secret,
        });

    }
    else {
        res.status(400).json({error: "Invalid amount"});
    }
}
);

exports.api = onRequest(app); 
