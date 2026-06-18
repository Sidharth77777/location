import express from "express";
import Location from "../models/Location";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      ip,
      city,
      country,
      latitude,
      longitude,
      mapUrl,
    } = req.body;

    const existing = await Location.findOne({
      ip,
      latitude,
      longitude,
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Location already exists",
        data: existing,
      });
    }

    const location = await Location.create({
      ip,
      city,
      country,
      latitude,
      longitude,
      mapUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Location saved",
      data: location,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;