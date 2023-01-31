DROP DATABASE IF EXISTS bookclub_db;
CREATE DATABASE bookclub_db;

USE bookclub_db;

CREATE TABLE books (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    book_title VARCHAR(50),
    book_author VARCHAR(50),
    book_description TEXT
);

CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    review TEXT NOT NULL,
    FOREIGN KEY (book_id)
    REFERENCES books(id)
    ON DELETE SET NULL
)


