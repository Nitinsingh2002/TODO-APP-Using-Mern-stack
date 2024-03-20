import mongoose from "mongoose";
import { Appointmentschema } from "./Appointment.schema.js";
import ApplicationError from "../../../Error/Application.Error.js";
import ValidationError from "../../../Error/Validation.Error.js";
import { UserSchema } from "../Users/User.schema.js";
import NotFoundError from "../../../Error/NotFound.Error.js";
import { userController } from "../Users/User.controller.js";

const usrModel = mongoose.model("users", UserSchema);
const AppointmentModel = mongoose.model("Appointments", Appointmentschema);

export default class AppointmentRepository {

    async addTodo(newTodo) {
        try {
            const result = new AppointmentModel(newTodo);
            await result.save();
            return result;
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                const firstErrorMessage = Object.values(error.errors)[0].message;
                throw new ValidationError(firstErrorMessage, 422);
            }
            else {
                throw new ApplicationError("Something went wrong in adding new Appointment", 503)
            }
        }
    }

    async getTodo(userId) {
        try {
            const user = await usrModel.findById(userId);
            if (!user) {
                throw new NotFoundError("User not found", 404)
            }
            const result = AppointmentModel.find({ user: userId });
            return result;

        } catch (error) {
            throw new ApplicationError("Something went wrong in fetching appointment", 503)
        }
    }

    async deleteTodo(userId, id) {
        try {
            const result = await AppointmentModel.deleteOne({ user: userId, _id: id })
            if (result.deletedCount === 0) {
                throw new NotFoundError("Appointment not found or you do not have permission to delete it", 404);
            } else {
                return result;
            }

        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new NotFoundError(error.message, error.code)
            } else {
                throw new ApplicationError("Something went wrong in deleting appointment", 503)
            }

        }
    }

    async updateTodo(userId, id, task) {
        try {
            const result = await AppointmentModel.findOneAndUpdate({ user: userId, _id: id },
                {
                    title: task.title,
                    description: task.description,
                    user: task.userId,
                    date: task.date
                })

            if (!result) {
                throw new NotFoundError("Appointment not found or you do not have permission to update it", 404)
            }
            await result.save()
            return result;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new NotFoundError(error.message, error.code);
            }
            throw new ApplicationError("Something went wrong in updating product", 503)
        }
    }

}