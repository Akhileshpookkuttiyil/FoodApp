import express from "express";
import { reverseGeocode } from "../controllers/locationController.js";

const locationRouter = express.Router();

locationRouter.get("/get", reverseGeocode);

export default locationRouter;
