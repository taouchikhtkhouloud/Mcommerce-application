const express = require("express");
const {sendConfirmationMAil} = require("../controllers/emailController");
const validateToken = require('../middleware/tokenValidationMiddleware');

const router = express.Router();

router.get("/", validateToken, sendConfirmationMAil);

//router.post("/", validateToken, addCartProduct);


//router.delete("/:productId", validateToken, deleteCartProduct); 

module.exports = router