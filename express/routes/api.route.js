const express = require('express');

const router = express.Router();

// Route variables
const weapons = require('./api/weapons.route')

// Route modules
router.use('/api/weapons', weapons);

module.exports = router;