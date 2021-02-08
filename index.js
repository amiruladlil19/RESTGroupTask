
const express = require("express");
const app = express();
const cookieSession = require('cookie-session');
const itemRoute = require('./route/itemRoute');
const friendRoute = require('./route/friendRoute');
const transactionRoute = require('./route/transactionRoute');
const userRoute = require('./route/userRoute');
const rootRoute = require('./route/rootRoute');
const errorRoute = require('./route/errorRoute');

app.use(cookieSession({
    name: 'session',
    keys: ['key1']
}))

app.use(express.json()); // middleware
app.use(itemRoute);
app.use(friendRoute);
app.use(transactionRoute);
app.use(userRoute);
app.use(rootRoute);
app.use(errorRoute);
app.use(function (error, req, res, next) { //handling error
    res.send(error.message);
})

const port = 4000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})


