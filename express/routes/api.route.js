const express = require('express');

const router = express.Router();

// Route variables
const weapons = require('./api/weapons.route');
const skins = require('./api/skins.route');

// Route modules
router.use('/api/weapons', weapons);
router.use('/api/skins', skins);

module.exports = router;