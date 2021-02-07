const express = require("express");
const { validationResult } = require("express-validator");
const db_user = require("../database/db_user");
const fn = require('../function/functions');
const { validateRegister, validateLogin } = require('../validator/validators')
const app = express.Router()

app.get('/register', (req, res) => {
    res.send(db_user)
})
app.post('/register', validateRegister, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: "400 Bad Request",
            messages: errors.array().map(msg => `${msg.param} = ${msg.msg}`)
        })
    } else {
        if (fn.isUserExist(db_user, req.body.id, req.body.username)) {
            res.status(400).json({
                status: "400 Bad Request",
                messages: "id or username already exists"
            })
        } else {
            db_user.push(req.body)
            res.send(req.body)
        }
    }
})

app.post('/login', validateLogin, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(401).json({
            status: "401 Unauthorized",
            messages: errors.array().map(msg => `${msg.param} = ${msg.msg}`)
        })
    } else {
        if (fn.isCorrect(db_user, req.body.username, req.body.password)) {
            res.send('ok')
        } else {
            res.status(401).json({
                status: "401 Unauthorized",
                messages: "username or password is incorrect"
            })
        }
    }
})


module.exports = app