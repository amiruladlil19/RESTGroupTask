const express = require("express");
const { validationResult } = require("express-validator");
const db_friend = require("../database/db_friend");
const db_transaction = require("../database/db_transaction");
const db_user = require("../database/db_user");
const db_item = require("../database/db_item");
const db = require("../database/db_transaction");
const app = express.Router()
const fn = require("../function/functions");
const { validateTransaction } = require("../validator/validators");



app.get('/transaction/', (req, res) => {
    if (req.session.authenticated) {
        res.send(db)
    } else {
        res.status(403).json({
            status: "403 Forbidden",
            message: "You need to log in first"
        })
    }
})

app.get('/transaction/:id', (req, res) => {
    if (req.session.authenticated) {
        const id = fn.isItemIdExist(db_transaction, req.params.id)
        if (id) {
            res.status(200).send(id)
        } else {
            res.status(404).json({
                status: "404 Not Found",
                message: "transaction not found or does not exist"
            })
        }
    } else {
        res.status(403).json({
            status: "403 Forbidden",
            message: "You need to log in first"
        })
    }
})

app.post('/transaction', validateTransaction, (req, res) => {
    if (req.session.authenticated) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: "400 Bad Request",
                message: errors.array().map(obj => `${obj.param} = ${obj.msg}`)
            })
        } else {
            if (fn.isIdExist(db_transaction, req.body.id)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "transaction id already exist"
                })
            } 
            else if (fn.isNegativeNumber(req.body.id)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "id cannot be negative number"
                })
            }
            else if (!fn.isIdExist(db_user, req.body.userId)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "user id does not exist"
                })
            }
            else if (!fn.isIdExist(db_friend, req.body.friendId)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "friend id does not exist"
                })
            }
            else if (!fn.isIdExist(db_item, req.body.itemId)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "item id does not exist"
                })
            }
            else if (fn.isNegativeNumber(req.body.nominal)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "nominal cannot be negative number"
                })
            }
            else {
                db_transaction.push(req.body)
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

app.put('/transaction/:id', validateTransaction, (req, res) => {
    if (req.session.authenticated) {
        const errors = validationResult(req)

        if (fn.isIdExist(db_transaction, req.params.id)) {
            if (!errors.isEmpty()) {
                res.status(400).json({
                    status: "400 Bad Request",
                    messages: errors.array().map(obj => `${obj.param} = ${obj.msg}`)
                })
            }
            else if (fn.isNegativeNumber(req.body.id)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "id cannot be negative number"
                })
            } 
            else if (!fn.isIdExist(db_user, req.body.userId)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "user id does not exist"
                })
            }
            else if (!fn.isIdExist(db_friend, req.body.friendId)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "friend id does not exist"
                })
            }
            else if (!fn.isIdExist(db_item, req.body.itemId)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "item id does not exist"
                })
            }
            else if (fn.isNegativeNumber(req.body.nominal)) {
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "nominal cannot be negative number"
                })
            } else {
                db_transaction[fn.findIndexFromId(db_transaction, req.params.id)] = req.body
                res.send(req.body)
            }
        } else {
            res.status(404).json({
                status: "404 Not Found",
                message: "transaction id not found"
            })
        }
    } else {
        res.status(403).json({
            status: "403 Forbidden",
            message: "You need to log in first"
        })
    }
})

app.delete('/transaction/:id', (req, res) => {
    if (req.session.authenticated) {
        const deletedItem = db_transaction.splice(fn.findIndexFromId(db_transaction, req.params.id), 1)
        res.send(deletedItem)
    } else {
        res.status(403).json({
            status: "403 Forbidden",
            message: "You need to log in first"
        })
    }
})


module.exports = app
