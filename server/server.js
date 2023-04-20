/// =======================================
/// This file (server.js) is ENTRY POINT (server-side)
/// =======================================
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
// all dependencies lifes up here -------------------------

// make const app to use express
const app = express();

// json middleware
app.use(express.json());

// ----------------------------------------------------configuring server
const db = config.get('mongoURI');
// connect db to mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  // promise based
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));
// ----------------------------------------------------- configuring server

/// ======================================= Routing
// route to items
const items = require('./routes/api/item-async');
app.use('/api/items', items);
const users = require('./routes/api/users-async');
app.use('/api/users', users);
const auth = require('./routes/api/auth-async');
app.use('/api/auth', auth);
const resetPass = require('./routes/api/resetPass-async');
app.use('/api/forgot-password', resetPass);

/// ================================================

// listen to port
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Your app is running on port: ${port}`));
