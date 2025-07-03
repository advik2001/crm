const express = require('express')
const router = express.Router()
const { markCheckIn, markCheckOut } = require('../controllers/attendanceController')
const Attendance = require('../models/Attendance')


router.post('/checkin', markCheckIn)
router.post('/checkout', markCheckOut)

// GET /api/attendence/:userId
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const records = await Attendance.find({ user: id }).sort({ date: -1 }) // latest first
    res.json(records)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendance records' })
  }
})


module.exports = router
