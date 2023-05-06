"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationDTO = void 0;
class AuthenticationDTO {
    constructor({ id, role_id: { role } }) {
        this.id = id;
        this.role = role;
    }
}
exports.AuthenticationDTO = AuthenticationDTO;
