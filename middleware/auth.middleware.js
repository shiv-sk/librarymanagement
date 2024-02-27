const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.verifyJWT = asyncHandler(async(req,res,next) =>{
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer " , "")
        if(!token){
            throw new ApiError(401,"unauthorized request")
        }
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodeToken?._id).select("-password -refreshtoken")
    
        if(!user){
            throw new ApiError(401,"invalid access token")
        }
        req.user = user;
        next()
    } catch (error) {
        new ApiError(401 , "invalid access token")
    }
})
// module.exports = verifyJWT

exports.restrictUser = (role) =>{
    return (req,res,next) =>{
        if(req.user.role !== role){
            new ApiError (403,"you are not allowed")
        }
        next();
    }
}