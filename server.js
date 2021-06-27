const express = require('express')
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error')


// Load config
dotenv.config({ path: "./config/config.env" })

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

// Load routes
const businessRoute = require('./routes/business')

// Middlewares
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

// Set routes
app.use('/api/v1/business', businessRoute)

app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server and exit process
  server.close(() => process.exit(1))
})
