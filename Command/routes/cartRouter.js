const express = require("express");
const {getCartProducts, addCartProduct, deleteCartProduct, checkout, getCard} = require("../controllers/cartController");
const validateToken = require('../middleware/tokenValidationMiddleware');

const router = express.Router();

router.get("/", validateToken, getCartProducts);
router.get("/:userId",  getCard);

router.post("/", validateToken, addCartProduct);

router.put("/:userId", checkout);

router.delete("/:productId", validateToken, deleteCartProduct);


module.exports = router