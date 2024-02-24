const asyncHandler = require("../utils/asynchandler.utils");
const ApiResponse = require("../utils/responsehandler.utils");
const ApiError = require("../utils/errorhandler.utils");
const User = require("../model/user.model");

exports.registerUser = asyncHandler(async (req,res)=>{
    //get userdetails
   //check for empty fields
   //check if user is already exists
   //then create user
   //remove some fileds from the response
   const {username,fullname,phoneNumber,email,password} = req.body
   if([username,fullname,phoneNumber,email,password].some((field)=>{
    field && field.trim() === "";
   })){
    throw new ApiError(400,"all fields are required..")
   }
   const existeduser = await User.findOne({$or:[{email},{username}]})
   if(existeduser){
    throw new ApiError(400,"user is already existed...")
   }
   const user = await User.create({
   
    username:username.toLowerCase(),
    email,
    fullname:fullname.toLowerCase(),
    password,
    phoneNumber
   })

   const createduser = await User.findById(user._id).select("-password")

   if(!createduser){
    throw new ApiError(500,"user is not created")
   }

   return res.status(200).json(
    new ApiResponse(201, createduser , "user is created succesfully")
   )
})

exports.getAllUser = asyncHandler(async(req,res)=>{
    const users = await User.find()
    if(!users){
        throw new ApiError(404,"there are no users")
    }
    return res.status(200).json(
        new ApiResponse(200,users,"all the users present in DB")
    )

})

exports.getUser = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.params.id)
    if(!user){
        throw new ApiError(404,"there ia no user in Database")
    }
    return res.status(200).json(
        new ApiResponse(200,user,"the user you searched for")
    )
})

exports.updateUser = asyncHandler(async(req,res)=>{
    const updateduser = await User.findByIdAndUpdate(req.params.id , req.body , {new :true})
    if(!updateduser){
        throw new ApiError(500,"user is not updated successfull")
    }
    return res.status(200).json(
        new ApiResponse(204,updateduser,"user is updated succesfully")
    )
})

exports.deleteUser = asyncHandler(async (req,res)=>{
    const deleteduser = await User.findByIdAndDelete(req.params.id)
    if(!deleteduser){
        throw new ApiError(500,"user is not deleted succesfully")
    }
    res.status(200).json(
        new ApiResponse(204,"","user is deletd successfully")
    )
})