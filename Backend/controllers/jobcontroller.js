import catchAsyncError from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/error.js'
import { Job } from '../models/Jobschema.js';

export const getAlljobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        success: true,
        jobs
    })
})

export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "jobseeker") {
        return next(new ErrorHandler("Job seeker is not allowed this resources!", 400))
    }
    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;
    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler("please prvide job details",400));
     }
    
     if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(
            new ErrorHandler("please provide either range or fixed salary!")
        )
     }
     if(salaryFrom && salaryTo && fixedSalary){
        return next(
            new ErrorHandler("cannot enter fixed salary and range salary together!")
        )
     }

     const postedBy = req.user._id;
     const job = await Job.create({title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo,postedBy})

     res.status(200).json({
        success:true,
        message:"job created successfully!",
        job
     })
})

export const getMyJobs = catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "jobseeker") {
        return next(new ErrorHandler("Job seeker is not allowed this resources!", 400))
    }
    const myJobs = await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        myJobs
    })
})

export const updateJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role == "jobseeker"){
        return next(new ErrorHandler("job seeker is not allowed to update job!"));
    }

    const {id} = req.params;

    let job = Job.findById(id);
    if(!job){
        return next(new ErrorHandler("job not found!",400));
    }
    job = await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        usefindAndModify:false,
    })

    res.status(200).json({
        success:true,
        job,
        message:"job update successfully!",
    })
})

export const deletejob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role == "jobseeker"){
        return next(new ErrorHandler("job seeker is not allowed to update job!"));
    }

    const {id} = req.params;

    const job = Job.findById(id);
    if(!job){
        return next(new ErrorHandler("no job found!"));
    }

    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"job deleted successfully!"
    })

})