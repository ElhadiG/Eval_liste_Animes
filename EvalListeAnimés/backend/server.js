const app = require('./app')
const port = 3100

app.listen(port, () => {
    console.log("L'application tourne sur le port " + port)
})