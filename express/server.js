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
        switch (req.query.filter) {
            case "Secondary":
                db.collection('weapons').find({"category":"Secondary"}).toArray((err, results) => {
                    res.json(results);
                });
                break;
            case "Assault Rifles":
                db.collection('weapons').find({"type":"Assault Rifle"}).toArray((err, results) => {
                    res.json(results);
                });
                break;
        
            default:
                db.collection('weapons').find().toArray((err, results) => {
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

