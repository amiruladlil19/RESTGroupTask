const express = require("express");
const dbitem = require("../dbitem");
const db = require("../dbitem");
const app = express.Router()

app.get('/item/', (req, res) => {
    res.send(db)
})

app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((item) => {
        if (item.id === id) {
            return res.status(200).send({
                item,
            });
        }
    });
    return res.status(404).send({
        error: 'false',
        message: 'item does not exist',
    });
})

app.post('/item/', (req, res) => {
    db.push(req.body);
    res.send(req.body)
})

app.put('/item/:index', (req, res) => {
    const index = req.params.index
    if (!Number(index)) {
        res.status(400).send('masukkan nomor')
    } else if ((db.length - 1) < index) {
        res.status(400).send('item nomor itu gaada')
    } else {
        db[req.params.index] = req.body
        res.send(req.body)
    }
})

app.delete('/item/:index', (req, res) => {
    const index = req.params.index
    const deletedItem = db.splice(index, 1)
    res.send(deletedItem)
})

module.exports = app