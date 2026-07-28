import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: String,
    discription: String,
    venue: String,
    starteDate: Date,
    endDate: Date,
    status: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Ended"],
        default: "Upcoming"
    },
    banner: {
        url: String,
        fileId: String
    }
},{timestamps: true});

export const Event = mongoose.model("Event", eventSchema);