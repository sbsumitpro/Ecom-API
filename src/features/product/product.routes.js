import express from "express";
import ProductController from "./controllers/product.controller.js";
import {upload} from "../../middlewares/fileupload.middleware.js"

 
const router = express.Router();

const productController = new ProductController()

// All the paths to controller method
// localhost/api/products

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getOneProduct);
router.post("/", upload.single("imgUrl"), productController.addProduct)
router.get("/filter",productController.filterProducts)

export default router;