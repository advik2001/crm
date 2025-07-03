import React, { useState } from 'react'
import axios from 'axios'
import { Calendar, Edit, Clock, CheckCircle, Info } from 'lucide-react'
// import './Leads.css'

const LeadCard = ({ lead, onUpdate }) => {
	const [showTypeModal, setShowTypeModal] = useState(false)
	const [showScheduleModal, setShowScheduleModal] = useState(false)
	const [showStatusModal, setShowStatusModal] = useState(false)
	const [type, setType] = useState(lead.type)
	const [status, setStatus] = useState(lead.status)
	const [date, setDate] = useState('')
	const [time, setTime] = useState('')

	const updateLead = async (updates) => {
		try {
			const res = await axios.put(
				`http://localhost:5001/api/leads/update/${lead._id}`,
				updates
			)
			onUpdate() // refresh lead list
		} catch (err) {
			console.error('Error updating lead:', err)
		}
	}

	const handleScheduleSave = () => {
		if (!date || !time) return

		updateLead({
			schedule_date: date,
			schedule_time: time,
		})
		setShowScheduleModal(false)
	}

	const formattedDate = lead.recieved_date
		? new Date(lead.recieved_date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: '2-digit',
		  })
		: 'N/A'

	return (
		// <li className='lead-card-ui'>
		// 	<div className='lead-left-border' />
		// 	<div className='lead-main'>
		// 		<div className='lead-info'>
		// 			<h4>{lead.name}</h4>
		// 			<p className='lead-email'>@{lead.email}</p>
		// 			<p className='lead-date-label'>Date</p>
		// 			<p className='lead-date'>
		// 				<Calendar size={16} /> {formattedDate}
		// 			</p>
		// 		</div>
		// 		<div className='lead-status-circle'>
		// 			<span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
		// 		</div>
		// 	</div>

		// 	<div className='lead-actions'>
		// 		<Edit
		// 			size={20}
		// 			className='action-icon'
		// 			onClick={() => setShowTypeModal(!showTypeModal)}
		// 		/>
		// 		<Clock
		// 			size={20}
		// 			className='action-icon'
		// 			onClick={() => setShowScheduleModal(!showScheduleModal)}
		// 		/>
		// 		<CheckCircle
		// 			size={20}
		// 			className='action-icon'
		// 			onClick={() => setShowStatusModal(!showStatusModal)}
		// 		/>
		// 	</div>

		// 	{/* TYPE Modal */}
		// 	{showTypeModal && (
		// 		<div className='lead-modal'>
		// 			<p className='modal-label'>Type</p>
		// 			{['hot', 'warm', 'cold'].map((t) => (
		// 				<div
		// 					key={t}
		// 					className={`type-option ${t}`}
		// 					onClick={() => {
		// 						setType(t)
		// 						updateLead({ type: t })
		// 						setShowTypeModal(false)
		// 					}}
		// 				>
		// 					{t.charAt(0).toUpperCase() + t.slice(1)}
		// 				</div>
		// 			))}
		// 		</div>
		// 	)}

		// 	{/* SCHEDULE Modal */}
		// 	{showScheduleModal && (
		// 		<div className='lead-modal'>
		// 			<label>Date</label>
		// 			<input
		// 				type='date'
		// 				value={date}
		// 				onChange={(e) => setDate(e.target.value)}
		// 			/>
		// 			<label>Time</label>
		// 			<input
		// 				type='time'
		// 				value={time}
		// 				onChange={(e) => setTime(e.target.value)}
		// 			/>
		// 			<button className='save-btn' onClick={handleScheduleSave}>
		// 				Save
		// 			</button>
		// 		</div>
		// 	)}

		// 	{/* STATUS Modal */}
		// 	{showStatusModal && (
		// 		<div className='lead-modal'>
		// 			<label className='modal-label'>
		// 				Lead Status <Info size={16} />
		// 			</label>
		// 			<select value={status} onChange={(e) => setStatus(e.target.value)}>
		// 				<option value='ongoing'>Ongoing</option>
		// 				<option value='closed'>Closed</option>
		// 			</select>
		// 			<button
		// 				className='save-btn'
		// 				onClick={() => {
		// 					updateLead({ status })
		// 					setShowStatusModal(false)
		// 				}}
		// 			>
		// 				Save
		// 			</button>
		// 		</div>
		// 	)}
		// </li>
		<li className={`lead-card-ui ${status === 'closed' ? 'closed' : ''}`}>
			{/* <div className='lead-left-border' /> */}

			{/* Main Card Content */}
			<div className='lead-main'>
				{/* Lead Info */}
				<div className='lead-info'>
					<h4>{lead.name}</h4>
					<p className='lead-email'>@{lead.email}</p>
					<p className='lead-date-label'>Date</p>
					<p className='lead-date'>
						<Calendar size={16} /> {formattedDate}
					</p>
				</div>

				{/* Status Circle */}
				<div
					className='lead-status'
					style={{
						borderColor:
							type === 'hot'
								? '#f97316' // orange
								: type === 'warm'
								? '#facc15' // yellow
								: type === 'cold'
								? '#06b6d4' // cyan
								: '#e2e8f0',
					}}
				>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</div>
			</div>

			{/* Action Icons */}
			<div className='action-icons'>
				<Edit
					size={20}
					className='action-icon'
					onClick={() => status !== 'closed' && setShowTypeModal(!showTypeModal)}
	disabled={status === 'closed'}
				/>
				<Clock
					size={20}
					className='action-icon'
					onClick={() => status !== 'closed' && setShowScheduleModal(!showScheduleModal)}
	disabled={status === 'closed'}
				/>
				<CheckCircle
					size={20}
					className='action-icon'
					onClick={() => status !== 'closed' && setShowStatusModal(!showStatusModal)}
	disabled={status === 'closed'}
				/>
			</div>

			{/* Modals remain unchanged... */}
			{showTypeModal && (
				<div className='lead-modal'>
					<p className='modal-label'>Type</p>
					{['hot', 'warm', 'cold'].map((t) => (
						<div
							key={t}
							className={`type-option ${t}`}
							onClick={() => {
								setType(t)
								updateLead({ type: t })
								setShowTypeModal(false)
							}}
						>
							{t.charAt(0).toUpperCase() + t.slice(1)}
						</div>
					))}
				</div>
			)}

			{showScheduleModal && (
				<div className='lead-modal'>
					<label>Date</label>
					<input
						type='date'
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<label>Time</label>
					<input
						type='time'
						value={time}
						onChange={(e) => setTime(e.target.value)}
					/>
					<button className='save-btn' onClick={handleScheduleSave}>
						Save
					</button>
				</div>
			)}

			{showStatusModal && (
				<div className='lead-modal'>
					<label className='modal-label'>
						Lead Status <Info size={16} />
					</label>
					<select value={status} onChange={(e) => setStatus(e.target.value)}>
						<option value='ongoing'>Ongoing</option>
						<option value='closed'>Closed</option>
					</select>
					<button
						className='save-btn'
						onClick={() => {
							updateLead({ status })
							setShowStatusModal(false)
						}}
					>
						Save
					</button>
				</div>
			)}
		</li>
	)
}

export default LeadCard
