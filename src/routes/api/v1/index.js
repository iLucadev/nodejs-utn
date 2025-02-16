import { Router } from "express";
import apiRoutes from "./api.routes.js";
import productRoutes from "./products.routes.js";

const router = Router();

router.use("/", apiRoutes);
router.use("/products", productRoutes);

export default router;
