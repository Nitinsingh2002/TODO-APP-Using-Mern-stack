import mongoose from "mongoose";
import { UserSchema } from "./User.schema.js";
import ApplicationError from "../../../Error/Application.Error.js";
import ValidationError from "../../../Error/Validation.Error.js";
import NotFoundError from "../../../Error/NotFound.Error.js";

const userModel = mongoose.model("Users", UserSchema);

export class UserRepository {


    async registerUser(newUser) {
        try {
            const createdUser = new userModel(newUser);
            await createdUser.save();
            return createdUser;
        } catch (error) {
            if (error.code === 11000) {
                if (error.keyPattern.email) {
                    throw new ValidationError("Email is already registered", 422);
                } else if (error.keyPattern.username) {
                    throw new ValidationError("Username is already taken", 422);
                } else if (error.keyPattern.contactnumber) {
                    throw new ValidationError("Contact number is already registered", 422);
                }
            } else if (error instanceof mongoose.Error.ValidationError) {
                const firstErrorMessage = Object.values(error.errors)[0].message;
                throw new ValidationError(firstErrorMessage, 422);
            } else {
                throw new ApplicationError("Something went wrong in adding user to database", 503);
            }
        }
    }


    async findByEmail(email) {
        try {
            const result = await userModel.findOne({ email })
            if (!result) {
                throw new NotFoundError("Account not found with this email", 404);
            } else {
                return result;
            }
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new NotFoundError(error.message, error.code)
            } else {
                throw new ApplicationError("Something went wrong please try again letter", 503)
            }
        }
    }

}