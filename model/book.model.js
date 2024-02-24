const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    bookname:{
        type:String,
        required:true,
        lowercase:true
    },
    bookauthor:{
        type:String,
        required:true,
        lowercase:true
    },
    description:{
        type:String,
        required:true
    },
    bookpublishyear:{
        type:String,
        required:true,
        lowercase:true
    },
    bookpublication:{
        type:String,
        required:true,
        lowercase:true
    },
    category:{
        type:String,
        required:true
    }
    // category:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Category"
    // }
},{timestamps:true})

const Book = mongoose.model("Book" , BookSchema);
module.exports = Book