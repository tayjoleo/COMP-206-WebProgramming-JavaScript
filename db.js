/*
 * COMP 206 - Assignment 3
 * Taylor Evans - 4373570
 * This file sets up the SQLite database and initializes the todo_items table.
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create the todo_items table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS todo_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            completed_ts DATETIME NULL,
            updated_ts DATETIME NULL,
            deleted_ts DATETIME NULL
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table initialized successfully.');
        }
    });
});

// Export the database connection for use in other files
module.exports = db;
