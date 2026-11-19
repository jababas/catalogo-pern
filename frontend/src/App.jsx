import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch(() => {
        setError("No se pudo cargar el catálogo");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (products.length === 0) {
    return <p>No hay productos en el catálogo.</p>;
  }

  return (
    <main>
      <h1>Catálogo de productos</h1>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {products.map((product) => (
          <article key={product.id} style={{ width: 220 }}>
            <img
              src={product.image}
              alt={product.name}
              width="220"
            />

            <h3>{product.name}</h3>

            <p>${Number(product.price).toFixed(2)}</p>
          </article>
        ))}
      </div>
    </main>
  );
}