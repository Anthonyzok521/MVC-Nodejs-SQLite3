//Create connection to mysql
const sqlite = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const connection = new sqlite.Database(path.join(__dirname, "data.db"), () => {
    console.log("Connect with SQLite 3");
    connection.run(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
    );`);

    connection.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );`);
});

/* 
connection.run(`INSERT INTO notes(id, title, description) VALUES (1, "Programming in JavaScript at 8 a.m.", "Create a web page with javascript");`);

connection.run(`INSERT INTO notes(id, title, description) VALUES (2, "Meeting at 10 a.m.", "Conversation with the president of the company");`);

connection.run(`INSERT INTO notes(id, title, description) VALUES (3, "Rest at 2 in the aftenoon", "Sleep after lunch.");`);

connection.run(`INSERT INTO users(id, username, email, password) VALUES (1, "thony", "thony@gmail.com", "123456");`); */

module.exports = connection;