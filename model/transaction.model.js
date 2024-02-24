const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    borroweduser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    borrowedbook:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    },
    checkoutdate:{
        type:Date,
        default:Date.now
    },
    duedate:{
        type:Date
    }
},{timestamps:true})

TransactionSchema.pre("save" , function(next){
    this.duedate = new Date(this.checkoutdate.getTime() + 20*24*60*60*1000)
    next();
});

const Transaction = mongoose.model("Transaction" , TransactionSchema)
module.exports = Transaction