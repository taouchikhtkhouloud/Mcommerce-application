const express = require("express");
const {getCartProducts, addCartProduct, deleteCartProduct, checkout} = require("../controllers/cartController");
const validateToken = require('../middleware/tokenValidationMiddleware');

const router = express.Router();

router.get("/", validateToken, getCartProducts);

router.post("/", validateToken, addCartProduct);

router.delete("/checkout", validateToken, checkout);

router.delete("/:productId", validateToken, deleteCartProduct);


module.exports = router