\c admin;

-- Crear la tabla
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. NUEVA: Tabla de Componentes (Reemplaza al componentes.json)
CREATE TABLE componentes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    marca VARCHAR(50) NOT NULL,
    rendimiento VARCHAR(50) NOT NULL,
    ventas INT NOT NULL DEFAULT 0,
    descripcion TEXT
);

-- Insertar los datos que tenías en tu JSON (Ejemplo adaptable a tus campos reales)
INSERT INTO componentes (id, nombre, tipo, precio, stock, marca, rendimiento, ventas, descripcion) VALUES
(1, 'NVIDIA RTX 4090', 'GPU', 1999.00, 3, 'NVIDIA', 'Ultra Alto', 28, 'La GPU más potente para gaming y AI'),
(2, 'NVIDIA RTX 4080', 'GPU', 1199.00, 7, 'NVIDIA', 'Muy Alto', 45, 'Ideal para 4K gaming'),
(3, 'AMD Radeon RX 7900 XTX', 'GPU', 999.00, 5, 'AMD', 'Muy Alto', 32, 'Competencia directa de la RTX 4080'),
(4, 'Intel Core i9-14900K', 'CPU', 650.00, 8, 'Intel', 'Ultra Alto', 52, '24 núcleos, frecuencia hasta 6.0 GHz'),
(5, 'AMD Ryzen 7 7800X3D', 'CPU', 450.00, 12, 'AMD', 'Muy Alto', 89, 'La mejor CPU para gaming gracias a su cache 3D'),
(6, 'AMD Ryzen 5 7600X', 'CPU', 250.00, 20, 'AMD', 'Alto', 156, 'Excelente relación precio-rendimiento'),
(7, 'Corsair Vengeance 32GB DDR5', 'RAM', 120.00, 30, 'Corsair', 'Alto', 210, '6000MHz, CL30, perfil EXPO y XMP'),
(8, 'Kingston Fury 16GB DDR4', 'RAM', 55.00, 45, 'Kingston', 'Medio', 320, 'Ideal para builds económicas'),
(9, 'Samsung 990 Pro 2TB', 'SSD', 180.00, 15, 'Samsung', 'Ultra Alto', 78, 'PCIe 4.0, velocidades 7450 MB/s'),
(10, 'Western Digital Black SN770 1TB', 'SSD', 80.00, 25, 'Western Digital', 'Alto', 145, 'PCIe 4.0, excelente para juegos'),
(11, 'ASUS ROG Strix Z790-E', 'Motherboard', 480.00, 6, 'ASUS', 'Muy Alto', 34, 'Para Intel 13th y 14th gen, WiFi 7'),
(12, 'MSI B650 Tomahawk', 'Motherboard', 220.00, 14, 'MSI', 'Alto', 92, 'Para AMD Ryzen 7000, excelente VRM'),
(13, 'Noctua NH-D15', 'Cooler', 110.00, 18, 'Noctua', 'Alto', 67, 'El mejor cooler de aire del mercado'),
(14, 'Corsair RM850e', 'Fuente', 130.00, 22, 'Corsair', 'Alto', 103, '850W 80 Plus Gold, totalmente modular'),
(15, 'Lian Li O11 Dynamic EVO', 'Gabinete', 160.00, 10, 'Lian Li', 'Medio', 58, 'Gabinete panorámico, excelente flujo de aire')
ON CONFLICT (id) DO NOTHING;

-- Insertar datos
-- Usuario: admin | Contraseña: admin123 (hash generado con bcrypt)
INSERT INTO usuarios (username, password_hash) VALUES
('admin', '$2a$12$vDSbDoJ8eN/Es.ayoOzo5.8SqY.PBKCs3CiJHWV27b2DwXbZhlw36');