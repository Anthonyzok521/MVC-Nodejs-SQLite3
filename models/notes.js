//Modelo que maneja la base datos

//Call connection mysql
const connection = require('../db/mysql_connection');

let querys = {
    select: "SELECT * FROM notes",
    insert: "INSERT INTO notes (title, description) VALUES (?, ?)",
    update: "UPDATE notes SET title = ?, description = ? WHERE id = ?",
    delete: "DELETE FROM notes WHERE id = ?"
};

function getNotes() {
    return new Promise((resolve, reject) => {
        connection.all(querys.select, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function insertNote(title, description) {

    return new Promise((resolve, reject) => {
        connection.run(querys.insert, [title, description], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function deleteNote(id) {
    return new Promise((resolve, reject) => {
        connection.run(querys.delete, [id], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function editNote(id, newTitle, newDescription) {
    return new Promise((resolve, reject) => {
        connection.run(querys.update, [newTitle, newDescription, id], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


module.exports = {
    getNotes,
    insertNote,
    deleteNote,
    editNote
};