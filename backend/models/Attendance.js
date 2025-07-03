const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // Format: 'YYYY-MM-DD'
    required: true
  },
  checkInTime: {
    type: String, // Format: 'hh:mm A'
    default: null
  },
  checkOutTime: {
    type: String, // Format: 'hh:mm A'
    default: null
  }
})

attendanceSchema.index({ user: 1, date: 1 }, { unique: true })

module.exports = mongoose.model('Attendance', attendanceSchema)
