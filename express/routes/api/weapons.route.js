const _ = require('lodash');
const express = require('express');
const Weapon = require('../../models/weapon');

const router = express.Router();

// No parameters
router.get('/', (req, res) => {
    console.log(req.query);
    
    if (_.isEmpty(req.query)){
        Weapon.find({}, (err, weapons) => {
            res.json(weapons);
        });
        return;
    }

    _.forEach(req.query, (value, key) => {
        console.log(value, key);
        Weapon.find({[key]: value}, (err, weapons) => {
            res.json(weapons);
        });
    });
});

router.get('/:name', (req, res) => {
    const name = req.params.name;
    console.log(name);
    Weapon.findOne({name: name}, (err, weapon) => {
        res.json(weapon);
    });
});

module.exports = router;