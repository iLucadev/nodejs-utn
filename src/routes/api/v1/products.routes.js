import { Router } from "express";
import * as productController from "../../../controllers/products.controller.js";

const router = Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductDetails);

export default router;
