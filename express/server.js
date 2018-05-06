const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log(err)
    }
    
    db = client.db('ironsight')

    app.use(cors());

    app.listen(3000, function() {
        console.log('listening on 3000')
    })
    
    app.get('/api/weapons', (req, res) => {
        db.collection('weapons').find().toArray((err, results) => {
            res.json(results);
        });
    });
    
    app.get('/api/weapons/:name', (req, res) => {
        db.collection('weapons').findOne({name: req.params.name}, (err, result) => {
            res.send(result);
        });
    });
    
})

