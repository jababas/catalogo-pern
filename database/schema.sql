CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price > 0),
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO products (name, price, image) VALUES
('Cargador', 50.00, 'https://picsum.photos/seed/cargador/400/300'),
('Mouse inalámbrico', 349.50, 'https://picsum.photos/seed/mouse/400/300');