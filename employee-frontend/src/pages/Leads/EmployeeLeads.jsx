import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { SlidersHorizontal } from 'lucide-react'
import Navbar from '../../components/Navbar'
import './Leads.css'
import LeadCard from '../../components/LeadCard'

const EmployeeLeads = () => {
	const { user } = useContext(UserContext)
	const [activeTab, setActiveTab] = useState('leads')
	const [leads, setLeads] = useState([])
	const [loading, setLoading] = useState(true)

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

	return (
		<div className='crm-container'>
			<div className='crm-header'>
				<h1 className='crm-logo'>
					Canova<span className='logo-accent'>CRM</span>
				</h1>
				<p className='greeting'>Good Morning</p>
				<h2 className='user-name'>{user?.name}</h2>
			</div>

			<div className='leads-section'>
				{/* <h3>Assigned Leads</h3> */}

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
					<p>Loading leads...</p>
				) : leads.length === 0 ? (
					<p>No leads assigned.</p>
				) : (
					<ul className='lead-list'>
						{leads.map((lead) => (
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
