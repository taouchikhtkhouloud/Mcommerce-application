const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());


require('dotenv').config();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const axios = require('axios');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const amqp = require('amqplib');
var channel, connection;
async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("EMAIL");
}
const lock = new Map(); // Create a lock map to track which messages are being processed

connect().then(() => {
    channel.consume("EMAIL", async (data) => {
        console.log("Consuming EMAIL service");
        const { cartItems, userId } = JSON.parse(data.content);
        console.log("cartItems", cartItems);
        console.log("userId", userId)
       
        // Check if the message is already being processed
        if (!lock.has(userId)) {
            // Set a lock for this user
            lock.set(userId, true);

            // Process the message
      

            const sendEmail = await sendConfirmationMAil(userId, cartItems)
            .then(() => {
                channel.ack(data);
                lock.delete(userId);
                console.log("delete user lock") // Remove the lock
            }).catch((error) => {
                // Handle errors and release the lock
                console.error("Error sending email:", error);
                channel.ack(data);
                lock.delete(userId);
                 // Remove the lock
            });
        } else {
            // Message is already being processed, do not consume it again
            console.log(`Message for user ${userId} is already being processed.`);
            channel.ack(data);
        }
    });
});


const getProductData = async (cartProduct) => {
    const product = await axios.get(`http://localhost:3002/products/${cartProduct.ProductId}`);
    const productData = product.data;
    return productData;
};
async function sendConfirmationMAil(userId, cartItems) {
    try {
        const user = await axios.get(`http://localhost:3001/users/${userId}`);
        const userInfo = user.data;
        
        if (!userInfo) {
            console.error('User not found');
            return false;
        }
        
        const userEmail = userInfo.email;
        console.log('User email', userEmail);
        
        const productDataPromises = cartItems.map(getProductData);
        const productDataArray = await Promise.all(productDataPromises);
        
        const Products = [];
        
        productDataArray.forEach((productData, index) => {
            if (!productData) {
                console.error('Product not found');
                return false;
            }
            
            const product = productDataArray[index];
            const quantityDemanded = cartItems[index].Quantity;
            
            const productWithQuantity = {
                ...product,
                price: product.price * quantityDemanded,
                quantity: quantityDemanded,
            };
            
            Products.push(productWithQuantity);
        });
        
        console.log("Email", process.env.EMAIL);
        
        if (!process.env.EMAIL || !process.env.PASSWORD) {
            console.error('Email or password environment variables not set');
            return false;
        }
        
        const config = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        };
        
        let transporter = nodemailer.createTransport(config);
        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Mcommerce Service",
                link: 'https://mcommerce.com/',
            },
        });
        
        const cartItemsData = Products.map(item => ({
            item: item.name,
            description: item.description,
            quantity: item.quantity,
            price: `$${item.price.toFixed(2)}`,
        }));
        
        let response = {
            body: {
                name: userInfo.firstName + userInfo.lastName,
                intro: "Your bill has arrived!",
                table: {
                    data: cartItemsData,
                },
                outro: "Looking forward to doing more business",
            },
        };
        
        let mail = MailGenerator.generate(response);
        
        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Payment confirmation",
            html: mail,
        };
        
        const sendMailResult = await transporter.sendMail(message);
        console.log("Email sent successfully", sendMailResult);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return error;
    }
}






app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
