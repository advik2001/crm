const mongoose = require('mongoose')
// const {Lead} = require('./Lead')

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profileImageUrl: { type: String, default: null },
		role: {
			type: String,
			enum: ['admin', 'employee'],
			required: true,
			default: 'employee',
		},
		status: { 
			type: String,
			enum: ['active', 'inactive'],
			default: 'active',
		},
		assignedLeads: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Lead',
			},
		],
		closedLeads: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Lead',
			},
		], 
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
