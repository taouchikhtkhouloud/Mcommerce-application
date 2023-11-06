const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());


require('dotenv').config();
require('./config/db_conn');
const port = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/payment", require("./routes/paymentRouter"))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
