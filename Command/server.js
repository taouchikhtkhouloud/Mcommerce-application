const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());


require('dotenv').config();
require('./config/db_conn');
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/cart", require("./routes/cartRouter"))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
