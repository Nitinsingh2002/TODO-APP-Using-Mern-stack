import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import ApplicationError from '../../Error/Application.Error.js';

const url = process.env.DB_URL;

export const connect = async () => {
    try {
        await mongoose.connect(url);
    } catch (error) {
        throw new ApplicationError("Error in connecting database", 500);
    }
}
