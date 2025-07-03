const Attendance = require('../models/Attendance')
// const { getCurrentDate, getCurrentTime } = require('../utils/dateUtils')
const moment = require('moment')

// exports.getCurrentDate = () => moment().format('YYYY-MM-DD')
// exports.getCurrentTime = () => moment().format('hh:mm A')

const getCurrentDate = () => moment().format('YYYY-MM-DD')
const getCurrentTime = () => moment().format('hh:mm A')

// POST /api/attendence/checkin
// exports.markCheckIn = async (req, res) => {
//   const { userId } = req.body
//   const today = getCurrentDate()
//   const now = getCurrentTime()

//   if (!userId) return res.status(400).json({ message: 'User ID is required' })

//   try {
//     const alreadyExists = await Attendance.findOne({ user: userId, date: today })
//     if (alreadyExists) {
//       return res.status(400).json({ message: 'User already checked in today' })
//     }

//     const attendance = new Attendance({
//       user: userId,
//       date: today,
//       checkInTime: now
//     })

//     await attendance.save()
//     res.status(201).json(attendance)
//   } catch (err) {
//     console.error('Check-in error:', err)
//     res.status(500).json({ message: 'Internal Server Error' })
//   }
// }
exports.markCheckIn = async (req, res) => {
  const { userId } = req.body
  const today = getCurrentDate()
  const now = getCurrentTime()

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' })
  }

  try {
    const existing = await Attendance.findOne({ user: userId, date: today })

    if (existing) {
      // ✅ Update check-in and clear checkout time
      existing.checkInTime = now
      existing.checkOutTime = null

      await existing.save()
      return res.status(200).json(existing)
    }

    // ✅ If no record exists, create new one
    const attendance = new Attendance({
      user: userId,
      date: today,
      checkInTime: now
    })

    await attendance.save()
    res.status(201).json(attendance)
  } catch (err) {
    console.error('Check-in error:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}


// POST /api/attendence/checkout
exports.markCheckOut = async (req, res) => {
  const { userId } = req.body
  const today = getCurrentDate()
  const now = getCurrentTime()

  if (!userId) return res.status(400).json({ message: 'User ID is required' })

  try {
    const attendance = await Attendance.findOne({ user: userId, date: today })
    if (!attendance) {
      return res.status(404).json({ message: 'No check-in found for today' })
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ message: 'Already checked out' })
    }

    attendance.checkOutTime = now
    await attendance.save()

    res.status(200).json(attendance)
  } catch (err) {
    console.error('Check-out error:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
