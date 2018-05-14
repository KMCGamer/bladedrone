const express = require('express');
const Weapon = require('../../models/weapon');

const router = express.Router();

// No parameters
router.get('/', (req, res) => {
    console.log(req.query);
    if (req.query.type) {
        Weapon.find({type: req.query.type}, (err, weapons) => {
            res.json(weapons);
        });
    } else if (req.query.category) {
        Weapon.find({category: req.query.category}, (err, weapons) => {
            res.json(weapons);
        });
    } else {
        Weapon.find({}, (err, weapons) => {
            res.json(weapons);
        });
    }
});

module.exports = router;