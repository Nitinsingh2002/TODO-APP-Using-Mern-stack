import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from './Src/Config/mongoose.js';
import userRoutes from './Src/Features/Users/User.routes.js';
import ApplicationError from './Error/Application.Error.js';
import NotFoundError from './Error/NotFound.Error.js';
import ValidationError from './Error/Validation.Error.js';
import AppointmentRoutes from './Src/Features/Appointement/Appointment.routes.js';
import jwtauth from './Src/Middleware/jwt.middleware.js';




const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use("/user", userRoutes);
app.use("/appointment", jwtauth, AppointmentRoutes);


app.get("/", (req, res) => {
    res.send("<h1>WELCOME TO  API OF TODO APP</h1>");
    res.end();
})



//middleware to handle error
app.use((error, req, res, next) => {

    if (error instanceof ApplicationError || error instanceof NotFoundError || error instanceof ValidationError) {
        res.status(error.code).send(error.message);
    } else {
        res.status(500).send("Something went wrong. Please try again later.");
    }
});



// Define a catch-all route for 404 errors
app.use((req, res) => {
    res.status(404).send("Resource not found.");
});




//middleware to handle 404 request
app.use((req, res) => {
    return res.status(401).send("Resource not found");
});



app.listen(3500, () => {
    console.log("server is running in port number 3500");
    connect();
});