import { Response } from "express";

class ResponseHandler {
    static success = (res: Response, data: unknown, message = ""): unknown => {
        return res.status(200).json({
            success: true,
            message,
            code: 200,
            data,
        });
    };

    static created = (res: Response, data: unknown, message = ""): unknown => {
        return res.status(201).json({
            success: true,
            message,
            code: 201,
            data,
        });
    };

    static serverError = (res: Response, error: unknown, message = "Something went wrong"): unknown => {
        return res.status(500).json({
            success: false,
            message,
            code: 500,
            error,
        });
    };

    static badRequest = (res: Response, error: unknown, message = "Bad Request"): unknown => {
        return res.status(400).json({
            success: false,
            message,
            code: 400,
            error,
        });
    };

    static notFound = (res: Response, message: string): unknown => {
        return res.status(404).json({
            success: false,
            message,
            code: 404,
        });
    };

    static unAuthorized = (res: Response, message: string): unknown => {
        return res.status(401).json({
            success: false,
            message,
            code: 401,
        });
    };
}

export default ResponseHandler



