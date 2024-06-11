import { Application } from '../models/applicationSchema.js'
import catchAsyncError from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/error.js'
import cloudinary from 'cloudinary';
import { Job } from '../models/Jobschema.js';

export const employerGetAllapplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role == "jobseeker") {
        return next(
            new ErrorHandler("candidate are not allowed to use this resource", 400)
        )
    }

    const { _id } = req.user;
    const application = await Application.find({ 'employerID.user': _id });
    res.status(200).json({
        success: true,
        application,
    })
})

export const jobseekerGetAllapplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role == "employee") {
        return next(
            new ErrorHandler("employee are not allowed to use this resource", 400)
        )
    }

    const { _id } = req.user;
    const application = await Application.find({ 'applicantID.user': _id });
    res.status(200).json({
        success: true,
        application,
    })
})

export const jobseekerDeleteTheirApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role == "employee") {
        return next(new ErrorHandler("employee cant able to delete applicant application", 400))
    }

    const { id } = req.params;

    const application = await Application.findOne(id);
    if (!application) {
        return next(new ErrorHandler("no application found with this id!", 400));
    }

    application.deleteOne();

    res.status(200).json({
        success: true,
        message: "successfully deleted the application!",
    })
})

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role == "employee") {
        return next(
            new ErrorHandler("employer cannot able to post application", 400)
        )
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(
            new ErrorHandler("resume required!", 400)
        )
    }

    const { resume } = req.files;

    const allowedFormats = ['image/png', 'image/jpg'];

    if (!allowedFormats.includes(resume.mimetype)) {
        return next(
            new ErrorHandler("invalid file type! please upload only png or jpf format", 400)
        )
    }

    const cloudinaryresponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    )

    if (!cloudinaryresponse || cloudinaryresponse.error) {
        console.log("cloudinary error", cloudinaryresponse.error || "unknown cloudinary error");
        return next(
            new ErrorHandler("failed to upload resume", 500)
        )
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;

    const applicantID = {
        user: req.user._id,
        role: "jobseeker"
    }

    if (!jobId) {
        return next(
            new ErrorHandler("job not fount", 404)
        )
    }
    const jobdetails = await Job.findById(jobId);

    if (!jobdetails) {
        return next(
            new ErrorHandler("job not fount", 404)
        )
    }

    const employerID = {
        user: jobdetails.postedBy,
        role: "employee"
    }

    if (!name || !email || !coverLetter || !phone || !address || !employerID || !applicantID || !resume) {
        return next(
            new ErrorHandler("all fields are required!", 400)
        )
    }

    const application = await Application.create({ name, email, coverLetter, phone, address, employerID, applicantID, resume: { public_id: cloudinaryresponse.public_id, url: cloudinaryresponse.secure_url } });

    res.status(200).json({
        success: true,
        message: "application submitted!",
        application
    })
})

