import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Activity, Users, User, Target, Search, TrendingUp } from 'lucide-react'
import './Dashboard.css'
import { getInitials } from '../utils/helper'

const Dashboard = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [activities, setActivities] = useState([])
	const [employees, setEmployees] = useState([])
	const [leads, setLeads] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [unassignedCount, setUnassignedCount] = useState(0)
	const [activeEmployeeCount, setActiveEmployeeCount] = useState(0)

	const fetchActivities = async () => {
		try {
			const res = await axios.get('http://localhost:5001/api/admin/activity?limit=10')
			setActivities(res.data)
		} catch (err) {
			console.error('Failed to fetch activities:', err)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [empRes, leadsRes] = await Promise.all([
					axios.get('http://localhost:5001/api/admin/employees'),
					axios.get('http://localhost:5001/api/leads'),
				])

				setEmployees(empRes.data)
				setLeads(leadsRes.data)

				// Calculate unassigned leads
				const unassigned = leadsRes.data.filter(
					(lead) => !lead.assignedTo
				).length
				setUnassignedCount(unassigned)

				// Calculate active employees
				const activeCount = empRes.data.filter(
					(emp) => emp.status?.toLowerCase() === 'active'
				).length
				setActiveEmployeeCount(activeCount)
			} catch (err) {
				console.error('Failed to fetch data:', err)
				setError('Error fetching dashboard data')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
		fetchActivities()
	}, [])

	const salesData = [
		{ day: 'Sat', value: 15 },
		{ day: 'Sun', value: 35 },
		{ day: 'Mon', value: 10 },
		{ day: 'Tue', value: 20 },
		{ day: 'Wed', value: 25 },
		{ day: 'Thu', value: 60 },
		{ day: 'Fri', value: 45 },
	]

	const getTimeAgo = (timestamp) => {
		const now = new Date()
		const activityTime = new Date(timestamp)
		const diffMs = now - activityTime

		const seconds = Math.floor(diffMs / 1000)
		const minutes = Math.floor(seconds / 60)
		const hours = Math.floor(minutes / 60)

		if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
		if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
		return 'Just now'
	}

	return (
		<div>
			{/* Header */}
			<div className='header'>
				<div className='search-box'>
					<Search size={20} />
					<input
						type='text'
						placeholder='Search here...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{/* Breadcrumb */}
			<div className='breadcrumb'>
				<span>Home</span>
				<span className='separator'>›</span>
				<span className='active'>Dashboard</span>
			</div>

			{/* Stats Cards */}
			<div className='stats-grid'>
				<div className='stat-card'>
					<Users size={24} />
					<p>Unassigned Leads</p>
					<h3>{unassignedCount}</h3>
				</div>
				<div className='stat-card'>
					<User size={24} />
					<p>Assigned This Week</p>
					<h3>{leads.length - unassignedCount}</h3>
				</div>
				<div className='stat-card'>
					<Target size={24} />
					<p>Active Salespeople</p>
					<h3>{activeEmployeeCount}</h3>
				</div>
				<div className='stat-card'>
					<TrendingUp size={24} />
					<p>Conversion Rate</p>
					<h3>32%</h3>
				</div>
			</div>

			{/* Dashboard Content */}
			<div className='dashboard-content'>
				{/* Sales Analytics */}
				<div className='analytics-card'>
					<h3>Sale Analytics</h3>
					<div className='chart-wrapper'>
						<div className='y-axis'>
							{[60, 50, 40, 30, 20, 10, 0].map((val) => (
								<span key={val}>{val}%</span>
							))}
						</div>
						<div className='chart'>
							{salesData.map((data, index) => (
								<div key={index} className='bar-container'>
									<div
										className='bar'
										style={{ height: `${data.value}%` }}
									></div>
									<span className='x-label'>{data.day}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Recent Activity */}
				<div className='activity-card'>
					<h3>Recent Activity Feed</h3>
					<div className='activity-list'>
						{activities.length === 0 ? (
							<p>No recent activity.</p>
						) : (
							activities.map((act) => (
								<div className='activity-item' key={act._id}>
									<div className='dot'></div>
									<div>
										<p>
											{act.type === 'assigned'
												? `You assigned a lead to ${
														act.employee?.name || 'Unknown'
												  }`
												: `${act.employee?.name || 'Someone'} closed a deal`}
										</p>
										<span>- {getTimeAgo(`${act.date}T${act.time}`)}</span>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>

			{/* Employee Table */}
			<div className='table-wrapper'>
				<table>
					<thead>
						<tr>
							<th>
								<input type='checkbox' />
							</th>
							<th>Name</th>
							<th>Employee ID</th>
							<th>Assigned Leads</th>
							<th>Closed Leads</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{employees.map((emp, i) => (
							<tr key={i}>
								<td>
									<input type='checkbox' />
								</td>
								<td>
									<div className='employee-info'>
										<div
											className='avatar'
											style={{ backgroundColor: emp.color }}
										>
											{getInitials(emp.name)}
										</div>
										<div>
											<p className='emp-name'>{emp.name}</p>
											<p className='emp-email'>{emp.email}</p>
										</div>
									</div>
								</td>
								<td>{emp._id}</td>
								<td>{emp.assignedLeads?.length || 0}</td>
								<td>{emp.closedLeads?.length || 0}</td>
								<td>
									<span className='status-badge'>
										<span className='status-dot'></span>
										{emp.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Dashboard