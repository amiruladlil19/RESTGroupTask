const express = require("express");
const { validationResult } = require("express-validator");
const db_friend = require("../database/db_friend")
const db_user = require("../database/db_user")
const fn = require('../function/functions');
const { validateFriend } = require("../validator/validators");
const app = express.Router()

app.get('/friend', (req, res) => {
    if (req.session.authenticated) {
        res.send(db_friend);
    } else {
        res.status(403).json({
            status: "403 Forbidden",
            message: "You need to log in first"
        })
    }
})

app.get('/friend/:id', (req, res) => {
    if (req.session.authenticated) {
        const id = fn.isItemIdExist(db_friend, req.params.id)
        if (id) {
            res.status(200).send(id)
        } else {
            res.status(404).json({
                status: "404 Not Found",
                message: "friend not found or does not exist"
            })
        }
    } else {
        res.status(403).json({
            status: "403 Forbidden",
            message: "You need to log in first"
        })
    }
})

app.post('/friend', validateFriend, (req, res) => {
    if (req.session.authenticated) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: "400 Bad Request",
                message: errors.array().map(obj => `${obj.param} = ${obj.msg}`)
            })
        } else {
            if (fn.isIdExist(db_friend, req.body.id)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "friend id already exist"
                })
            } else if (fn.isNegativeNumber(req.body.id)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "id cannot be negative number"
                })
            } else if (!fn.isIdExist(db_user, req.body.userId)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "user id does not exist"
                })
            } else {
                db_friend.push(req.body)
                res.send(req.body)
            }
        }
    } else {
        res.status(403).json({
            status: "403 Forbidden",
            message: "You need to log in first"
        })
    }
})

app.put('/friend/:id', validateFriend, (req, res) => {
    if (req.session.authenticated) {
        const errors = validationResult(req)

        if (fn.isIdExist(db_friend, req.params.id)) {
            if (!errors.isEmpty()) {
                res.status(400).json({
                    status: "400 Bad Request",
                    messages: errors.array().map(obj => `${obj.param} = ${obj.msg}`)
                })
            } else if (fn.isNegativeNumber(req.body.id)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "id cannot be negative number"
                })
            } else {
                db_friend[fn.findIndexFromId(db_friend, req.params.id)] = req.body
                res.send(req.body)
            }
        } else {
            res.status(404).json({
                status: "404 Not Found",
                message: "friend id not found"
            })
        }
    } else {
        res.status(403).json({
            status: "403 Forbidden",
            message: "You need to log in first"
        })
    }
})

app.delete('/friend/:id', (req, res) => {
    if (req.session.authenticated) {
        const deletedItem = db_friend.splice(fn.findIndexFromId(db_friend, req.params.id), 1)
        res.send(deletedItem)
    } else {
        res.status(403).json({
            status: "403 Forbidden",
            message: "You need to log in as admin first"
        })
    }
})


module.exports = app