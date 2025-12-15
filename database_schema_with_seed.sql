-- Database Schema and Seed Data for Azebot E-commerce

-- =============================================
-- 1. Schema Definition
-- =============================================

-- Enable UUID extension if using PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY, -- Using string ID from frontend logic (e.g., 'prod_001') or can use UUID
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    category VARCHAR(50) NOT NULL, -- 'women', 'men', 'kids', 'accessories'
    type VARCHAR(50) NOT NULL, -- 'dress', 'shirt', 'pants', etc.
    in_stock BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3, 2),
    review_count INTEGER DEFAULT 0,
    details JSONB, -- Storing flexible details like material, care, origin
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Images Table (One-to-Many)
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- Product Colors Table (Many-to-Many relationship usually, or embedded JSON)
-- Normalized approach:
CREATE TABLE product_colors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    hex_code VARCHAR(20) NOT NULL
);

-- Product Sizes Table
CREATE TABLE product_sizes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    size_label VARCHAR(20) NOT NULL -- 'S', 'M', 'L', 'XL', 'One Size'
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id), -- Nullable for guest checkout
    contact_email VARCHAR(255) NOT NULL,
    shipping_address JSONB NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_cost DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'shipped', 'delivered'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(50) REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    selected_color VARCHAR(50),
    selected_size VARCHAR(20)
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    author_name VARCHAR(100),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 2. Seed Data
-- =============================================

-- Insert Products
INSERT INTO products (id, name, slug, description, price, sale_price, category, type, in_stock, featured, is_new, rating, review_count, details) VALUES
('prod_001', 'Habesha Kemis - Traditional White', 'habesha-kemis-traditional-white', 'Elegant handwoven Ethiopian dress with intricate tibeb embroidery. Perfect for celebrations and cultural events. Each piece is handcrafted by skilled artisans using traditional weaving techniques passed down through generations.', 149.99, NULL, 'women', 'dress', TRUE, TRUE, FALSE, 4.8, 23, '{"material": "100% handwoven cotton", "care": "Hand wash cold, line dry", "origin": "Handcrafted in Ethiopia"}'),
('prod_002', 'Netela Scarf - Classic Border', 'netela-scarf-classic-border', 'Traditional Ethiopian shawl featuring colorful tibeb borders. Lightweight and versatile, perfect for any occasion. The geometric patterns are hand-embroidered with vibrant threads.', 45.99, NULL, 'women', 'scarf', TRUE, TRUE, TRUE, 4.9, 45, '{"material": "100% cotton muslin", "care": "Machine wash cold, tumble dry low", "origin": "Handcrafted in Ethiopia"}'),
('prod_003', 'Men''s Tunic - Earth Tone', 'mens-tunic-earth-tone', 'Contemporary take on traditional Ethiopian men''s wear. Comfortable linen blend with subtle embroidered collar detail. Perfect for casual or semi-formal occasions.', 79.99, 64.99, 'men', 'shirt', TRUE, TRUE, FALSE, 4.6, 18, '{"material": "60% linen, 40% cotton", "care": "Machine wash cold, line dry recommended", "origin": "Designed in Ethiopia"}'),
('prod_004', 'Kids Dress - Rainbow Tibeb', 'kids-dress-rainbow-tibeb', 'Adorable Ethiopian-style dress for children featuring colorful tibeb borders. Soft cotton perfect for sensitive skin. Let your child celebrate heritage in comfort.', 59.99, NULL, 'kids', 'dress', TRUE, FALSE, TRUE, 5.0, 12, '{"material": "100% soft cotton", "care": "Machine wash cold, tumble dry low", "origin": "Handcrafted in Ethiopia"}'),
('prod_005', 'Ethiopian Cross Pendant', 'ethiopian-cross-pendant', 'Intricately designed Ethiopian cross pendant in brass with gold finish. A beautiful symbol of faith and culture. Comes with adjustable chain.', 34.99, NULL, 'accessories', 'jewelry', TRUE, FALSE, FALSE, 4.7, 34, '{"material": "Brass with gold/silver plating", "care": "Keep dry, polish with soft cloth", "origin": "Handcrafted in Ethiopia"}'),
('prod_006', 'Habesha Kemis - Red Border', 'habesha-kemis-red-border', 'Stunning white dress with vibrant red tibeb embroidery at the neckline and hem. A showstopper for special occasions and celebrations.', 169.99, NULL, 'women', 'dress', TRUE, TRUE, FALSE, 4.9, 28, '{"material": "100% handwoven cotton", "care": "Hand wash cold, line dry", "origin": "Handcrafted in Ethiopia"}'),
('prod_007', 'Men''s Pants - Traditional Cut', 'mens-pants-traditional-cut', 'Comfortable traditional-style pants in breathable cotton. Features elastic waistband and relaxed fit. Perfect pairing with our tunics.', 54.99, NULL, 'men', 'pants', TRUE, FALSE, FALSE, 4.5, 15, '{"material": "100% cotton", "care": "Machine wash cold, tumble dry low", "origin": "Made in Ethiopia"}'),
('prod_008', 'Woven Basket Bag', 'woven-basket-bag', 'Handwoven basket bag featuring traditional Ethiopian patterns. Durable and stylish, perfect for everyday use or as a statement piece.', 39.99, NULL, 'accessories', 'other', TRUE, FALSE, TRUE, 4.8, 22, '{"material": "Handwoven grass and thread", "care": "Spot clean only", "origin": "Handcrafted in Ethiopia"}');

-- Insert Product Images
INSERT INTO product_images (product_id, image_url) VALUES
('prod_001', 'https://images.unsplash.com/photo-1633980990916-74317cba1ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('prod_002', 'https://images.unsplash.com/photo-1607779142745-5254831701f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('prod_003', 'https://images.unsplash.com/photo-1672355908062-69219ae9dcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('prod_004', 'https://images.unsplash.com/photo-1652499970111-87ff6257c907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('prod_005', 'https://images.unsplash.com/photo-1762331974787-76476e26c7a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('prod_006', 'https://images.unsplash.com/photo-1762316110550-2a1a05d722f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('prod_007', 'https://images.unsplash.com/photo-1687226426353-498d40ec6fbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('prod_008', 'https://images.unsplash.com/photo-1760812655704-7dc53dd36194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080');

-- Insert Product Colors
INSERT INTO product_colors (product_id, name, hex_code) VALUES
('prod_001', 'White', '#FFFFFF'),
('prod_001', 'Cream', '#FAF8F3'),
('prod_002', 'White/Gold', '#FFFFFF'),
('prod_002', 'White/Red', '#FFFFFF'),
('prod_002', 'White/Green', '#FFFFFF'),
('prod_003', 'Beige', '#E8E0D5'),
('prod_003', 'Coffee Brown', '#5D4E37'),
('prod_003', 'Olive Green', '#708238'),
('prod_004', 'White', '#FFFFFF'),
('prod_005', 'Gold', '#D4AF37'),
('prod_005', 'Silver', '#C0C0C0'),
('prod_006', 'White/Red', '#FFFFFF'),
('prod_007', 'White', '#FFFFFF'),
('prod_007', 'Beige', '#E8E0D5'),
('prod_007', 'Black', '#000000'),
('prod_008', 'Natural/Black', '#D2B48C'),
('prod_008', 'Natural/Red', '#D2B48C');

-- Insert Product Sizes
INSERT INTO product_sizes (product_id, size_label) VALUES
('prod_001', 'S'), ('prod_001', 'M'), ('prod_001', 'L'), ('prod_001', 'XL'),
('prod_002', 'One Size'),
('prod_003', 'M'), ('prod_003', 'L'), ('prod_003', 'XL'), ('prod_003', 'XXL'),
('prod_004', 'XS'), ('prod_004', 'S'), ('prod_004', 'M'), ('prod_004', 'L'),
('prod_005', 'One Size'),
('prod_006', 'S'), ('prod_006', 'M'), ('prod_006', 'L'), ('prod_006', 'XL'),
('prod_007', 'M'), ('prod_007', 'L'), ('prod_007', 'XL'), ('prod_007', 'XXL'),
('prod_008', 'One Size');
