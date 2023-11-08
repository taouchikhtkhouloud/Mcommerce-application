const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema(
{
    UserId: 
    {
        type: String 
    },

    CartId: 
    {
        type: String 
    }
}, 

{
    timestamps: true
}

);

module.exports = mongoose.model("Payment", PaymentSchema);