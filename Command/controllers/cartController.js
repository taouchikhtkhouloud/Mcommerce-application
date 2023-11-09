const CartModel = require('../models/cartModel');
const axios = require('axios');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const getCartProducts = async (req, res) => {
    try {
        const cartProducts = await CartModel.find({ UserId: req.user.id, paid: false });
        const ProductsCart = [];
        let total = 0;

        const getProductData = async (cartProduct) => {
            const product = await axios.get(`http://localhost:3002/products/${cartProduct.ProductId}`);
            const productData = product.data;
            return productData;
        };

        const productDataPromises = cartProducts.map(getProductData);

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

        res.status(200).json({ ProductsCart, total });
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCard = async (req, res) => {
    try {
        const cartProducts = await CartModel.find({ UserId: req.params.userId, paid: false });
        if (!cartProducts) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(cartProducts);
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addCartProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.body.productid;
        const quantity = req.body.quantity;

        const product = await axios.get(`http://localhost:3002/products/${productId}`);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (quantity <= 0 || quantity > product.stock) {
            return res.status(400).json({ error: 'Invalid quantity' });
        }

        const cartProduct = await CartModel.create({
            UserId: userId,
            ProductId: productId,
            Quantity: quantity
        });

        res.status(200).json(cartProduct);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteCartProduct = async (req, res) => {
    try {
        console.log("id", req.params.productId);
        const cartProduct = await CartModel.findOneAndDelete({
            _id: new ObjectId(req.params.productId)
        });

        if (!cartProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const checkout = async (req, res) => {
    try {
        const buyCart = await CartModel.updateMany({ UserId: req.params.userId, paid: false }, { $set: { paid: true } });
        res.status(200).json({ buyCart });
    } catch (error) {
        console.error('Error checking out cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getCartProducts,
    addCartProduct,
    deleteCartProduct,
    checkout,
    getCard
};
