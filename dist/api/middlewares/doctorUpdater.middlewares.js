"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const constants_utils_1 = require("../utils/constants.utils");
const restrictInvalidDoctorUpdate = (req, res, next) => {
    const { email, birthdate } = req.body;
    if (email) {
        if (!email.match(constants_utils_1.VALID_DOCTOR_DOMAIN))
            return next(ApiError_middlewares_1.ApiError.BadRequest('Invalid email domain'));
    }
    const newDate = new Date(birthdate);
    req.body = Object.assign(Object.assign({}, req.body), { birthdate: newDate });
    return next();
};
exports.default = restrictInvalidDoctorUpdate;
