import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide your required name"],
    },
    email:{
        type:String,
        required:[true,"please provide your required email"],
        validate:[validator.isEmail,"please provide a valid email"],
    },
    phone:{
        type:Number,
        required:[true,"please provide your phone number"],
    },
    password:{
        type:String,
        required:[true,"please provide your password"],
        minLength:[8,"password should contain minimum of 8 characters"],
        maxLength:[20,"paasword should not contain more than 20 characters"],
        select:false
    },
    role:{
        type:String,
        required:[true,"please provide your role"],
        enum:['jobseeker','employee'],
    },
},{ timestamps: true });

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async(enteredPassword) => {
    return await bcrypt.compare(enteredPassword,password);
}

userSchema.methods.getJwtToken = () =>{
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY),{expiresIn:process.env.JWT_EXPIRE};
}

export const User = mongoose.model('user',userSchema);

