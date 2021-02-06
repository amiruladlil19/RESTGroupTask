const express = require("express");
const transactionDB = require("../database/db_transaction");
const app = express.Router()


app.get('/transaction/', (req, res) => {
    res.send(transactionDB)
});

app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((item) => {
        if (item.id === id) {
            return res.status(200).send({
                item,
            });
        }
    });
    return res.status(404).send({
        error: 'false',
        message: 'item does not exist',
    });
});

app.put('/transaction/:index', (req, res) => {
    const index = req.params.index
    if (!Number(index)) {
        res.status(400).send('Please input a number')
    } else if ((transactionDB.length - 1) < index) {
        res.status(400).send('Out of index')
    } else {
        db[req.params.index] = req.body
        res.send(req.body)
    }
});

app.delete('/item/:index', (req, res) => {
    const index = req.params.index
    const deletedItem = transactionDB.splice(index, 1);
    res.send(deletedItem);
});



module.exports = app