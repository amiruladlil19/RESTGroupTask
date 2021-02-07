
const express = require("express");
const db = require("../database/db_item");
const app = express.Router()

function isItemIdExist(db, itemId) {
    const result = db.find(({ id }) => id == itemId)
    return result
}

app.get('/item/', (req, res) => {
    res.send(db)
})

app.get('/item/:id', (req, res) => {
    const id = isItemIdExist(db, req.params.id)
    id ? res.status(200).send(id) : res.status(404).send('item does not exist')
})

function isIdExist(id) {
    if (db.some(db => db.id == id)) return true;
    else return false;
}

function isItemDataComplete(itemdb){
    if('id' in itemdb
        && 'userId' in itemdb
        && 'name' in itemdb
    ) return true;
    else return false;
}

app.post('/item/', (req, res) => {
    if (isIdExist(req.body.id)) {
        res.send('Id is already use')
    } else if (isItemDataComplete(req.body) == false){
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
    } else if (isIdExist(req.body.id)) {
        res.send('Id is already use')
    } else if (isItemDataComplete(req.body) == false){
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