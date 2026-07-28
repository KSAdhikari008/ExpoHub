import mongoose from 'mongoose'

const registrationSchema = new mongoose.Schema(
  {
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  }
}, {timestamps: true});

export const Registration = mongoose.model('Registration', registrationSchema);