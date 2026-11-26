import { Router } from "express";
import {
  getProducts,
  createProduct
} from "../controllers/products.controller.js";

const router = Router();

// Consultar productos
router.get("/", getProducts);

// Registrar producto
router.post("/", createProduct);

export default router;