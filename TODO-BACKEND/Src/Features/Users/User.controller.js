import NotFoundError from "../../../Error/NotFound.Error.js";
import { UserRepository } from "./User.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();


export class userController {
    constructor() {
        this.UserRepository = new UserRepository();
    }

    async addUser(req, res, next) {
        try {
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = ({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                contactnumber: req.body.contactnumber,
                password: hashedPassword
            });
            await this.UserRepository.registerUser(newUser);
            return res.status(201).send("ACCOUNT CREATED SUCESSFULLY");

        } catch (error) {
            next(error)
        }
    }


    async LoginUser(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            if (!password) {
                throw new NotFoundError("please enter password", 404);
            }

            const result = await this.UserRepository.findByEmail(email);
            const checkPassword = await bcrypt.compare(password, result.password);

            if (checkPassword) {
                const token = jwt.sign({
                    userId: result._id,
                    email: result.email,
                    name: result.name
                },
                    process.env.JWT_SECRET_KEY_CODE,
                    {
                        expiresIn: '4h'
                    }
                );
                return res.status(200).send(token);
            } else {
                return res.status(403).send("incorrect credentals")
            }
        } catch (error) {
            next(error)
        }
    }

}