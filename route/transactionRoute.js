
const express = require("express");
const db = require("../database/db_transaction");
const app = express.Router()


app.get('/transaction/', (req, res) => {
    res.send(db)
});

app.get('/transaction/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((transaction) => {
        if (transaction.id === id) {
            return res.status(200).send({
                transaction,
            });
        }
    });
    return res.status(404).send({
        error: 'false',
        message: 'transaction does not exist',
    });
});

function isIdExist(id) {
    if (db.some(db => db.id == id)) return true;
    else return false;
}

function isDataComplete(newData) {
    if ('nominal' in newData
        && 'itemId' in newData
        && 'id' in newData
        && 'userId' in newData
        && 'friendId' in newData) return true;

    else return false;
}


app.post('/transaction/', (req, res) => {
    if (isIdExist(req.body.id)) {
        res.send('Id is already use')
    }
    else if (isDataComplete(req.body) == false) {
        res.send('complete the data')
    }
    else {
        db.push(req.body)
        res.send(req.body)
    }
})

app.put('/transaction/:index', (req, res) => {
    const index = req.params.index
    if (!Number(index)) {
        res.status(400).send('Input number please')
    } else if ((db.length - 1) < index) {
        res.status(400).send('Cannot found number of item')
    } else if (isIdExist(req.body.id)) {
        res.send('Id is already use')
    }
    else if (isDataComplete(req.body) == false) {
        res.send('complete the data')
    }
    else {
        db[req.params.index] = req.body
        res.send(req.body)
    }
})

app.delete('/transaction/:index', (req, res) => {
    const index = req.params.index
    const deletedItem = db.splice(index, 1)
    res.send(deletedItem)
})




module.exports = app