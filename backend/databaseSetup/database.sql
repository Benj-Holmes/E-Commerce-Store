CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATE
 );

 CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50),
  description VARCHAR(255),
  price MONEY,
  stock int NOT NULL,
  picture_path VARCHAR(50)
);

CREATE TABLE category (
    id BIGSERIAL PRIMARY KEY,
    type VARCHAR(50)
)

CREATE TABLE product_category (
    product_id BIGSERIAL REFERENCES products(id),
    category_id BIGSERIAL REFERENCES category(id)    
)

CREATE TABLE cart (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGSERIAL REFERENCES users(id),
  is_current_cart BOOLEAN
);


CREATE TABLE cart_item (
  product_id BIGSERIAL REFERENCES products(id),
  cart_id BIGSERIAL REFERENCES cart(id),
  quantity INTEGER,
  primary key (product_id, cart_id)
);

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGSERIAL REFERENCES users(id),
  cart_id BIGSERIAL REFERENCES cart(id),
  price_total MONEY,
  complete BOOLEAN,
  completed_at DATE
);

CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGSERIAL REFERENCES users(id),
    product_id BIGSERIAL REFERENCES products(id),
    body VARCHAR (255),
    star_rating INTEGER
)