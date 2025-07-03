const mongoose = require('mongoose')

const CsvBatchSchema = new mongoose.Schema({
  name: String, // like CSV0625
  uploadDate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('CsvBatch', CsvBatchSchema)
