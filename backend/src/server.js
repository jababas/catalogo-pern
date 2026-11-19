import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import productsRoutes from "./routes/products.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(helmet());
app.use(morgan("dev"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    message: "Servidor del catálogo PERN funcionando"
  });
});

// Rutas del catálogo
app.use("/api/products", productsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API funcionando en http://localhost:${PORT}`);
});