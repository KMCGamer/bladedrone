const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Skin Schema
let skinSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        require: true
    },
    name: {
        type: String,
        require: true,
        trim: true
    },
    rarity: {
        type: String,
        require: true,
        trim: true
    },
    skinId: {
        type: String,
        require: true,
        trim: true
    }
});

const Skin = mongoose.model("Skin", skinSchema);
module.exports = Skin;