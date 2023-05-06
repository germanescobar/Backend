"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
    static BadRequest(message) {
        return new ApiError(400, `${message || 'Bad request'}`);
    }
    static Unauthorized() {
        return new ApiError(401, 'Authentication credential failed');
    }
    static Forbbiden() {
        return new ApiError(403, 'Authorization denied');
    }
    static NotFound() {
        return new ApiError(404, 'Not Found');
    }
    static Internal(message) {
        return new ApiError(500, message);
    }
}
exports.ApiError = ApiError;
