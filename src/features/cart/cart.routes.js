import express from "express";
import { CartController } from "./cart.controller.js";

 
const router = express.Router();

const cartController = new CartController()

// All the paths to controller method
// localhost/api/cartItems

router.delete("/:id", cartController.delete);
router.post("/add", cartController.add);
router.get("/get", cartController.get);

export default router;
