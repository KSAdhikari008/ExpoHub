import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["Visitor", "Exhibitor", "Admin"],
        dafault: "Visitor"
    }
});

export const User = mongoose.model('User', userSchema);