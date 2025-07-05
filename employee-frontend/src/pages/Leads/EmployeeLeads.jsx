import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { SlidersHorizontal, ChevronLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import './Leads.css'
import LeadCard from '../../components/LeadCard'

const EmployeeLeads = () => {
	const { user } = useContext(UserContext)
	const [activeTab, setActiveTab] = useState('leads')
	const [leads, setLeads] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')
	const [filterStatus, setFilterStatus] = useState('all')
	const [showFilterDropdown, setShowFilterDropdown] = useState(false)

	const fetchUserLeads = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/leads/user/${user._id}`
			)
			setLeads(response.data)
		} catch (error) {
			console.error('Failed to fetch leads:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (user?._id) fetchUserLeads()
	}, [user])

	const filteredLeads = leads.filter((lead) => {
		const query = searchQuery.toLowerCase()

		// Match search
		const matchesSearch = Object.values(lead).some((value) =>
			String(value).toLowerCase().includes(query)
		)

		// Match status filter
		const matchesStatus =
			filterStatus === 'all'
				? true
				: lead.status?.toLowerCase() === filterStatus

		return matchesSearch && matchesStatus
	})

	return (
		<div className='crm-container'>
			<div className='crm-header'>
				<h1 className='crm-logo'>
					Canova<span className='logo-accent'>CRM</span>
				</h1>
				<p className='greeting'>Good Morning</p>
				{/* <h2 className='user-name'>{user?.name}</h2> */}
				<h2 className='user-name'>
					<ChevronLeft size={20} />
					Leads
				</h2>
			</div>

			<div className='leads-section'>
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
					<div className='filter-dropdown-wrapper'>
						<button
							className='filter-btn'
							onClick={() => setShowFilterDropdown((prev) => !prev)}
						>
							<SlidersHorizontal size={18} />
						</button>

						{showFilterDropdown && (
							<div className='filter-dropdown'>
								<button onClick={() => setFilterStatus('all')}>All</button>
								<button onClick={() => setFilterStatus('ongoing')}>
									Ongoing
								</button>
								<button onClick={() => setFilterStatus('closed')}>
									Closed
								</button>
							</div>
						)}
					</div>
				</div>

				{loading ? (
					<p>Loading leads...</p>
				) : leads.length === 0 ? (
					<p>No leads assigned.</p>
				) : (
					<ul className='lead-list'>
						{filteredLeads.map((lead) => (
							<LeadCard key={lead._id} lead={lead} onUpdate={fetchUserLeads} />
						))}
					</ul>
				)}
			</div>

			<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>
	)
}

export default EmployeeLeads
