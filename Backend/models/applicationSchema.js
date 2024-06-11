import mongoose from 'mongoose'
import validator from 'validator'

const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide your name"]
    },
    email:{
        type:String,
        validator:[validator.isEmail,"please provide a valid email"],
        required:[true,"please provide your mail"],
    },
    coverLetter:{
        type:String,
        required:[true,"please provide your coverLetter!"],
    },
    phone:{
        type:Number,
        required:[true,"please provide your phone number!"],
    },
    address:{
        type:String,
        required:[true,"please provide your address!"],
    },
    resume:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        role:{
            type:String,
            enum:["jobseeker"],
            required:true,
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        role:{
            type:String,
            enum:["employee"],
            required:true,
        }
    }
})  

export const Application = mongoose.model('application',applicationSchema);