import { sql } from "../db.js";
import { createProductSchema } from "../schemas/products.schema.js";

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

// Registrar un producto nuevo
export const createProduct = async (req, res) => {
  try {
    // Validar los datos recibidos
    const result = createProductSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Datos del producto inválidos",
        errors: result.error.flatten()
      });
    }

    // Obtener los datos validados
    const { name, price, image } = result.data;

    // Insertar el producto en PostgreSQL
    const products = await sql`
      INSERT INTO products (name, price, image)
      VALUES (${name}, ${price}, ${image})
      RETURNING id, name, price, image
    `;

    // Responder con el producto registrado
    return res.status(201).json({
      success: true,
      message: "Producto registrado correctamente",
      data: products[0]
    });

  } catch (error) {
    console.error("Error al registrar producto:", error);

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};