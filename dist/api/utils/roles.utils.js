"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedRoles = exports.roles = void 0;
exports.roles = {
    ADMIN: 1000,
    DOCTOR: 1993,
    USER: 2023,
};
exports.allowedRoles = {
    ADMIN: [exports.roles.ADMIN],
    GENERAL: [exports.roles.ADMIN, exports.roles.USER, exports.roles.DOCTOR],
    DOCTORS: [exports.roles.ADMIN, exports.roles.DOCTOR],
    USERS: [exports.roles.ADMIN, exports.roles.USER],
};
