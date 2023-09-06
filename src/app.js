const express = require('express');
const app = express();

// Middleawers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
const conn = require('./db/conn');
conn();

// Routes
const routes = require('./routes/router');
app.use('/', routes);

module.exports = app;
