import { Router } from "express";
import {
  getCityLocations,
  createCityLocation,
  updateCityLocation,
  deleteCityLocation,
} from "../controllers/cityLocation.controller";

const router = Router();

// Public / Admin list
router.get("/", getCityLocations);

// Admin mutations
router.post("/", createCityLocation);
router.patch("/:id", updateCityLocation);
router.delete("/:id", deleteCityLocation);

export default router;
