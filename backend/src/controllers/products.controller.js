import { sql } from "../db.js";

// Obtener todos los productos de la base de datos
export const getProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT id, name, price, image
      FROM products
      ORDER BY id DESC
    `;

    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error("Error al consultar productos:", error);

    res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};