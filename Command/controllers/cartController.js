const CartModel = require('../models/cartModel');
const axios = require('axios');
const getCartProducts = async (req, res) => {
    const cartProducts = await CartModel.find({ UserId: req.user.id, paid: false });
    const ProductsCart = [];
    let total = 0;

    const getProductData = async (cartProduct) => {
        const product = await axios.get(`http://localhost:3002/products/${cartProduct.ProductId}`);
        const productData = product.data;
        return productData;
    };

    const productDataPromises = cartProducts.map(getProductData);

    try {
        const productDataArray = await Promise.all(productDataPromises);

        productDataArray.forEach((productData, index) => {
            if (!productData) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const product = productDataArray[index];
            const quantityDemanded = cartProducts[index].Quantity;
            const productCartId = cartProducts[index]._id;

            const productWithQuantity = {
                ...product,
                price: product.price * quantityDemanded,
                quantity: quantityDemanded,
                productcartId: productCartId,
            };

            ProductsCart.push(productWithQuantity);
            total += productWithQuantity.price;
        });

        res.json({ ProductsCart, total });
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getCard = async (req, res)=>{
    const cartProducts = await CartModel.find({ UserId: req.params.userId, paid: false });
    if (!cartProducts) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(cartProducts);

}

const addCartProduct = async (req, res) => {
    const userId = req.user.id;
    const productId = req.body.productid;
    const quantity = req.body.quantity;


    // Check if the product exists and has sufficient quantity (based on the quantity requested)
    const product = await axios.get(`http://localhost:3002/products/${productId}`);
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    if (quantity <= 0 || quantity > product.stock) {
        return res.status(400).json({ error: 'Invalid quantity' });
    }

    // Create a new cartProduct with the user ID, product ID, and quantity
    const cartProduct = await CartModel.create({
        UserId: userId,
        ProductId: productId,
        Quantity: quantity
    });

    res.json(cartProduct);
}


const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const deleteCartProduct = async (req, res) => {
    try {
        console.log("id", req.params.productId);
        const cartProduct = await CartModel.findOneAndDelete({
            _id: new ObjectId(req.params.productId)
        });

        if (!cartProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const checkout = async (req, res) => {
    const buyCart = await CartModel.updateMany({ UserId: req.params.userId, paid: false }, { $set: { paid: true } });    // console.log(cartProducts);
    res.json({buyCart});

}

module.exports = {
    getCartProducts,
    addCartProduct,
    deleteCartProduct,
    checkout,
    getCard
}