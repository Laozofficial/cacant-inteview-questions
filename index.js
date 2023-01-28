const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDb = require('./backend/config/db');
//const port = process.env.PORT || 5000;
const port = process.env.NODE_DOCKER_PORT || 5000;

connectDb();
// initialize express
const app = express();
// initialize middlewar
app.use(express.json());
app.use('/api/user', require('./backend/routes/userRoutes'));



// app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app; 