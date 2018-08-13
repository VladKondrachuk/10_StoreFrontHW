create database marketplace_db;	
use marketplace_db;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(11) NOT NULL,
primary key (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)

VALUES  ('Monster Drink', 'Produce', 3.75, 500)
		('Rockstar Drink', 'Produce', 2.75, 500)
		('Coke', 'Produce', 0.75, 500)
		('Pepsi', 'Produce', 0.75, 500)
		('Computer', 'Electronics', 1300.75, 50)
		('Calculator', 'Electronics', 20.00, 10)
		('Headphones', 'Electronics', 15.05, 30)
		('Toothpaste', 'Cosmetics', 3.75, 400)
		('Toothbrush', 'Cosmetics', 1.75, 200)
		('Eyeliner', 'Cosmetics', 10.75, 100)
        ('Eyeliner', 'Shampoo', 20.75, 200)
