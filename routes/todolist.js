/*
 * COMP 206 - Assignment 3
 * Taylor Evans - 4373570
 * This file handles all the routes for managing todos, including creating, updating, 
 * deleting, restoring, and fetching todo items from the database.
 */

const express = require('express');
const router = express.Router();
const db = require('../database'); 

// GET Fetch all non-deleted todos
router.get('/', (req, res) => {
    const query = 'SELECT * FROM todo_items WHERE deleted_ts IS NULL';

    db.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching todos:', err.message);
            return res.status(500).json({ error: 'An error occurred while fetching todos.' });
        }
        res.json(rows);
    });
});

// POST Create a new todo
router.post('/', (req, res) => {
    const { description } = req.body;

    // Ensure description is provided
    if (!description) {
        return res.status(400).json({ error: 'Description is required.' });
    }

    const query = `
        INSERT INTO todo_items (description, completed_ts, updated_ts, deleted_ts)
        VALUES (?, NULL, UNIX_TIMESTAMP(), NULL)
    `;

    db.query(query, [description], (err, results) => {
        if (err) {
            console.error('Error inserting todo:', err.message);
            return res.status(500).json({ error: 'An error occurred while creating the todo.' });
        }

        res.status(201).json({
            id: results.insertId,
            description,
            completed_ts: null,
            updated_ts: Math.floor(Date.now() / 1000),
            deleted_ts: null,
        });
    });
});

// GET Fetch a specific todo by ID
router.get('/:id', (req, res) => {
    const todoId = req.params.id;

    const query = 'SELECT * FROM todo_items WHERE id = ? AND deleted_ts IS NULL';

    db.query(query, [todoId], (err, rows) => {
        if (err) {
            console.error('Error fetching todo:', err.message);
            return res.status(500).json({ error: 'An error occurred while fetching the todo.' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found.' });
        }

        res.json(rows[0]);
    });
});

// PUT Update a specific todo by ID
router.put('/:id', (req, res) => {
    const todoId = req.params.id;
    const { description, completed_ts } = req.body;

    // Ensure description is provided
    if (!description) {
        return res.status(400).json({ error: 'Description is required.' });
    }

    const query = `
        UPDATE todo_items
        SET description = ?, completed_ts = ?, updated_ts = UNIX_TIMESTAMP()
        WHERE id = ? AND deleted_ts IS NULL
    `;

    db.query(query, [description, completed_ts || null, todoId], (err, results) => {
        if (err) {
            console.error('Error updating todo:', err.message);
            return res.status(500).json({ error: 'An error occurred while updating the todo.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Todo not found or already deleted.' });
        }

        res.json({
            id: todoId,
            description,
            completed_ts,
            updated_ts: Math.floor(Date.now() / 1000),
        });
    });
});

// DELETE Delete a specific todo by ID
router.delete('/:id/delete', (req, res) => {
    const todoId = req.params.id;

    const query = `
        UPDATE todo_items
        SET deleted_ts = UNIX_TIMESTAMP()
        WHERE id = ? AND deleted_ts IS NULL
    `;

    db.query(query, [todoId], (err, results) => {
        if (err) {
            console.error('Error soft-deleting todo:', err.message);
            return res.status(500).json({ error: 'An error occurred while deleting the todo.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Todo not found or already deleted.' });
        }

        res.status(204).send();
    });
});

// POST Restore a deleted todo by ID
router.post('/:id/restore', (req, res) => {
    const todoId = req.params.id;

    const query = `
        UPDATE todo_items
        SET deleted_ts = NULL, updated_ts = UNIX_TIMESTAMP()
        WHERE id = ? AND deleted_ts IS NOT NULL
    `;

    db.query(query, [todoId], (err, results) => {
        if (err) {
            console.error('Error restoring todo:', err.message);
            return res.status(500).json({ error: 'An error occurred while restoring the todo.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Todo not found or not deleted.' });
        }

        const selectQuery = 'SELECT * FROM todo_items WHERE id = ?';
        db.query(selectQuery, [todoId], (err, rows) => {
            if (err) {
                console.error('Error fetching restored todo:', err.message);
                return res.status(500).json({ error: 'An error occurred while fetching the restored todo.' });
            }
            res.json(rows[0]);
        });
    });
});

module.exports = router;
