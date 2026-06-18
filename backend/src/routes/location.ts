import express from "express";
import Location from "../models/Location";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown";

    const lat = Number(Number(latitude).toFixed(4));
    const lon = Number(Number(longitude).toFixed(4));

    const existing = await Location.findOne({
      ip,
      latitude: lat,
      longitude: lon,
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Location already exists",
        data: existing,
      });
    }

    const mapUrl = `https://www.google.com/maps?q=${lat},${lon}`;

    const location = await Location.create({
      ip,
      latitude: lat,
      longitude: lon,
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