// import React, { useContext, useState } from 'react'
// import { Home, Users, Calendar, User, Clock } from 'lucide-react'
// import './Schedule.css'
// import Navbar from '../../components/Navbar'
// import { UserContext } from '../../context/UserContext'

// // Main CRM Component
// const Schedule = () => {
// 	const { user } = useContext(UserContext)
// 	const [activeTab, setActiveTab] = useState('home')

// 	return (
// 		<div className='crm-container'>
// 			{/* Header */}
// 			<div className='crm-header'>
// 				<h1 className='crm-logo'>
// 					Canova<span className='logo-accent'>CRM</span>
// 				</h1>
// 				<p className='greeting'>Good Morning</p>
// 				<h2 className='user-name'>{user && user.name }</h2>
// 			</div>

// 			{/* Content */}

// 			{/* Bottom Navigation Component */}
// 			<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
// 		</div>
// 	)
// }

// export default Schedule

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Calendar, Clock, SlidersHorizontal } from 'lucide-react'
import './Schedule.css'
import Navbar from '../../components/Navbar'
import { UserContext } from '../../context/UserContext'
import ScheduleCard from '../../components/ScheduleCard'

const Schedule = () => {
	const { user } = useContext(UserContext)
	const [activeTab, setActiveTab] = useState('schedule')
	const [scheduledLeads, setScheduledLeads] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchScheduledLeads = async () => {
			try {
				const res = await axios.get(
					`http://localhost:5001/api/leads/user/${user._id}`
				)
				const leadsWithSchedule = res.data.filter(
					(lead) => lead.schedule_date && lead.schedule_time
				)
				setScheduledLeads(leadsWithSchedule)
			} catch (err) {
				console.error('Failed to fetch scheduled leads:', err)
			} finally {
				setLoading(false)
			}
		}

		if (user?._id) fetchScheduledLeads()
	}, [user])

	return (
		<div className='crm-container'>
			{/* Header */}
			<div className='crm-header'>
				<h1 className='crm-logo'>
					Canova<span className='logo-accent'>CRM</span>
				</h1>
				<p className='greeting'>Good Morning</p>
				<h2 className='user-name'>{user?.name}</h2>
			</div>

			{/* Content */}
			<div className='schedule-content'>
				{/* <h3>Scheduled Leads</h3> */}
				<div className='leads-toolbar'>
					<input
						type='text'
						placeholder='Search'
						className='leads-search-input'
					/>

					<button className='filter-btn'>
						<SlidersHorizontal size={18} />
					</button>
				</div>
				{loading ? (
					<p>Loading scheduled leads...</p>
				) : scheduledLeads.length === 0 ? (
					<p>No leads scheduled.</p>
				) : (
					<div className='scheduled-leads-list'>
						{scheduledLeads.map((lead) => (

							<ScheduleCard
								key={lead._id} lead={lead}
							/>
						))}
					</div>
				)}
			</div>

			{/* Bottom Navigation */}
			<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>
	)
}

export default Schedule
