import express from 'express'
import AppointmentController from './Appointment.controller.js';


const AppointmentRoutes = express.Router();
const appointmentcontroller = new AppointmentController();

AppointmentRoutes.post("/add-task", (req, res, next) => {
    appointmentcontroller.add(req, res, next)
})

AppointmentRoutes.get("/get-task", (req, res, next) => {
    appointmentcontroller.get(req, res, next)
})

AppointmentRoutes.delete("/delete-task", (req, res, next) => {
    appointmentcontroller.delete(req, res, next);
})

AppointmentRoutes.put("/edit-task/:id", (req, res, next) => {
    appointmentcontroller.update(req, res, next)
})

export default AppointmentRoutes;
