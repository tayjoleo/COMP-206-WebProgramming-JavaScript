/*
 * COMP 206 - Assignment 3
 * Taylor Evans - 4373570
 * This file handles the root route and gives basic information about the app.
 */

var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function (req, res, next) {
  res.send(`
    <h1>COMP 206 Assignment 3 Backend</h1>
    <p>This is the backend for a Todo application built with Express.js and MySQL.</p>
    <p>Available Endpoints:</p>
    <ul>
      <li><strong>GET /todos</strong>: Fetch all non-deleted todos.</li>
      <li><strong>POST /todos</strong>: Create a new todo.</li>
      <li><strong>GET /todos/:id</strong>: Fetch a specific todo by ID.</li>
      <li><strong>PUT /todos/:id</strong>: Update a specific todo.</li>
      <li><strong>DELETE /todos/:id/delete</strong>: Soft delete a specific todo.</li>
      <li><strong>POST /todos/:id/restore</strong>: Restore a soft-deleted todo.</li>
    </ul>
  `);
});

module.exports = router;