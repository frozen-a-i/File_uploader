CREATE DATABASE upload_app;
USE upload_app;

CREATE TABLE users (
  id integer PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  -- img VARCHAR(255) NOT NULL,
);

INSERT INTO users (username, email,img)
VALUES 
('Frozen', 'frozen.ismoilova@gmail.com');

