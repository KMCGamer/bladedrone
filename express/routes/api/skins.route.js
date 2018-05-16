const _ = require('lodash');
const express = require('express');
const Weapon = require('../../models/weapon');
const Skin = require('../../models/skin');

const router = express.Router();

// No parameters
router.get('/', (req, res) => {
    Skin.find({}, (err, skins) => {
        res.json(skins);
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    // console.log(name);
    Weapon.findOne({_id: id}, (err, weapon) => {
        Skin.find({ _id : weapon.skins}, (err, skins) => {
            res.json(skins);
        });
    });
});

module.exports = router;