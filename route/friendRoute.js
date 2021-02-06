const express = require("express");
const db = require("../database/db_friend")
const app = express.Router()

app.get('/friend', (req, res) => {
    res.send(db);
})

app.get('/friend/:id', (req, res) => {
    res.send(db[req.params.id - 1]);
})



module.exports = app