const express = require("express");
const db = require("../database/db_item");
const fn = require('../function/functions');
const app = express.Router()



app.get('/item/', (req, res) => {
    res.send(db)
})

app.get('/item/:id', (req, res) => {
    const id = fn.isItemIdExist(db, req.params.id)
    id ? res.status(200).send(id) : res.status(404).send('item does not exist')
})

app.post('/item/', (req, res) => {
    if (fn.isIdExist(db, req.body.id)) {
        res.send('Id is already use')
    } else if (fn.isItemDataComplete(req.body) == false){
        res.send('Complete the data')
    } else {
        db.push(req.body)
        res.send(req.body)
    }
})

app.put('/item/:index', (req, res) => {
    const index = req.params.index
    if (isNaN(index)) {
        res.status(400).send('Input number please')
    } else if ((db.length - 1) < index) {
        res.status(400).send('Cannot found number of item')
    } else if (fn.isIdExist(db, req.body.id)) {
        res.send('Id is already use')
    } else if (fn.isItemDataComplete(req.body) == false){
        res.send('Complete the data')
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