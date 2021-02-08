const express = require("express");
const { validationResult } = require("express-validator");
const db_user = require("../database/db_user");
const app = express.Router()
const fn = require("../function/functions");
const { validateRegister, validateLogin } = require("../validator/validators");

app.get('/users', (req, res) => {
    if (req.session.username == 'admin01') {
        res.send(db_user)
    } else {
        res.status(403).json({
            status: "403 Forbidden",
            message: "You need to log in as admin first"
        })
    }
})

app.post('/register', validateRegister, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: "400 Bad Request",
            messages: errors.array().map(obj => `${obj.param} = ${obj.msg}`)
        })
    } else {
        if (fn.isContainSpecialChars(req.body.username)) {
            res.status(400).json({
                status: "400 Bad Request",
                message: "only username with alphanumeric are accepted"
            })
        } else if (fn.isUserExist(db_user, req.body.id, req.body.username)) {
            res.status(400).json({
                status: "400 Bad Request",
                message: "id or username already exists"
            })
        } else if (fn.isNegativeNumber(req.body.id)) {
            res.status(400).json({
                status: "400 Bad Request",
                message: "id cannot be negative number"
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
            messages: errors.array().map(obj => `${obj.param} = ${obj.msg}`)
        })
    } else {
        if (fn.isCorrect(db_user, req.body.id, req.body.username, req.body.password)) {
            req.session.authenticated = true
            req.session.username = req.body.username
            res.status(200).json({
                status: "200 OK",
                message: "Login succesful"
            })
        } else if (fn.isPasswordCorrect(db_user, req.body.id, req.body.username, req.body.password)) {
            res.status(401).json({
                status: "401 Unauthorized",
                message: "Incorrect password"
            })
        } else {
            res.status(401).json({
                status: "401 Unauthorized",
                message: "Incorrect username"
            })
        }
    }
})

app.post('/logout', (req, res) => {
    if (req.session.authenticated) {
        req.session = null
        res.status(200).json({
            status: "200 OK",
            message: "Log out succesful"
        })
    } else {
        res.status(401).json({
            status: "401 Unauthorized",
            message: "Not logged in"
        })
    }
})


module.exports = app