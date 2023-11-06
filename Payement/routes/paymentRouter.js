const express = require("express");
const {getPaymentItems, buyCartItems} = require("../controllers/paymentController");
const validateToken = require('../middleware/tokenValidationMiddleware');

const router = express.Router();

router.get("/", validateToken, getPaymentItems);

//router.post("/", validateToken, addCartProduct);

router.post("/pay", validateToken, buyCartItems);

//router.delete("/:productId", validateToken, deleteCartProduct); 

module.exports = router