const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: "./config/config.env" })

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})