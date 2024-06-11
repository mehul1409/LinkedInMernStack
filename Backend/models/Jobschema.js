import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please provide job title"],
    },
    description:{
        type:String,
        required:[true,"please provide description!"],
    },
    category:{
        type:String,
        required:[true,"job category is required!"],
    },
    country:{
        type:String,
        required:[true,"job country is required!"],
    },
    city:{
        type:String,
        required:[true,"job city is required!"],
    },
    location:{
        type:String,
        required:[true,"job location is required!"],
    },
    fixedSalary:{
        type:Number
    },
    salaryFrom:{
        type:Number
    },
    salaryTo:{
        type:Number
    },
    expired:{
        type:Boolean,
        default:false,
    },
    jobPostedOn:{
        type:Date,
        default:Date.now()
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    }
},{timestamps:true});

export const Job = mongoose.model("job",JobSchema);