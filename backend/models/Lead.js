const mongoose = require('mongoose')

const LeadSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		phone: Number,
		recieved_date: Date,
		status: {
			type: String,
			enum: ['ongoing', 'closed'],
			default: 'ongoing',
		},
		type: {
			type: String,
			enum: ['hot', 'warm', 'cold'],
			default: 'warm',
		},

		schedule_date: {
			type: String, // Format: "YYYY-MM-DD"
			default: null,
		},

		schedule_time: {
			type: String, // Format: "HH:mm" (24-hour)
			default: null,
		},

		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null,
		},
		batchId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CsvBatch',
			default: null,
		},

		language: String,
		location: String,
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Lead', LeadSchema)
