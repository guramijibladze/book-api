const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bookRoute = require('./routes/book.route.js')
const cors = require('cors');


//middleware
app.use(express.json())
app.use(cors());

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