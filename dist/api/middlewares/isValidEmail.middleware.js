"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const constants_utils_1 = require("../utils/constants.utils");
const isValidEmail = (req, res, next) => {
    const { email } = req.body;
    if (email) {
        if (!email.match(constants_utils_1.VALID_DOCTOR_DOMAIN))
            return next(ApiError_middlewares_1.ApiError.BadRequest('Invalid email domain'));
    }
    return next();
};
exports.default = isValidEmail;
