const express = require('express')
const config = require('../config')
const bodyParser = require('body-parser')
const db = require('./db')
const cors = require('cors')
const app = express()

app.use(bodyParser.json());
app.use(cors())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/api', (req, res) => {
    res.redirect('/api/library')
})

app.post('/api/library', db.addBook)
app.get('/api/library', db.getBooks)
app.get('/api/library/:id', db.getBooksByID)
app.put('/api/library/:id', db.updateBook)
app.delete('/api/library/:id', db.deleteBook)

app.listen(config.apiPort, () => console.log(`Books-app listening at http://localhost:${config.apiPort}`))