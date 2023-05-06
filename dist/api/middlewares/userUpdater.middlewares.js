"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const constants_utils_1 = require("../utils/constants.utils");
const restrictInvalidUserUpdate = (req, res, next) => {
    for (const key in req.body) {
        if (!constants_utils_1.VALID_USER_FIELDS.includes(key)) {
            next(ApiError_middlewares_1.ApiError.BadRequest(`You can't update the field ${key}`));
        }
    }
    return next();
};
exports.default = restrictInvalidUserUpdate;
