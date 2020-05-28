require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const compression = require('compression');

const app = express();
connectDB();

app.use(express.json({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(compression());

app.use('/api/pokemon', require('./routes/api/pokemon'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Currently serving at http://localhost:${PORT}`)
);
