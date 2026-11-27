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

  const [editingId, setEditingId] = useState(null);

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


  const handleEdit = (product) => {
  setEditingId(product.id);

  setName(product.name);
  setPrice(String(product.price));
  setImage(product.image);

  setMessage("");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};


const handleCancel = () => {
  setEditingId(null);

  setName("");
  setPrice("");
  setImage("");

  setMessage("");
};

// Eliminar un producto
  const handleDelete = async (product) => {
  const confirmDelete = window.confirm(
    `¿Estás seguro de eliminar "${product.name}"?`
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await api.delete(`/products/${product.id}`);

    setMessage("Producto eliminado correctamente");

    await loadProducts();

  } catch (error) {
    const message = error.response?.data?.message;

    setMessage(message || "No se pudo eliminar el producto");
  }
};

  // Registrar un producto
  const handleSubmit = async (e) => {
  e.preventDefault();

  setMessage("");
  setSaving(true);

  try {
    const productData = {
      name: name.trim(),
      price: Number(price),
      image: image.trim()
    };

    if (editingId !== null) {
      // Actualizar producto existente
      await api.put(`/products/${editingId}`, productData);

      setMessage("Producto actualizado correctamente");
    } else {
      // Registrar producto nuevo
      await api.post("/products", productData);

      setMessage("Producto registrado correctamente");
    }

    // Limpiar formulario
    setEditingId(null);
    setName("");
    setPrice("");
    setImage("");

    // Actualizar el catálogo
    await loadProducts();

  } catch (error) {
    const message = error.response?.data?.message;

    setMessage(message || "No se pudo guardar el producto");
  } finally {
    setSaving(false);
  }
};



  return (
    <main style={{ padding: 20 }}>
      <h1>Catálogo de productos</h1>

      <h2> {editingId !== null ? "Editar producto" : "Registrar producto"} </h2>

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
  {saving
    ? "Guardando..."
    : editingId !== null
      ? "Guardar cambios"
      : "Registrar producto"}
        </button>

        {editingId !== null && (
        
        
        <button
          type="button"
          onClick={handleCancel}
          disabled={saving}
        >
          Cancelar edición
        </button>
)}

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

              <button
                type="button"
                onClick={() => handleEdit(product)}
              >
                Editar
              </button>
              
              <button
                type="button"
                onClick={() => handleDelete(product)}
                style={{
                  marginLeft: 10,
                  backgroundColor: "#dc3545",
                  color: "white"
                }}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}