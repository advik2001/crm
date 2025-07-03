const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
  sale_date: {
    type: Date,
    default: Date.now
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { 
  timestamps: true
})

module.exports = mongoose.model('Sale', saleSchema)
 