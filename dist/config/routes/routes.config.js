"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_routes_1 = require("../../api/router/Router.routes");
function routes(app) {
    const routes = new Router_routes_1.Router();
    app.use('/api/v1/users', routes.users);
    app.use('/api/v1/auth', routes.auth);
    app.use('/api/v1/doctors', routes.doctors);
    app.use('/api/v1/appointments', routes.appointments);
    app.use('/api/v1/products', routes.products);
    app.use('/api/v1/categories', routes.categories);
    app.use('/api/v1/locations', routes.locations);
    app.use('/api/v1/payments', routes.payments);
}
exports.default = routes;
