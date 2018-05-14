const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Weapon Schema
let weaponSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        require: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    damage: {
        type: Number,
        required: true,
        trim: true
    },
    mobility: {
        type: Number,
        required: true,
        trim: true
    },
    range: {
        type: Number,
        required: true,
        trim: true
    },
    recoil: {
        type: Number,
        required: true,
        trim: true
    },
    fireRate: {
        type: Number,
        required: true,
        trim: true
    },
    accuracy: {
        type: Number,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    magSize: {
        type: Number,
        required: true,
        trim: true
    },
    ammo: {
        type: Number,
        required: true,
        trim: true
    },
    weaponId: {
        type: String,
        required: true,
        trim: true
    },
    skins: {
        type: [ObjectId],
        required: false,
    }
});

const Weapon = mongoose.model("Weapon", weaponSchema);
module.exports = Weapon;