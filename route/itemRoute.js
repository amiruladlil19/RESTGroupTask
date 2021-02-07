const express = require("express");
const { validationResult } = require("express-validator");
const db_item = require("../database/db_item");
const db_user = require("../database/db_user");
const fn = require('../function/functions');
const { validateItem } = require("../validator/validators");
const app = express.Router()



app.get('/item/', (req, res) => {
    res.send(db_item)
})

app.get('/item/:id', (req, res) => {
    const id = fn.isItemIdExist(db_item, req.params.id)
    if (id) {
        res.status(200).send(id)
    } else {
        res.status(404).json({
            status: "404 Not Found",
            message: "Item not found or does not exist"
        })
    }
})

app.post('/item/',validateItem, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: "400 Bad Request",
            message: errors.array().map(obj => `${obj.param} = ${obj.msg}`)
        })
    } else {
        if (fn.isIdExist(db_item, req.body.id)) {
            res.status(400).json({
                status: "400 Bad Request",
                message: "item id already exist"
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
            db_item.push(req.body)
            res.send(req.body)
        }
    }
})

app.put('/item/:id', validateItem, (req, res) => {
    const errors = validationResult(req)

    if (fn.isIdExist(db_item, req.params.id)) {
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
            db_item[fn.findIndexFromId(db_item, req.params.id)] = req.body
            res.send(req.body)
        }
    } else {
        res.status(404).json({
            status: "404 Not Found",
            message: "item id not found"
        })
    }
})

app.delete('/item/:id', (req, res) => {
    const deletedItem = db_item.splice(fn.findIndexFromId(db_item, req.params.id), 1)
    res.send(deletedItem)
})


module.exports = app