import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados del formulario
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Consultar productos
  const loadProducts = async () => {
    try {
      setError(null);

      const response = await api.get("/products");
      setProducts(response.data.data);
    } catch {
      setError("No se pudo cargar el catálogo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Registrar un producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSaving(true);

    try {
      const newProduct = {
        name: name.trim(),
        price: Number(price),
        image: image.trim()
      };

      await api.post("/products", newProduct);

      setMessage("Producto registrado correctamente");

      // Limpiar formulario
      setName("");
      setPrice("");
      setImage("");

      // Actualizar catálogo
      await loadProducts();

    } catch (error) {
      const message = error.response?.data?.message;

      setMessage(message || "No se pudo registrar el producto");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Catálogo de productos</h1>

      <h2>Registrar producto</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxWidth: 350,
          marginBottom: 30
        }}
      >
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={255}
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />

        <input
          type="url"
          placeholder="URL de la imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <button type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Registrar producto"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <h2>Productos disponibles</h2>

      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : products.length === 0 ? (
        <p>No hay productos en el catálogo.</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          {products.map((product) => (
            <article
              key={product.id}
              style={{
                width: 220,
                border: "1px solid #ccc",
                padding: 10,
                borderRadius: 8
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                width="200"
              />

              <h3>{product.name}</h3>

              <p>
                ${Number(product.price).toFixed(2)}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}