const { application } = require("express");
const Transaction = require("../model/transaction.model");
const asyncHandler = require("../utils/asynchandler.utils");
const ApiError = require("../utils/errorhandler.utils");
const ApiResponse = require("../utils/responsehandler.utils");

//get details of borroweduser and borrowedbook
//check for empty fields
//save details in database
//return response

exports.registertransaction = asyncHandler(async(req,res)=>{
    const {borroweduser,borrowedbook} = req.body
    if([borrowedbook,borroweduser].some((field)=>{field && field.trim() === ""})){
        throw new ApiError(400,"allfields are required")
    }
    const transaction = await Transaction.create({
        borrowedbook,
        borroweduser
    })
    if(!transaction){
        throw new ApiError(500 , "transaction is not created")
    }
    return res.status(200).json(
        new ApiResponse(201,transaction,"transaction is created succesfull")
    )
})

exports.getAllTransaction = asyncHandler(async(req,res)=>{
    const transaction = await Transaction.find()
    if(!transaction){
        throw new ApiError(404 , "transaction is not present in db")
    }
    res.status(200).json(
        new ApiResponse(200,transaction,"all transaction that are from DB")
    )
})

exports.getTransaction = asyncHandler(async(req,res)=>{
    const transaction = await Transaction.findById(req.params.id)
    if(!transaction){
        throw new ApiError(404,"transaction is not found")
    }
    res.status(200).json(
        new ApiResponse(200 , transaction,"transaction is you searched for")
    )
})

exports.updateTransaction = asyncHandler(async(req,res)=>{
    const transaction = await Transaction.findByIdAndUpdate(req.params.id)
    if(!transaction){
        throw new ApiError(400,"transaction is not updated succesfully")
    }
    res.status(200).json(
        new ApiResponse(200,transaction,"transaction is updated successfully")
    )
})

exports.deleteTransaction = asyncHandler(async(req,res)=>{
    const transaction = await Transaction.findByIdAndDelete(req.params.id)
    if(!transaction){
        throw new ApiError(400,"transaction is deleted succesfully")
    }
    res.status(200).json(
        new ApiResponse(200,"","transaction is deleted successfully")
    )
})

