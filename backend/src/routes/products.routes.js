import { Router } from "express";

import {
  getProducts,
  createProduct,
  updateProduct
} from "../controllers/products.controller.js";

const router = Router();

// Consultar productos
router.get("/", getProducts);

// Registrar producto
router.post("/", createProduct);

// Editar producto
router.put("/:id", updateProduct);

export default router;