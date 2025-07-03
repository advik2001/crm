// routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const { getSalesData, getClosedLeads } = require('../controllers/saleController');


router.get('/data', getSalesData); 
router.get('/closed-leads', getClosedLeads); 


module.exports = router;
