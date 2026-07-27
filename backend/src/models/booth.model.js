import mongoose from "mongoose";

const boothSchema = new mongoose.Schema({

},{timestamps: true});

export const Booth = mongoose.model("Booth", boothSchema);