const session = require('express-session')
const mongoose = require('mongoose')
const MongoDBSession = require('connect-mongodb-session')(session)
const { CheckConnection } = require('../repository/dbconnect')
require("dotenv").config();

exports.SetMongo = (app) => {
  //mongodb
  mongoose.connect('mongodb://localhost:27017/BMSS').then((res) => {
    console.log('MongoDB Connected!')
  })

  const store = new MongoDBSession({
    uri: 'mongodb://localhost:27017/BMSS',
    collection: 'BMSSSessions',
    expires: 1000 * 60 * 60 * 24,
  })

  //Session
  app.use(
    session({
      secret: '5L Secret Key',
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  )

  //Check SQL Connection
  CheckConnection()
}
