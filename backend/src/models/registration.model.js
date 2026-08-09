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

registrationSchema.index({
  visitor: 1,
  event: 1
}, {unique: true}); // unique index to prevent duplicate registrations for the same visitor and event 


export const Registration = mongoose.model('Registration', registrationSchema);