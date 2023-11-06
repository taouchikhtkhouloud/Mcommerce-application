const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
{
    UserId: 
    {
        type: String 
    },

    ProductId: 
    {
        type: String 
    },
    Quantity:
    {
        type: Number
    },
    paid:{
        type: Boolean,
        default: false
    }
}, 

{
    timestamps: true
}

);

module.exports = mongoose.model("Cart", cartSchema);