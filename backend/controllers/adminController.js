const User = require('../models/User')
const Lead = require('../models/Lead');
const Activity = require('../models/Activity');


exports.getAdminDashboard = (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard' });
}


// @desc    Get all employees
// @route   GET /api/admin/employees
// @access  Private (Admin only)
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('-password');

    const result = await Promise.all(
      employees.map(async (emp) => {
        const assignedCount = await Lead.countDocuments({ assignedTo: emp._id, status: { $ne: 'closed' } });
        const closedCount = await Lead.countDocuments({ assignedTo: emp._id, status: 'closed' });

        return {
          _id: emp._id,
          name: emp.name,
          email: emp.email,
          role: emp.role,
          status: emp.status,
          profileImageUrl: emp.profileImageUrl,
          assignedLeadsCount: assignedCount,
          closedLeadsCount: closedCount,
        };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// @desc    Edit employee
// @route   PUT /api/admin/employees/:id
// @access  Private (Admin only)
exports.editEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email } = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    if (name) user.name = name
    if (email) user.email = email

    const updatedUser = await user.save()
    res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error updating employee:', error)
    res.status(500).json({ message: 'Failed to update employee' })
  }
}

// @desc    Delete employee
// @route   DELETE /api/admin/employees/:id
// @access  Private (Admin only)
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params

    const employee = await User.findById(id)
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    // Unassign ongoing leads from this employee
    await Lead.updateMany(
      { assignedTo: id, status: 'ongoing' },
      { $set: { assignedTo: null } }
    )

    // Delete the employee
    await User.findByIdAndDelete(id)

    res.status(200).json({ message: 'Employee deleted and ongoing leads unassigned' })
  } catch (error) {
    console.error('Error deleting employee:', error)
    res.status(500).json({ message: 'Server error while deleting employee' })
  }
}



// @desc    Get all activities
// @route   GET /api/admin/activity
// @access  Private (Admin only)
exports.getAllActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const activities = await Activity.find()
      .populate('employee', 'name email') // optional: populate employee info
      .sort({ date: -1, time: -1 }) // newest first
      .limit(limit)

    res.status(200).json(activities)
  } catch (err) {
    console.error('Error fetching activities:', err)
    res.status(500).json({ message: 'Server error fetching activities' })
  }
};


// @desc    Update admin profile
// @route   PUT /api/admin/update-profile
// @access  Private (admin only)
exports.updateAdminProfile = async (req, res) => {

  try {
    // const adminId = req.user._id;

    const { name, email } = req.body;

    const user = await User.findOne({ role: "admin" });
    if (!user) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update fields if they are provided
    if (name) user.name = name;
    if (email) user.email = email;
    // if (password) {
    //   const salt = await bcrypt.genSalt(10);
    //   user.password = await bcrypt.hash(password, salt);
    // }

    const updatedUser = await user.save();

    // Exclude password from response
    const { ...userData } = updatedUser.toObject();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: userData,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};