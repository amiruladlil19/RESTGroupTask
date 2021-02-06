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
    id ? res.send(id) : res.status(404).send('not found')
})



module.exports = app