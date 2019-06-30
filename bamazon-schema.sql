DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products(
id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(20) NOT NULL,
department_name VARCHAR(20) NOT NULL,
price INTEGER NOT NULL,
stock_quantity INTEGER,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Canon", "Electronics", 500, 20), ("Nikon", "Electronics", 600, 14), ("Olympus", "Electronics", 299, 20),
("Panasonic", "Electronics", 1000, 8),("Apple", "Electronics", 3999, 4),("Ray-Ban", "Eyewear", 100, 34),("Spy", "Eyewear", 149, 14),
("Beats", "Electronics", 125, 23), ("Asics", "Clothing", 75, 20), ("Gottex", "Clothing",50, 15), ("RVCA", "Clothing", 47, 20),
("O'Neill", "Clothing", 30, 17), ("Patagonia","Clothing", 62, 40), ("G.I. Joe", "Toys", 11, 35), ("He-man", "Toys", 15, 44),
("Stretch Armstrong","Toys",12,30);

