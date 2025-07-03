// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Activity, Users, User, Target, Search, TrendingUp } from 'lucide-react'
// import './Dashboard.css'
// import { getInitials } from '../utils/helper'

// const Dashboard = () => {
// 	const [searchTerm, setSearchTerm] = useState('')
// 	const [activities, setActivities] = useState([])
// 	const [employees, setEmployees] = useState([])
// 	const [leads, setLeads] = useState([])
// 	const [loading, setLoading] = useState(true)
// 	const [error, setError] = useState(null)
// 	const [unassignedCount, setUnassignedCount] = useState(0)
// 	const [activeEmployeeCount, setActiveEmployeeCount] = useState(0)

// 	const fetchActivities = async () => {
// 		try {
// 			const res = await axios.get('http://localhost:5001/api/admin/activity?limit=10')
// 			setActivities(res.data)
// 		} catch (err) {
// 			console.error('Failed to fetch activities:', err)
// 		}
// 	}

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const [empRes, leadsRes] = await Promise.all([
// 					axios.get('http://localhost:5001/api/admin/employees'),
// 					axios.get('http://localhost:5001/api/leads'),
// 				])

// 				setEmployees(empRes.data)
// 				setLeads(leadsRes.data)

// 				// Calculate unassigned leads
// 				const unassigned = leadsRes.data.filter(
// 					(lead) => !lead.assignedTo
// 				).length
// 				setUnassignedCount(unassigned)

// 				// Calculate active employees
// 				const activeCount = empRes.data.filter(
// 					(emp) => emp.status?.toLowerCase() === 'active'
// 				).length
// 				setActiveEmployeeCount(activeCount)
// 			} catch (err) {
// 				console.error('Failed to fetch data:', err)
// 				setError('Error fetching dashboard data')
// 			} finally {
// 				setLoading(false)
// 			}
// 		}

// 		fetchData()
// 		fetchActivities()
// 	}, [])

// 	const salesData = [
// 		{ day: 'Sat', value: 15 },
// 		{ day: 'Sun', value: 35 },
// 		{ day: 'Mon', value: 10 },
// 		{ day: 'Tue', value: 20 },
// 		{ day: 'Wed', value: 25 },
// 		{ day: 'Thu', value: 60 },
// 		{ day: 'Fri', value: 45 },
// 	]

// 	const getTimeAgo = (timestamp) => {
// 		const now = new Date()
// 		const activityTime = new Date(timestamp)
// 		const diffMs = now - activityTime

// 		const seconds = Math.floor(diffMs / 1000)
// 		const minutes = Math.floor(seconds / 60)
// 		const hours = Math.floor(minutes / 60)

// 		if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
// 		if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
// 		return 'Just now'
// 	}

// 	return (
// 		<div>
// 			{/* Header */}
// 			<div className='header'>
// 				<div className='search-box'>
// 					<Search size={20} />
// 					<input
// 						type='text'
// 						placeholder='Search here...'
// 						value={searchTerm}
// 						onChange={(e) => setSearchTerm(e.target.value)}
// 					/>
// 				</div>
// 			</div>

// 			{/* Breadcrumb */}
// 			<div className='breadcrumb'>
// 				<span>Home</span>
// 				<span className='separator'>›</span>
// 				<span className='active'>Dashboard</span>
// 			</div>

// 			{/* Stats Cards */}
// 			<div className='stats-grid'>
// 				<div className='stat-card'>
// 					<Users size={24} />
// 					<p>Unassigned Leads</p>
// 					<h3>{unassignedCount}</h3>
// 				</div>
// 				<div className='stat-card'>
// 					<User size={24} />
// 					<p>Assigned This Week</p>
// 					<h3>{leads.length - unassignedCount}</h3>
// 				</div>
// 				<div className='stat-card'>
// 					<Target size={24} />
// 					<p>Active Salespeople</p>
// 					<h3>{activeEmployeeCount}</h3>
// 				</div>
// 				<div className='stat-card'>
// 					<TrendingUp size={24} />
// 					<p>Conversion Rate</p>
// 					<h3>32%</h3>
// 				</div>
// 			</div>

// 			{/* Dashboard Content */}
// 			<div className='dashboard-content'>
// 				{/* Sales Analytics */}
// 				<div className='analytics-card'>
// 					<h3>Sale Analytics</h3>
// 					<div className='chart-wrapper'>
// 						<div className='y-axis'>
// 							{[60, 50, 40, 30, 20, 10, 0].map((val) => (
// 								<span key={val}>{val}%</span>
// 							))}
// 						</div>
// 						<div className='chart'>
// 							{salesData.map((data, index) => (
// 								<div key={index} className='bar-container'>
// 									<div
// 										className='bar'
// 										style={{ height: `${data.value}%` }}
// 									></div>
// 									<span className='x-label'>{data.day}</span>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				</div>

// 				{/* Recent Activity */}
// 				<div className='activity-card'>
// 					<h3>Recent Activity Feed</h3>
// 					<div className='activity-list'>
// 						{activities.length === 0 ? (
// 							<p>No recent activity.</p>
// 						) : (
// 							activities.map((act) => (
// 								<div className='activity-item' key={act._id}>
// 									<div className='dot'></div>
// 									<div>
// 										<p>
// 											{act.type === 'assigned'
// 												? `You assigned a lead to ${
// 														act.employee?.name || 'Unknown'
// 												  }`
// 												: `${act.employee?.name || 'Someone'} closed a deal`}
// 										</p>
// 										<span>- {getTimeAgo(`${act.date}T${act.time}`)}</span>
// 									</div>
// 								</div>
// 							))
// 						)}
// 					</div>
// 				</div>
// 			</div>

// 			{/* Employee Table */}
// 			<div className='table-wrapper'>
// 				<table>
// 					<thead>
// 						<tr>
// 							<th>
// 								<input type='checkbox' />
// 							</th>
// 							<th>Name</th>
// 							<th>Employee ID</th>
// 							<th>Assigned Leads</th>
// 							<th>Closed Leads</th>
// 							<th>Status</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{employees.map((emp, i) => (
// 							<tr key={i}>
// 								<td>
// 									<input type='checkbox' />
// 								</td>
// 								<td>
// 									<div className='employee-info'>
// 										<div
// 											className='avatar'
// 											style={{ backgroundColor: emp.color }}
// 										>
// 											{getInitials(emp.name)}
// 										</div>
// 										<div>
// 											<p className='emp-name'>{emp.name}</p>
// 											<p className='emp-email'>{emp.email}</p>
// 										</div>
// 									</div>
// 								</td>
// 								<td>{emp._id}</td>
// 								<td>{emp.assignedLeads?.length || 0}</td>
// 								<td>{emp.closedLeads?.length || 0}</td>
// 								<td>
// 									<span className='status-badge'>
// 										<span className='status-dot'></span>
// 										{emp.status}
// 									</span>
// 								</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</div>
// 		</div>
// 	)
// }

// export default Dashboard

// Frontend Version
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { User, Wallet, Handshake, GaugeCircle } from 'lucide-react'
import '../App.css'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'
import DashboardEmployees from '../components/DashboardEmployees'

const Dashboard = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [activities, setActivities] = useState([])
	const [employees, setEmployees] = useState([])
	const [salesData, setSalesData] = useState([])
	const [leads, setLeads] = useState([])

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [unassignedCount, setUnassignedCount] = useState(0)
	const [activeEmployeeCount, setActiveEmployeeCount] = useState(0)
	const [conversionRate, setConversionRate] = useState(0)

	const fetchActivities = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/admin/activity?limit=10`
			)
			setActivities(res.data)
		} catch (err) {
			console.error('Failed to fetch activities:', err)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [empRes, leadsRes, salesRes] = await Promise.all([
					axios.get(`${import.meta.env.VITE_API_URL}/api/admin/employees`),
					axios.get(`${import.meta.env.VITE_API_URL}/api/leads`),
					axios.get(`${import.meta.env.VITE_API_URL}/api/sales/data`),
				])

				setEmployees(empRes.data)
				setLeads(leadsRes.data)
				setSalesData(salesRes.data)

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

				// Calculate conversion rate
				const closedLeadsRes = await axios.get(
					`${import.meta.env.VITE_API_URL}/api/sales/closed-leads`
				)
				const closedLeads = closedLeadsRes.data.totalClosedLeads

				const totalLeads = leadsRes.data.length
				console.log('Closed leads', closedLeads)
				console.log('Total leads', totalLeads)

				const conversion =
					totalLeads > 0 ? ((closedLeads / totalLeads) * 100).toFixed(0) : 0
				setConversionRate(conversion)
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
			{/* Dashboard Content */}
			<div className='dashboard-content'>
				{/* Breadcrumb and Button Section */}
				<div className='breadcrumb-and-actions'>
					<div className='breadcrumb'>
						<span className='crumb'>Home</span>
						<span className='separator'>›</span>
						<span className='crumb current'>Dashboard</span>
					</div>

					{/* <button className='add-leads-btn'>Add Leads</button> */}
				</div>

				{/* Cards Row */}
				<div className='cards-row'>
					{/* Each Card */}
					<div className='card'>
						<div className='card-info'>
							<Wallet size={32} className='icon' />
							<div className='card-label'>
								<p>Unassigned Leads</p>
								<h2>{unassignedCount}</h2>
							</div>
						</div>
					</div>

					<div className='card'>
						<div className='card-info'>
							<User size={32} className='icon' />
							<div className='card-label'>
								<p>Assigned This Week</p>
								<h2>{leads.length - unassignedCount}</h2>
							</div>
						</div>
					</div>

					<div className='card'>
						<div className='card-info'>
							<Handshake size={32} className='icon' />
							<div className='card-label'>
								<p>Active Salespeople</p>
								<h2>{activeEmployeeCount}</h2>
							</div>
						</div>
					</div>

					<div className='card'>
						<div className='card-info'>
							<GaugeCircle size={32} className='icon' />
							<div className='card-label'>
								<p>Conversion Rate</p>
								<h2>{conversionRate}%</h2>
							</div>
						</div>
					</div>
				</div>

				{/* Sale Analytics + Activity Feed */}
				<div className='analytics-and-feed'>
					{/* Sales Analytics */}
					<div className='sales-analytics'>
						<h3 className='analytics-title'>Sale Analytics</h3>
						<ResponsiveContainer width='100%' height={240}>
							<BarChart data={salesData}>
								<CartesianGrid strokeDasharray='3 3' vertical={false} />
								<XAxis dataKey='name' axisLine={false} tickLine={false} />
								<YAxis
									tickFormatter={(v) => `${v}`}
									domain={[0, 60]}
									axisLine={false}
									tickLine={false}
								/>
								<Tooltip formatter={(val) => `${val}`} />
								<Bar
									dataKey='value'
									fill='#d1d5db'
									radius={[6, 6, 0, 0]}
									barSize={20}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>

					{/* Recent Activity Feed */}
					<div className='activity-feed'>
						{/* Activity list */}
						<h3 className='feed-title'>Recent Activity Feed</h3>
						<ul className='feed-list'>
							{activities.length === 0 ? (
								<p>No recent activity.</p>
							) : (
								activities.map((act) => (
									<li key={act._id}>
										<p>
											{act.type === 'assigned'
												? `You assigned a lead to ${
														act.employee?.name || 'Unknown'
												  }`
												: `${act.employee?.name || 'Someone'} closed a deal`}
										</p>
										<span>- {getTimeAgo(`${act.date}T${act.time}`)}</span>
									</li>
								))
							)}
						</ul>
					</div>
				</div>

				{/* Employee Table */}
				{/* <div className='table'>
					<div className='employee-table'>
						<table className='custom-table'>
							<thead>
								<tr>
									<th>Name</th>
									<th>Employee ID</th>
									<th className='text-center'>Assigned Leads</th>
									<th className='text-center'>Closed Leads</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{[
									{
										name: 'Tanner Finsha',
										email: 'Tannerfisher@gmail.com',
										img: 'https://randomuser.me/api/portraits/women/44.jpg',
										id: '#23454GH6J7YT6',
										assigned: 5,
										closed: 2,
									},
									{
										name: 'Emeto Winner',
										email: 'Emetowinner@gmail.com',
										initials: 'EW',
										id: '#23454GH6J7YT6',
										assigned: 3,
										closed: 1,
									},
									{
										name: 'Emeto Winner',
										email: 'Emetowinner@gmail.com',
										initials: 'EW',
										id: '#23454GH6J7YT6',
										assigned: 8,
										closed: 3,
									},
									{
										name: 'Tassy Omah',
										email: 'Tassyomah@gmail.com',
										initials: 'TO',
										id: '#23454GH6J7YT6',
										assigned: 6,
										closed: 4,
									},
								].map((emp, i, arr) => (
									<tr key={i} className='table-row-bordered'>
										<td className='employee-info'>
											{emp.img ? (
												<img src={emp.img} alt={emp.name} className='avatar' />
											) : (
												<div className='avatar fallback'>{emp.initials}</div>
											)}
											<div>
												<strong>{emp.name}</strong>
												<div className='email'>{emp.email}</div>
											</div>
										</td>
										<td>
											<span className='badge'>{emp.id}</span>
										</td>
										<td className='text-center'>{emp.assigned}</td>
										<td className='text-center'>{emp.closed}</td>
										<td>
											<span className='status'>● Active</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>  */}
				<DashboardEmployees employees={employees} />
			</div>
		</div>
	)
}

export default Dashboard
