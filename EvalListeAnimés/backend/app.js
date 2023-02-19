const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const upcomingRoute= require('./src/routes/upcomingRoute')
const toWatchRoute= require('./src/routes/toWatchRoute')
const animesRoute= require('./src/routes/animesRoute')
const cors = require('cors')
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(animesRoute)
app.use(upcomingRoute)
app.use(toWatchRoute)
app.get ('/', (request, response) => {
    response.send("ca marche ");
});

module.exports = app;