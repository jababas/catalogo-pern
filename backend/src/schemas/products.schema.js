import { z } from "zod";

// Validaciones para registrar productos
export const createProductSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(255, "El nombre es demasiado largo"),

  price: z.number()
    .finite()
    .positive("El precio debe ser mayor que cero"),

  image: z.url("Debe proporcionar una URL válida")
});

// Validaciones para actualizar productos
export const updateProductSchema = createProductSchema;