"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const users_routes_1 = __importDefault(require("../routes/users.routes"));
const authorization_routes_1 = __importDefault(require("../routes/authorization.routes"));
const doctors_routes_1 = __importDefault(require("../routes/doctors.routes"));
const appointments_route_1 = __importDefault(require("../routes/appointments.route"));
const products_routes_1 = __importDefault(require("../routes/products.routes"));
const categories_routes_1 = __importDefault(require("../routes/categories.routes"));
const locations_routes_1 = __importDefault(require("../routes/locations.routes"));
const payment_routes_1 = __importDefault(require("../routes/payment.routes"));
class Router {
    constructor() {
        this.users = users_routes_1.default;
        this.auth = authorization_routes_1.default;
        this.doctors = doctors_routes_1.default;
        this.appointments = appointments_route_1.default;
        this.products = products_routes_1.default;
        this.categories = categories_routes_1.default;
        this.locations = locations_routes_1.default;
        this.payments = payment_routes_1.default;
    }
}
exports.Router = Router;
