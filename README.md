#  Products Parser Application

## Overview
[**Parsed Web Page**](https://hotline.ua/ua/mobile/mobilnye-telefony-i-smartfony/?mode=series&sort=popularity)

## Description

This project is a application to parse data from online store and set them into database.

## Technologies

- [Node.js](https://nodejs.org/en)
- [MariaDb](https://mariadb.org/)
- [Axios](https://axios-http.com/)
- [Cheerio](https://cheerio.js.org/)


## Preview

Filled table products in the local database:

![image](https://github.com/bohdan-mykhailenko/parser/assets/76702178/e83d9385-5160-41fb-9087-99dc47ace377)

Parsed data on web page:

![image](https://github.com/bohdan-mykhailenko/parser/assets/76702178/ebfff9c6-6211-43f0-879a-dfb772fdeef2)


## Getting Started

**To get started with the app, follow these steps:**

1.  Clone the repo:
    
```shell
  https://github.com/bohdan-mykhailenko/parcer.git
```
    
2.  Navigate to the project dir:
   
```shell 
  cd pricing_table
```

3.  Install dependencies:
    
```shell
  npm install
```

3. Create database
```shell
 CREATE DATABASE store;
```

4. Create table
```shell
 CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2),
  image TEXT,
  general VARCHAR(255),
  screen_resolution VARCHAR(255),
  screen_type VARCHAR(255),
  processor VARCHAR(255),
  os VARCHAR(255),
  accumulator INT,
  camera TEXT,
  nfc VARCHAR(3)
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
