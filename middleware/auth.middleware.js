const asyncHandler = require("../utils/asynchandler.utils");
const ApiResponse = require("../utils/responsehandler.utils");
const ApiError = require("../utils/errorhandler.utils");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

exports.verifyJWT = asyncHandler(async(req,res,next) =>{
    try {
        const token = req.cookies?.AccessToken
        console.log(token);
        if(!token){
            throw new ApiError(401,"unauthorized request")
        }
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodeToken?.id).select("-password")
    
        if(!user){
            throw new ApiError(401,"invalid access token")
        }
        req.user = user;
        next()
    } catch (error) {
        next(error);
    }
})
// module.exports = verifyJWT

exports.restrictUser = (role) =>{
    return (req,res,next) =>{
        if(req.user.role !== role){
            next(new ApiError (403,"you are not allowed"));
        }
        console.log(req.user.role);
        next();
    }
}