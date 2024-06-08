class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server Error";
    err.statusCode = err.statusCode || 500;

    if(err.name == 'CaseError'){
        const message = 'Resource not found!';
        err = new ErrorHandler(message,400);
    }
    if(err.code == 11000){
        const message = 'Duplicate Entered!';
        err = new ErrorHandler(message,400);
    }
    if(err.name == 'jsonWebTokenError'){
        const message = 'json web token keys invalid!';
        err = new ErrorHandler(message,400);
    }
    if(err.name == 'TokenExpiredError'){
        const message = 'json web token expired!';
        err = new ErrorHandler(message,400);
    }

    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}

export default ErrorHandler;