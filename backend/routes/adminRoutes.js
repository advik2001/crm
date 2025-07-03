const express = require('express');
const { getAdminDashboard, getAllEmployees, updateAdminProfile, getAllActivities, editEmployee, deleteEmployee } = require('../controllers/adminController');

const Activity = require('../models/Activity');

const router = express.Router();

router.get('/dashboard', getAdminDashboard);

// router.get('/leads', getAllLeads);  // to get all leads

router.get('/activity', getAllActivities)  // to get all activities

router.get('/employees', getAllEmployees);  // to get all employees

router.put('/employees/:id', editEmployee);  // to edit employees

router.delete('/employees/:id', deleteEmployee) // to delete employee

router.put('/update-profile', updateAdminProfile); // to update details of admin


module.exports = router;

