import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ["Visitor", "Exhibitor", "Admin"],
        dafault: "Visitor"
    },
    profileImage: {
        url: String,
        fileId: String
    }
});

export const User = mongoose.model('User', userSchema);