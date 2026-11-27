import { Router } from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controller.js";

const router = Router();

// Consultar productos
router.get("/", getProducts);

// Registrar producto
router.post("/", createProduct);

// Editar producto
router.put("/:id", updateProduct);

// Eliminar producto
router.delete("/:id", deleteProduct);

export default router;