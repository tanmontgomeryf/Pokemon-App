require('dotenv').config();

const express = require('express');
const connectDB = require('./db');

const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.use('/api/pokemon', require('./routes/api/pokemon'));
app.use('/api/user', require('./routes/api/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Currently serving at http://localhost:${PORT}`)
);
