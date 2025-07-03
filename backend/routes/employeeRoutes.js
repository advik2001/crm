const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Activity = require('../models/Activity')

// @route   PUT /api/employee/update/:id
// @desc    Update employee profile details
// @access  Employee only 
router.put('/update/:id', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  try {
    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' })
    }

    if (password && password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' })
    }

    // Find employee by ID
    const employee = await User.findById(req.params.id)

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    // Update fields
    employee.name = name
    employee.email = email

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      employee.password = hashedPassword
    }

    await employee.save()

    res.json({ message: 'Employee updated successfully', employee })
  } catch (error) {
    console.error('Error updating employee:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/employee/activity/:id
// @desc    Get employee activity details
// @access  Employee only 
router.get('/activity/:id', async (req, res) => {
  try {

    const limit = parseInt(req.query.limit) || 10
    const activities = await Activity.find({ employee: req.params.id })
      .populate('employee', 'name email') // populate employee info
      .sort({ date: -1, time: -1 }) // newest first
      .limit(limit)

    res.status(200).json(activities)
  } catch (err) {
    console.error('Error fetching activities:', err)
    res.status(500).json({ message: 'Server error fetching activities' })
  }
})




module.exports = router
