import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    city: String,
    country: String,

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    mapUrl: String,
  },
  {
    timestamps: true,
  }
);

// Prevent duplicates
locationSchema.index(
  {
    ip: 1,
    latitude: 1,
    longitude: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Location", locationSchema);