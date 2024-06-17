import { NextFunction, Response } from "express";
import { RequestWithUser } from "../utils/types";

export const errorMiddleware = (
    err: any,
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const defaultErrors = {
        statusCode: err.status || 500,
        message: err.message || "Something went wrong",
    };
    res.status(defaultErrors.statusCode).json({ message: defaultErrors.message, success: false });
};
