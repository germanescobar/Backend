"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorDTO = exports.DoctorDTO = void 0;
class DoctorDTO {
    constructor({ id, prefix, firstname, lastname, avatar, email, phone, gender, birthdate, introduction, headquarter: { city, address, location: { country }, }, area: { area, price }, qualifications, memberships, skills, appointments, role_id: { role }, }) {
        this.id = id;
        this.prefix = prefix;
        this.firstname = firstname;
        this.lastname = lastname;
        this.avatar = avatar;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.birthdate = birthdate;
        this.introduction = introduction;
        this.location = { city, address, country };
        this.area = { area, price };
        this.qualifications = qualifications;
        this.memberships = memberships;
        this.skills = skills;
        this.appointments = appointments;
        this.role = role;
    }
}
exports.DoctorDTO = DoctorDTO;
const doctorDTO = (doctor) => {
    if (Array.isArray(doctor)) {
        return doctor.map((e) => {
            return Object.assign({}, new DoctorDTO(e));
        });
    }
    return new DoctorDTO(doctor);
};
exports.doctorDTO = doctorDTO;
