"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDTO = void 0;
class AdminDTO {
    constructor({ name, email, role_id }) {
        this.name = name;
        this.email = email;
        this.role = role_id.role;
    }
}
exports.AdminDTO = AdminDTO;
