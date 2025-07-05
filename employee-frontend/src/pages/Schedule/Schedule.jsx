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
import { Calendar, Clock, SlidersHorizontal, ChevronLeft } from 'lucide-react'
import './Schedule.css'
import Navbar from '../../components/Navbar'
import { UserContext } from '../../context/UserContext'
import ScheduleCard from '../../components/ScheduleCard'

const Schedule = () => {
	const { user } = useContext(UserContext)
	const [activeTab, setActiveTab] = useState('schedule')
	const [scheduledLeads, setScheduledLeads] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')
	const [filterOption, setFilterOption] = useState('all')
	const [showFilterMenu, setShowFilterMenu] = useState(false)

	useEffect(() => {
		const fetchScheduledLeads = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_API_URL}/api/leads/user/${user._id}`
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

	const today = new Date().toISOString().split('T')[0]

	// Helper function to check if a lead matches the search query
	const matchesSearch = (lead, query) => {
		return Object.values(lead).some((val) =>
			String(val).toLowerCase().includes(query)
		)
	}

	// Helper function to filter based on selected filter option
	const matchesFilter = (lead) => {
		if (filterOption === 'today') {
			return lead.schedule_date === today
		}
		return true // For 'all' option
	}

	const filteredLeads = scheduledLeads
		.filter((lead) => matchesSearch(lead, searchQuery.toLowerCase()))
		.filter(matchesFilter)

	return (
		<div className='crm-container'>
			{/* Header */}
			<div className='crm-header'>
				<h1 className='crm-logo'>
					Canova<span className='logo-accent'>CRM</span>
				</h1>
				<p className='greeting'>Good Morning</p>
				<h2 className='user-name'>
					<ChevronLeft size={20} />
					Schedule
				</h2>
			</div>

			{/* Content */}
			<div className='schedule-content'>
				{/* <h3>Scheduled Leads</h3> */}
				<div className='leads-toolbar'>
					<input
						type='text'
						placeholder='Search'
						className='leads-search-input'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>

					{/* <button className='filter-btn'>
						<SlidersHorizontal size={18} />
					</button> */}

					<div className='filter-wrapper'>
						<button
							className='filter-btn'
							onClick={() => setShowFilterMenu((prev) => !prev)}
						>
							<SlidersHorizontal size={18} />
						</button>
						{showFilterMenu && (
							<div className='filter-dropdown'>
								<p
									onClick={() => {
										setFilterOption('all')
										setShowFilterMenu(false)
									}}
								>
									All
								</p>
								<p
									onClick={() => {
										setFilterOption('today')
										setShowFilterMenu(false)
									}}
								>
									Today
								</p>
							</div>
						)}
					</div>
				</div>
				{loading ? (
					<p>Loading scheduled leads...</p>
				) : scheduledLeads.length === 0 ? (
					<p>No leads scheduled.</p>
				) : (
					<div className='scheduled-leads-list'>
						{filteredLeads.map((lead) => (
							<ScheduleCard key={lead._id} lead={lead} />
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
