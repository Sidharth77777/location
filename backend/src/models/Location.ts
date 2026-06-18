import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    mapUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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