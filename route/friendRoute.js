const express = require("express");
const db = require("../database/db_friend")
const app = express.Router()

function findId(db, itemId) {
    const result = db.find(({ id }) => id == itemId)
    return result
}

app.get('/friend', (req, res) => {
    res.send(db);
})

app.get('/friend/:id', (req, res) => {
    const id = findId(db, req.params.id)
    id ? res.send(id) : res.status(404).send('friend not found')
})

app.post('/friend/', (req, res) => {
    db.push(req.body);
    res.send(req.body)
})

app.put('/friend/:index', (req, res) => {
    const index = req.params.index
    if (!Number(index)) {
        res.status(400).send('input nomor')
    } else if ((db.length - 1) < index) {
        res.status(400).send('item nomor itu gaada')
    } else {
        db[req.params.index] = req.body
        res.send(req.body)
    }
})

app.delete('/friend/:index', (req, res) => {
    const index = req.params.index
    const deletedItem = db.splice(index, 1)
    res.send(deletedItem)
})

module.exports = app