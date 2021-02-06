const express = require("express");
const db = require("../database/db_user");
const app = express.Router()

app.post('/register', (req, res) => {
    db.push(req.body)
    res.send(req.body)
})

app.post('/login', (req, res) => {
    db.push(req.body)
    res.send(req.body)
})


module.exports = app