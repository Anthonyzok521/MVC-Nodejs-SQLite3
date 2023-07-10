const connection = require('../db/mysql_connection');

class LoginSystem {

    constructor() {
        this.active = false;
    }

    register(username, email, password) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE username = ?`;
            connection.all(query, [username], (error, data) => {
                if (error) {
                    reject(error);
                } else if (data.length > 0) {
                    reject(Error("Username already exists"));
                } else {
                    const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
                    connection.run(insertQuery, [username, email, password], (insertError) => {
                        if (insertError) {
                            reject(insertError);
                        } else {
                            console.log("User registered successfully");
                            resolve();
                        }
                    });
                }
            });
        });
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE email = ?`;
            connection.all(query, [email], (error, data) => {
                console.log(data);
                if (error) {
                    reject(error);
                } else if (data.length === 0) {
                    console.error("User not found");
                    reject(false);
                } else {
                    const user = data[0];
                    if (user.password !== password) {
                        console.error("Invalid password");
                        reject(false);
                    } else {
                        console.log(`User: ${user.username} logged`);
                        this.active = true;
                        resolve(true);
                    }
                }
            });
        });
    }

    get isActive() {
        return this.active;
    }

}

const loginSystem = new LoginSystem();

module.exports = loginSystem;