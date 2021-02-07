
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
    const id = fn.isItemIdExist(db, req.params.id)
    id ? res.status(200).send(id) : res.status(404).send('friend not found')
})

app.post('/friend/', (req, res) => {
    if (fn.isIdExist(db, req.body.id)) {
        res.send('Id is already use')
    } else if (fn.isItemDataComplete(req.body) == false) {
        res.send('Complete the data')
    } else {
        db.push(req.body)
        res.send(req.body)
    }
})

app.put('/friend/:index', (req, res) => {
    const index = req.params.index
    if (isNaN(index)) {
        res.status(400).send('Input number please')
    } else if ((db.length - 1) < index) {
        res.status(400).send('Cannot found number of friend')
    } else if (fn.isIdExist(db, req.body.id)) {
        res.send('Id is already use')
    } else if (fn.isItemDataComplete(req.body) == false) {
        res.send('Complete the data')
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