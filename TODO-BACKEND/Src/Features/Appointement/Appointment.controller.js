import AppointmentRepository from "./Appointment.repository.js";


export default class AppointmentController {
    constructor() {
        this.AppointmentRepository = new AppointmentRepository();
    }

    async add(req, res, next) {
        try {
            const newTodo = ({
                title: req.body.title,
                description: req.body.description,
                user: req.userId,
                date: new Date(req.body.date)

            })

            await this.AppointmentRepository.addTodo(newTodo);
            return res.status(201).send("Appointment Added..")
        } catch (error) {
            next(error)
        }
    }


    async get(req, res, next) {
        try {
            const result = await this.AppointmentRepository.getTodo(req.userId);
            return res.status(200).send(result);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const userId = req.userId;
            const id = req.body.id;
            const result = await this.AppointmentRepository.deleteTodo(userId, id);
            return res.status(200).send("Appointemet deleted sucessfully..");

        } catch (error) {
            next(error)
        }
    }


    async update(req, res, next) {
        try {
            const userId = req.userId;
            const id = req.params.id;
            const Appointement = ({
                title: req.body.title,
                description: req.body.description,
                userId: req.userId,
                date: new Date(req.body.date)
            })
            const result = await this.AppointmentRepository.updateTodo(userId, id, Appointement);
            return res.status(200).send("Appointment updated sucessfully..");

        } catch (error) {
            next(error)
        }
    }

}