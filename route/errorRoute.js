const express = require('express')
const app = express.Router()

app.get('/:path', (req, res) => {
    res.send('Hey miss/sir, we currently cant found what you lookin for')
})



module.exports = app