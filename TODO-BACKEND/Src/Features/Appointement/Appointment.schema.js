import mongoose from 'mongoose';

const { Schema } = mongoose;

export const Appointmentschema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [5, "Title can not be less than 5 characters"],
        maxLength: [40, "Title can not be more than 50 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [10, "Description can not be less than 10 characters"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    date: {
        type: Date,
        required: [true, "Date is required"] 
    }
});
