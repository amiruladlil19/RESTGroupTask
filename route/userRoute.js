const express = require("express");
const { validationResult } = require("express-validator");
const db_user = require("../database/db_user");
//const db = require("../database/db_user");
const app = express.Router()
const exfunction = require("../function/functions")

app.get('/register', (req, res) => {
    res.send(db_user)
})

// function isUserExist(id, username) {
//     if (db_user.some(db_user => db_user.id == id || db_user.username == username)) return true;

//     else return false;
// }

app.post('/register', (req, res) => {

    if (exfunction.isUserExist(db_user, req.body.id, req.body.username)) {
        res.send('UserId or Username is already use')
    } else {
        db_user.push(req.body)
        res.send(req.body)
    }
})

// function userExists(id, username, password) {
//     return db_user.some(function (el) {
//         return (el.id === id && el.username === username && el.password === password);
//     });
// }

// function password(db_user, id, username, password) {
//     intId = parseInt(id, 10)
//     const result = db_user.some(user => user.id === intId && user.username == username && user.password != password)
//     return result
// }

app.post('/login', (req, res) => {
    if (exfunction.isCorrect(db_user, req.body.id, req.body.username, req.body.password)) {
        res.send('login success')
    } else if (exfunction.isPasswordCorrect(db_user, req.body.id, req.body.username, req.body.password)) {
        res.status(401).send(`Password incorrect
        Please enter the correct password`)
    } else {
        res.status(401).send(`id, username, or password incorrect
        Please register first`)
    }
})


module.exports = app