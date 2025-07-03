const User = require('../models/User')
const Lead = require('../models/Lead')
const Sale = require('../models/Sale')

// Utility to get short weekday
const getWeekdayName = (date) =>
	new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)

// @desc    Get all sales data for the last 14 days
// @route   GET /api/sales/data
// @access  Private (Admin only)
exports.getSalesData = async (req, res) => {
	try {
		const today = new Date()
		const fourteenDaysAgo = new Date()
		fourteenDaysAgo.setDate(today.getDate() - 13) // include today = 14 days total

		const sales = await Sale.find({
			sale_date: {
				$gte: new Date(fourteenDaysAgo.setHours(0, 0, 0, 0)),
				$lte: new Date(today.setHours(23, 59, 59, 999)),
			},
		})

		// Build a map from date string to count
		const countsMap = {}

		sales.forEach((sale) => {
			const dateKey = new Date(sale.sale_date).toDateString()
			countsMap[dateKey] = (countsMap[dateKey] || 0) + 1
		})

		// Prepare final array for the last 14 days
		const result = []
		for (let i = 13; i >= 0; i--) {
			const date = new Date()
			date.setDate(date.getDate() - i)
			const dateKey = date.toDateString()
			result.push({
				name: getWeekdayName(date),
				value: countsMap[dateKey] || 0,
			})
		}

		res.json(result)
	} catch (err) {
		console.error('Error fetching sales:', err)
		res.status(500).json({ error: 'Server error' })
	}
}

// @desc    Get all sales data for the last 14 days
// @route   GET /api/sales/closed-leads
// @access  Private (Admin only)
exports.getClosedLeads = async (req, res) => {
	try {
		// Get all unique closed lead IDs from the sales collection
		const closedLeads = await Sale.countDocuments()
		res.status(200).json({ totalClosedLeads: closedLeads })
	} catch (err) {
		console.error('Error fetching closed leads:', err)
		res.status(500).json({
			success: false,
			message: 'Failed to fetch closed leads',
		})
	}
}
