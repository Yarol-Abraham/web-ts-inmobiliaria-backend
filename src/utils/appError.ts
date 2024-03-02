class AppError extends Error {

    statusCode: number;
    isOperational: boolean;
    message: string;
    status: string;
    stack: any;

    constructor(message: string, statusCode: number)
    {
        super(message);
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.message = message;
        this.isOperational = true;
        this.stack = Error.stackTraceLimit;
        Error.captureStackTrace(this);
    }

}

export default AppError;