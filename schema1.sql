CREATE DATABASE upload_app;
USE upload_app;

CREATE TABLE users (
  id integer PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  -- img VARCHAR(255) NOT NULL,
);

INSERT INTO users (username, email)
VALUES 
('Frozen', 'frozen.ismoilova@gmail.com');

CREATE TABLE `files` (
  `user_id` int NOT NULL,
  `file_name` varchar(1000) DEFAULT NULL
) 