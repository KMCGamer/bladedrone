const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log(err)
    }
    
    db = client.db('bladedrone')

    app.use(cors());

    app.listen(3000, function() {
        console.log('listening on 3000')
    })
    
    app.get('/api/weapons', (req, res) => {
        console.log(req.query);
        switch (req.query.filter) {
            case "Assault Rifles":
                db.collection('weapons').find({"type":"Assault Rifle"}).sort({name: 1}).toArray((err, results) => {
                    res.json(results);
                });
                break;
            case "Submachine Guns":
                db.collection('weapons').find({"type":"Submachine Gun"}).sort({name: 1}).toArray((err, results) => {
                    res.json(results);
                });
                break;
            case "Light Machine Guns":
                db.collection('weapons').find({"type":"Light Machine Gun"}).sort({name: 1}).toArray((err, results) => {
                    res.json(results);
                });
                break;
            case "Sniper Rifles":
                db.collection('weapons').find({"type":"Sniper Rifle"}).sort({name: 1}).toArray((err, results) => {
                    res.json(results);
                });
                break;
            case "Secondary":
                db.collection('weapons').find({"category":"Secondary"}).sort({name: 1}).toArray((err, results) => {
                    res.json(results);
                });
                break;
            default:
                db.collection('weapons').find().sort({name: 1}).toArray((err, results) => {
                    res.json(results);
                });
                break;
        }
        
    });
    
    app.get('/api/weapons/:name', (req, res) => {
        db.collection('weapons').findOne({name: req.params.name}, (err, result) => {
            res.send(result);
        });
    });

    app.get('/api/weapons/?name')
    
})

