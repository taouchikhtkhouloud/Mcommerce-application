const PaymentModel = require('../models/paymentModel');
const axios = require('axios');
const amqp = require('amqplib');
var channel, connection;
/* async function setupRabbitMQ() {
    const connection = await amqp.connect('amqp://localhost'); // Update with your RabbitMQ server URL
    const channel = await connection.createChannel();

    // Define a queue for communication
    const queueName = 'payment_confirmation';
    await channel.assertQueue(queueName, { durable: true });

    return { connection, channel, queueName };
} */

/* async function sendPaymentConfirmation(userId, cartItems) {
    const { channel, queueName } = await setupRabbitMQ();

    const message = {
        userId: userId,
        cartItems: cartItems, // Pass your cart items data here
    };

    channel.sendToQueue('email_confirmation', Buffer.from(JSON.stringify(message)));
} */

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PAYMENT");
}
connect();

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
        console.log(cartItems)

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
        channel.sendToQueue(
            "EMAIL",
            Buffer.from(
                JSON.stringify({
                    cartItems,
                    userId,
                })
            )
        );
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