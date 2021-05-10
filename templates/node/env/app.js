const express = require('express');
const cors = require('cors');

const app = express();

// Template to add routes
const fooRoutes = require('./api/routes/foo');

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.APP_URI,
  })
);
app.use(cookieParser(process.env.SECRET_COOKIES));

app.use('/api', fooRoutes);

module.exports = app;
