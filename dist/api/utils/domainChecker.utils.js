"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_utils_1 = require("./roles.utils");
const domainChecker = (email) => {
    if (email.match(/(@drmebid)/g))
        return roles_utils_1.roles.DOCTOR;
    if (email.match(/(@mebid)/g))
        return roles_utils_1.roles.ADMIN;
    return roles_utils_1.roles.USER;
};
exports.default = domainChecker;
