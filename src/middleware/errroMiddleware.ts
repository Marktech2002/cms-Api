import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../util/statuscode";
interface ErrorResponse {
  message: string;
  stack?: string | null;
}

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode: number = res.statusCode ? res.statusCode : 500;
  const errorResponse: ErrorResponse = {
    message: err.message , 
    stack: process.env.NODE_ENV == "production" ? null : err.stack,
  };
  return res.status(statusCode).json(errorResponse);
};

export const notFoundMiddleware = (req: Request, res: Response) => {
  res
    .status(STATUS_CODES.NOT_FOUND)
    .json({
      success: false,
      message: "Endpoint Not Found",
      status: "Invalid Request",
    });
};


