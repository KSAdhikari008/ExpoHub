import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: String,
    discription: String,
    venue: String,
    starteDate: Date,
    endDate: Date,
    status: {
        type: String,
        enum: ["Starting Soon", "Ongoing", "Ended"],
        default: "Starting Soon"
    },
    banner: {
        url: String,
        fileId: String
    }
},{timestamps: true});

export const Event = mongoose.model("Event", eventSchema);