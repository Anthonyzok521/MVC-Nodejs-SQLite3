/* Esquema de la base de datos */
CREATE DATABASE IF NOT EXISTS dialy_notes;

USE dialy_notes;

CREATE TABLE IF NOT EXISTS notes (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO notes(title, description) VALUES ("Programming in JavaScript at 8 a.m.", "Create a web page with javascript"), ("Meeting at 10 a.m.", "Conversation with the president of the company"), ("Rest at 2 in the aftenoon", "Sleep after lunch.");

INSERT INTO users(username, email, password) VALUES ("thony", "thony@gmail.com", "1234");