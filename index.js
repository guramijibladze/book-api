const express = require('express')
const mongoose = require('mongoose');
const Book = require('./models/books.model.js')
const bookRoute = require('./routes/book.route.js')
const app = express()

//middleware
app.use(express.json())

//routes
app.use('/api/books', bookRoute)

mongoose.connect('mongodb+srv://admin:xyokGYExe8p1ZVV4@backendbookdb.odpy3.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendBookDB')
  .then(() => {
    console.log('Connected!')
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
  })
  .catch(() => {
    console.log('Connection failed!!!')
  })

// Password:xyokGYExe8p1ZVV4
// Username:admin