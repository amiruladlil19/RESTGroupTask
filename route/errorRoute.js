const express = require('express')
const app = express.Router()

app.get('/:path', (req, res) => {
    res.status(404).json({
        status: "404 Not Found",
        message: 'we currently cant found what you lookin for'
    })
})

app.post('/:path', (req, res) => {
    res.status(404).json({
        status: "404 Not Found",
        message: 'we currently cant found what you lookin for'
    })
})

app.put('/:path', (req, res) => {
    res.status(404).json({
        status: "404 Not Found",
        message: 'we currently cant found what you lookin for'
    })
})

app.delete('/:path', (req, res) => {
    res.status(404).json({
        status: "404 Not Found",
        message: 'we currently cant found what you lookin for'
    })
})

module.exports = app