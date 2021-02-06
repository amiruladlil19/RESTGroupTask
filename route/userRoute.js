const express = require("express");
const db_user = require("../database/db_user");
const db = require("../database/db_user");
const app = express.Router()

function isUserExist(id, username) {
    if (db_user.some(db => db.id == id || db.username == username)) return true;
    else return false;
}

app.post('/register', (req, res) => {

    if (isUserExist(req.body.id, req.body.username)) {
        res.send('UserId or Username is already use')
    } else {
        db.push(req.body)
        res.send(req.body)
    }
})

function userExists(id, username, password) {
    return db_user.some(function (el) {
        return (el.id === id && el.username === username && el.password === password);
    });
}

app.post('/login', (req, res) => {
    if (userExists(req.body.id, req.body.username, req.body.password)) {
        res.send('login success')
    } else {
        res.status(401).send('id, username, or password incorrect')
    }
})


module.exports = app