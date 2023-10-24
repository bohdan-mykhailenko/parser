#  Products Parser Application

## Overview
[**Parsed Web Page**](https://hotline.ua/ua/mobile/mobilnye-telefony-i-smartfony/?mode=series&sort=popularity)

## Description

This project is a simple application to parse data from an electronic store and set them into the database.

## Technologies

- [Node.js](https://nodejs.org/en)
- [MariaDb](https://mariadb.org/)
- [Axios](https://axios-http.com/)
- [Cheerio](https://cheerio.js.org/)


## Preview

Filled table products in the local database:

![image](https://github.com/bohdan-mykhailenko/parser/assets/76702178/055662d6-bea4-437c-9441-8606bdceedb1)

Connection beetwen characteristics and certain product:

![image](https://github.com/bohdan-mykhailenko/parser/assets/76702178/1af345b9-7f90-49c8-bbab-bb4103d66487)



## Getting Started

**To get started with the app, follow these steps:**

1.  Clone the repo:
    
```shell
  https://github.com/bohdan-mykhailenko/parcer.git
```

2.  Install dependencies:
    
```shell
  npm install
```

3. Create MySQL or MariadDB database
```shell
 CREATE DATABASE store;
```

4. Create tables
```shell
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE product_characteristics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    characteristic_id INT,
    value VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (characteristic_id) REFERENCES characteristics(id)
);

CREATE TABLE characteristics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```
    
5. Config database connection
  * Go to the src/database/connection file
  * Set your database config values
```shell
const connection = mysql.createConnection({
  host: your_host,
  port: your_port,
  user: your_user,
  password: your_password,
  database: your_db_name,
});
```

6. Run the program
```shell
  node src/main.js
```
