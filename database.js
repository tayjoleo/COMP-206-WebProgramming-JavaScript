/*
 * COMP 206 - Assignment 3
 * Taylor Evans - 4373570
 * This file connects to the MySQL database.
 */

const mysql = require('mysql2'); 

// Connect to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',    
    user: 'root',         
    password: '',         
    database: 'comp206',  
    port: 3306            
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.message);
        process.exit(1); 
    }
    console.log('Connected to MySQL database.');
});

module.exports = connection;
