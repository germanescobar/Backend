"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
class UserDTO {
    constructor({ username, avatar, email, phone, nationality, gender, birthdate, blood_type, role_id: { role }, }) {
        this.username = username;
        this.avatar = avatar;
        this.email = email;
        this.phone = phone;
        this.nationality = nationality;
        this.gender = gender;
        this.birthdate = birthdate;
        this.blood_type = blood_type;
        this.role = role;
    }
}
exports.UserDTO = UserDTO;
