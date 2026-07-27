import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

},{timestamps: true});

export const Event = mongoose.model("Event", eventSchema);