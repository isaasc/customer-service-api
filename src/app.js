require('./models/product');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://fiap:123456@localhost:27017/admin');

const ticketRouter = require('./routers/ticket-route');
const index = require('./routers/index');

app.use('/ticket', ticketRouter);
app.use('/', index);

module.exports = app;