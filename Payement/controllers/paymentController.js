const PaymentModel = require('../models/paymentModel');
const axios = require('axios');

const getPaymentItems = async (req, res) => {
    try {
      const payments = await PaymentModel.find({ UserId: req.user.id });
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching payments' });
    }
  };

  const buyCartItems = async (req, res) => {
    console.log('test')
    const userId = req.user.id;
    console.log('id',userId)

    try {
        // Check if the product exists and has sufficient quantity (based on the quantity requested)
        const getItems = await axios.get(`http://localhost:3003/cart/${userId}`);
        const cartItems = getItems.data;
        
        if (!cartItems) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Update the paid attribute to true for the buyer's items
        const buyCart = await axios.put(`http://localhost:3003/cart/${userId}`);
        for (const cartItem of cartItems) {
            const paymentInfo = {
                UserId: userId,
                CartId: cartItem._id,
            };

            // Create a new payment document for each item and save it
            const payment = new PaymentModel(paymentInfo);
            await payment.save();
        }

        return res.json({ message: 'Cart items purchased successfully' });

    } catch (error) {
        console.error('Error updating cart items:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports = {
    getPaymentItems,
    buyCartItems,
    
}