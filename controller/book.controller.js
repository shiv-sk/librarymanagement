const Book = require("../model/book.model")
const asyncHandler = require("../utils/asynchandler.utils")
const ApiError = require("../utils/errorhandler.utils")
const ApiResponse = require("../utils/responsehandler.utils")

exports.registerBook = asyncHandler(async (req,res)=>{
    //get bookmodel details
    //check for empty fileds
    //check if book already existed or not
    //then create a new book
    //use cron for email reaminders for due date this has to be in transaction model
    const {bookname,bookauthor,description,bookpublishyear,bookpublication,category} = req.body
    if([bookname,bookauthor,description,bookpublishyear,bookpublication,category].some((filed)=>{filed && filed.trim() === ""})){
        throw new ApiError(400,"all fields are required...")
    }
    const existedbook = await Book.findOne({$or:[{bookauthor},{bookname}]})
    if(existedbook){
        throw new ApiError(400,"already book is existed.")
    }
   const book = await Book.create({
        bookname:bookname.toLowerCase(),
        bookauthor:bookauthor.toLowerCase(),
        description,
        bookpublication,
        bookpublishyear,
        category
    })
    const createdbook = await Book.findById(book._id)
    if(!createdbook){
        throw new ApiError(400,"book is not created");
    }
    return res.status(200).json(
        new ApiResponse(201,createdbook,"book is created succesfully")
    )
})

exports.getAllBooks = asyncHandler(async (req,res)=>{
    const book = await Book.find()
    if(!book){
        throw new ApiError(404,"something is wrong with server")
    }
    return res.status(200).json(
        new ApiResponse(200,book.length, book,"all books are present in DB")
    )
    
})

exports.getBook = asyncHandler(async (req,res)=>{
    const book = await Book.findById(req.params.id)
    if(!book){
        throw new ApiError(404,"book is not found.")
    }
    return res.status(200).json(
        new ApiResponse(200 , book , "your requested book is")
    )
})

exports.updateBook = asyncHandler(async(req,res)=>{
    const updatedbook = await Book.findByIdAndUpdate(req.params.id , req.body,{new :true})
    if(!updatedbook){
        throw new ApiError(400, "your book is not updated!")
    }
    return res.status(200).json(
        new ApiResponse(204,updatedbook,"your book is successfully updated")
    )
})

exports.deleteBook = asyncHandler(async(req,res)=>{
    await Book.findByIdAndDelete(req.params.id)
    return res.status(200).json(
        new ApiResponse(204,"","content deleted succesfully")
    )
    //since delete method doesnot return any response so there not any response
})