import express from "express";
import UserController from "./user.controller.js";

 
const router = express.Router();

const userController = new UserController()

// All the paths to controller method
// localhost/api/products

router.post("/signup", userController.signUp)
router.post("/signin", userController.signIn)

export default router;
