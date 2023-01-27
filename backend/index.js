const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDb = require('./config/db');
const port = process.env.PORT || 5000;

connectDb();
// initialize express
const app = express();
// initialize middleware
app.use(express.json());
app.use('/api/user', require('./routes/userRoutes'));



app.listen(port, () => console.log(`Server started on port ${port}`));