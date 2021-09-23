const express = require('express');
const connectDB = require('./config/database');
const routes = require("./app/routes");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();



app.use(cors({
    origin:['*', '']
}));

//connect db
connectDB();

//init Middleware
app.use(express.json({ extended: false }))

//Define routes
app.use('/api/v1', routes);

// Catching none-existing routes and other errors
app.use((req, res, next) => {
    const error = new Error("Route not found!");
    error.status = 404;
    next(error);
  });
  
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
      status: error,
      message: error.message,
    });
  });

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));