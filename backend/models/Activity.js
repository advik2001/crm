const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['assigned', 'closed'], 
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true
    // default: () => new Date().toLocaleDateString('en-CA') // YYYY-MM-DD format
  },
  time: {
    type: String,
    required: true
    // default: () => new Date().toLocaleTimeString('en-GB', {
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   hour12: false
    // }
  // ) // HH:mm format
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Activity', activitySchema)


// Only updated 2 times 
// When a lead is closed   -> leadController -> updateLeadDetails
// When a lead is assigned -> leadController -> assignLeadsToEmployees

// Get 2 times
// Admin dashboard -> adminRoutes ->  getAllActivities
// Employee Home -> adminRoutes ->  getAllActivities