const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('./routes/api.route');

// Declare the express app
const app = express();
const Weapon = require('./models/weapon');

// Connect to the mongo server
mongoose.connect('mongodb://localhost/bladedrone');
let db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

// Check connection
db.once('open', ()=> {
    console.log("Connected to MongoDB");
});

app.use(cors());

app.listen(3000, () => {
    console.log("listening on 3000");
});

app.use(api);
