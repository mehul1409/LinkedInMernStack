import catchAsyncError from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/user.js';
import {sendToken } from '../utils/jwtToken.js';

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("All fields are required!"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("email already exist"));
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
        phone,
    });

    res.status(200).json({
        success: true,
        message: "user registered!",
        user,
    });

    sendToken(user,200,res,"user registered successfully!");
})


export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password,role} = req.body;

    if(!email || !password || !role){
        return next(new ErrorHandler("please provide email , password and role",400));
    }

    const user = await User.findOne({email}).select("+password");
});