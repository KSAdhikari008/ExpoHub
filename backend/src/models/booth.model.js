import mongoose from "mongoose";

const boothSchema = new mongoose.Schema({
    boothName: String,
    boothNumber: Number,
    description: String,
    size: {
        type: String,
        enum: ["Small", "Medium", "Large"],
        default: "Small"
    },
    poster: {
        url: String,
        fileId: String
    },
    status:{
        type: String,
        enum: ["Pending","Approved","Rejected"],
        default: "Pending"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    exhibitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
    
},{timestamps: true});

export const Booth = mongoose.model("Booth", boothSchema);