const express = require("express");
const db = require("../database/db_item");
const app = express.Router()

function findId(db, itemId) {
    const result = db.find(({ id }) => id == itemId)
    return result
}

app.get('/item/', (req, res) => {
    res.send(db)
})

app.get('/item/:id', (req, res) => {
    const id = findId(db, req.params.id)
    id ? res.status(200).send(id) : res.status(404).send('item does not exist')
    //     const id = parseInt(req.params.id, 10);
    //     db.map((item) => {
    //         if (item.id === id) {
    //             return res.status(200).send({
    //                 item,
    //             });
    //         }
    //     });
    //     return res.status(404).send({
    //         error: 'false',
    //         message: 'item does not exist',
    //     });
})

function isIdExist(id, name) {
    if (db.some(db => db.id == id || db.name == name)) return true;
    else return false;
}

app.post('/item/', (req, res) => {
    if (isIdExist(req.body.id, req.body.name)) {
        res.send('Id or Name is already use')
    } else {
        db.push(req.body)
        res.send(req.body)
    }
})

app.put('/item/:index', (req, res) => {
    const index = req.params.index
    if (!Number(index)) {
        res.status(400).send('masukkan nomor')
    } else if ((db.length - 1) < index) {
        res.status(400).send('item nomor itu gaada')
    } else if (isIdExist(req.body.id, req.body.name)) {
        res.send('Id or Name is already use')
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