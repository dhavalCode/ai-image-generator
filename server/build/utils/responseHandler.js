"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
}
ResponseHandler.success = (res, data, message = "") => {
    return res.status(200).json({
        success: true,
        message,
        code: 200,
        data,
    });
};
ResponseHandler.created = (res, data, message = "") => {
    return res.status(201).json({
        success: true,
        message,
        code: 201,
        data,
    });
};
ResponseHandler.serverError = (res, error, message = "Something went wrong") => {
    return res.status(500).json({
        success: false,
        message,
        code: 500,
        error,
    });
};
ResponseHandler.badRequest = (res, error, message = "Bad Request") => {
    return res.status(400).json({
        success: false,
        message,
        code: 400,
        error,
    });
};
ResponseHandler.notFound = (res, message) => {
    return res.status(404).json({
        success: false,
        message,
        code: 404,
    });
};
ResponseHandler.unAuthorized = (res, message) => {
    return res.status(401).json({
        success: false,
        message,
        code: 401,
    });
};
exports.default = ResponseHandler;
//# sourceMappingURL=responseHandler.js.map