"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const constants_utils_1 = require("../utils/constants.utils");
const restrictInvalidProductUpdate = (req, res, next) => {
    const _a = req.body, { id } = _a, rest = __rest(_a, ["id"]);
    for (const key in rest) {
        if (!constants_utils_1.VALID_PRODUCT_FIELDS.includes(key))
            return next(ApiError_middlewares_1.ApiError.BadRequest(`You can't update the field ${key}`));
    }
    next();
};
exports.default = restrictInvalidProductUpdate;
