import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/add", productController.addProduct);
router.put("/updateStock", productController.updateProductStock);
router.delete("/delete/:id", productController.deleteProduct);

export default router;
