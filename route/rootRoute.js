const express = require('express')
const app = express.Router()

app.get('/', (req, res) => {
    res.send('Welcome to ours API, created by Team no.2')
})

app.post('/', (req, res) => {
    res.send('Welcome to ours API, created by Team no.2')
})

app.put('/', (req, res) => {
    res.send('Welcome to ours API, created by Team no.2')
})

app.delete('/', (req, res) => {
    res.send('Welcome to ours API, created by Team no.2')
})

module.exports = app