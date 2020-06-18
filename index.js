require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const compression = require('compression');
const path = require('path');

const app = express();
connectDB();

app.use(express.json({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(compression());

app.use('/api/pokemon', require('./routes/api/pokemon'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Currently serving at http://localhost:${PORT}`)
);
