// routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const {createLead, getLeadsByUser, updateLeadDetails, uploadLeadsFromCSV, getAllLeads, assignLeadsToEmployees, getCSVBatches} = require('../controllers/leadController');


router.post('/add', createLead); // Add a new lead

router.get('/user/:userId', getLeadsByUser); // Get leads assigned to a specific user

router.put('/update/:id', updateLeadDetails); // Edit lead details

router.post('/bulk-upload', uploadLeadsFromCSV); // to accept parsed CSV data from the upload

router.get('/', getAllLeads)   // Get all leads 

router.post('/assign-leads', assignLeadsToEmployees)  // assign the leads

router.get('/csv-batches', getCSVBatches)


module.exports = router;
