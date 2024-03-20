import mongoose from 'mongoose';

const { Schema } = mongoose;

export const UserSchema = new Schema({
    name: {
        type: String,
        maxLength: [20, "Name cannot be greater than 20 characters"],
        minLength: [4, "Name cannot be less than 4 characters"],
        required: [true, "Password is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Password is required"],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Password is required"]
    },
    contactnumber: {
        type: Number,
        match: [/^\d{10}$/],
        unique: true,
        required: [true, "Password is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});


