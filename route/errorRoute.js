const express = require('express')
const app = express.Router()

app.get('/:path', (req, res) => {
    res.send('Hey miss/sir, we currently cant found what you lookin for')
})

// app.get('/:path', (req, res) =>{
//   res.render(req.params.path, {}, (err, html)=>{
//     if (err){
//       res.send('404')
//     }else{
//       res.send(html)
//     }
//   })
// })


module.exports = app