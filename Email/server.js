const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());


require('dotenv').config();
require('./config/db_conn');
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/mail", require("./routes/emailRouter"))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
