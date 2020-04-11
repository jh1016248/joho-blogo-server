const database = require('../libs/database')
const mongoose = require('mongoose')

const CatetorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
})
module.exports = database.model('category', CatetorySchema, 'categorys')
