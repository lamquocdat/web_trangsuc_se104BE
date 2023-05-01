import express from "express";
const router = express.Router();
import * as ServiceController from "../controller/serviceController.js";

router
  .get("/service", ServiceController.getAllService)
  .get("/service/:id", ServiceController.getServiceById)
  .post("/service", ServiceController.addService)
  .put("/service/:id", ServiceController.updateService)
  .delete("/service/:id", ServiceController.deleteService);

export default router;
