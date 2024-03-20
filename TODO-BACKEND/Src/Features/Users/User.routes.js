import express from 'express'
import { userController } from './User.controller.js';


const userRoutes = express.Router();
const usercontroller = new userController();

userRoutes.post("/register-user", (req, res, next) => {
    usercontroller.addUser(req, res, next)
})


userRoutes.post("/get-user", (req, res, next) => {
    usercontroller.LoginUser(req, res, next)
})
export default userRoutes;