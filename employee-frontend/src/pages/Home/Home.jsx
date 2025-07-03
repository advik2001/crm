// import React, { useState, useContext, useEffect } from 'react'
// import axios from 'axios'
// import { Home, Users, Calendar, User, Clock } from 'lucide-react'
// import './Home.css'
// import Navbar from '../../components/Navbar'
// import { UserContext } from '../../context/UserContext'

// // Main CRM Component
// const CanovaCRM = () => {
// 	const { user } = useContext(UserContext)
// 	const [activeTab, setActiveTab] = useState('home')
// 	const [activities, setActivities] = useState([])
// 	const [attendanceRecords, setAttendanceRecords] = useState([])

// 	const breakRecords = [
// 		{ start: '01:25 pm', end: '02:15 PM', date: '10/04/25' },
// 		{ start: '01:00 pm', end: '02:05 PM', date: '09/04/25' },
// 		{ start: '01:05 pm', end: '02:30 PM', date: '08/04/25' },
// 		{ start: '01:10 pm', end: '02:00 PM', date: '07/04/25' },
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

// 	useEffect(() => {
// 		const fetchActivities = async () => {
// 			try {
// 				const res = await axios.get(
// 					`http://localhost:5001/api/employee/activity/${user._id}`
// 				)
// 				setActivities(res.data)
// 			} catch (err) {
// 				console.error('Failed to fetch activities:', err)
// 			}
// 		}

// 		const fetchAttendance = async () => {
// 			try {
// 				const res = await axios.get(
// 					`http://localhost:5001/api/attendence/${user._id}`
// 				)
// 				setAttendanceRecords(res.data || [])
// 			} catch (err) {
// 				console.error('Failed to fetch attendance:', err)
// 			}
// 		}

// 		if (user && user._id) {
// 			fetchActivities()
// 			fetchAttendance()
// 		}
// 	}, [user])

// 	// Grouping assigned activities

// 	const groupedActivities = []
// 	let i = 0

// 	while (i < activities.length) {
// 		const current = activities[i]

// 		if (current.type === 'assigned') {
// 			let count = 1
// 			let j = i + 1

// 			while (j < activities.length && activities[j].type === 'assigned') {
// 				count++
// 				j++
// 			}

// 			groupedActivities.push({
// 				_id: current._id,
// 				type: 'assigned',
// 				count,
// 				date: current.date,
// 				time: current.time,
// 			})

// 			i = j
// 		} else {
// 			groupedActivities.push({ ...current })
// 			i++
// 		}
// 	}

// 	return (
// 		<div className='crm-container'>
// 			{/* Header */}
// 			<div className='crm-header'>
// 				<h1 className='crm-logo'>
// 					Canova<span className='logo-accent'>CRM</span>
// 				</h1>
// 				<p className='greeting'>Good Morning</p>
// 				<h2 className='user-name'>{user && user.name}</h2>
// 				{/* <h2 className='user-name'>guest</h2> */}
// 			</div>

// 			{/* Content */}
// 			<div className='crm-content'>
// 				{/* Timings Section */}
// 				<div className='section'>
// 					<h3 className='section-title'>Timings</h3>

// 					{/* Check In/Out Card */}
// 					<div className='timing-card'>
// 						<div className='timing-row'>
// 							<div className='timing-item'>
// 								<span className='timing-label'>Check in</span>
// 								<span className='timing-value'>--:--</span>
// 							</div>
// 							<div className='timing-item'>
// 								{/* <span className='timing-label'>Check Out</span> */}
// 								{/* <span className='timing-value'>--:-- __</span> */}
// 							</div>
// 							<div className='clock-icon'>
// 								<Clock size={20} color='#666' />
// 							</div>
// 						</div>
// 					</div>

// 					{/* Break Card */}
// 					<div className='timing-card'>
// 						<div className='break-header'>
// 							<span className='timing-label'>Break</span>
// 							{/* <span className='timing-value'>--:-- __</span> */}
// 							<div className='clock-icon'>
// 								<Clock size={20} color='#666' />
// 							</div>
// 						</div>

// 						{/* Break Records */}
// 						<div className='break-records'>
// 							<div className='break-record-header'>
// 								<span className='break-header-text'>Check In</span>
// 								<span className='break-header-text'>Check Out</span>
// 								<span className='break-header-text'>Date</span>
// 							</div>
// 							{/* {breakRecords.map((record, index) => (
// 								<div key={index} className='break-record'>
// 									<span className='break-time'>{record.start}</span>
// 									<span className='break-time'>{record.end}</span>
// 									<span className='break-date'>{record.date}</span>
// 								</div>
// 							))} */}
// 							{attendanceRecords.map((record, index) => {
// 								const dateObj = new Date(record.date)
// 								const formattedDate = dateObj.toLocaleDateString('en-GB') // DD/MM/YYYY

// 								return (
// 									<div key={index} className='break-record'>
// 										<span className='break-time'>
// 											{record.checkInTime || '--:--'}
// 										</span>
// 										<span className='break-time'>
// 											{record.checkOutTime || '--:--'}
// 										</span>
// 										<span className='break-date'>{formattedDate}</span>
// 									</div>
// 								)
// 							})}
// 						</div>
// 					</div>
// 				</div>

// 				{/* Recent Activity Section */}
// 				<div className='section'>
// 					<h3 className='section-title'>Recent Activity</h3>
// 					<div className='activity-card'>
// 						{groupedActivities.map((activity) => (
// 							<div key={activity._id} className='activity-item'>
// 								<div className='bullet-point'></div>
// 								<div className='activity-text'>
// 									<p>
// 										{activity.type === 'assigned'
// 											? `You were assigned ${activity.count || 1} lead${
// 													activity.count > 1 ? 's' : ''
// 											  }`
// 											: 'You closed a deal'}
// 									</p>
// 									<span>
// 										- {getTimeAgo(`${activity.date}T${activity.time}`)}
// 									</span>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>

// 			{/* Bottom Navigation Component */}
// 			<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
// 		</div>
// 	)
// }

// export default CanovaCRM







import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Home, Users, Calendar, User, Clock, LogOut } from 'lucide-react' 
import './Home.css'
import Navbar from '../../components/Navbar'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom' //  Required for logout redirect

// Main CRM Component
const CanovaCRM = () => {
	const { user, updateUser } = useContext(UserContext) //  destructure updateUser too
	const navigate = useNavigate() //  initialize navigate
	const [activeTab, setActiveTab] = useState('home')
	const [activities, setActivities] = useState([])
	const [attendanceRecords, setAttendanceRecords] = useState([])

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

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				const res = await axios.get(
					`http://localhost:5001/api/employee/activity/${user._id}`
				)
				setActivities(res.data)
			} catch (err) {
				console.error('Failed to fetch activities:', err)
			}
		}

		const fetchAttendance = async () => {
			try {
				const res = await axios.get(
					`http://localhost:5001/api/attendence/${user._id}`
				)
				setAttendanceRecords(res.data || [])
			} catch (err) {
				console.error('Failed to fetch attendance:', err)
			}
		}

		if (user && user._id) {
			fetchActivities()
			fetchAttendance()
		}
	}, [user])

	// Get the latest check-in and check-out from records
	const todayRecord = attendanceRecords.length > 0 ? attendanceRecords[0] : null
	const latestCheckIn = todayRecord?.checkInTime || '--:--'
	const latestCheckOut = todayRecord?.checkOutTime || '--:--'

	// Logout handler
	const handleLogout = async () => {
		try {
			await axios.post('http://localhost:5001/api/attendence/checkout', {
				userId: user._id,
			})
			updateUser(null)
			navigate('/')
		} catch (err) {
			console.error('Logout/Checkout failed:', err)
			alert('Logout failed. Please try again.')
		}
	}

	// Grouping assigned activities
	const groupedActivities = []
	let i = 0
	while (i < activities.length) {
		const current = activities[i]
		if (current.type === 'assigned') {
			let count = 1
			let j = i + 1
			while (j < activities.length && activities[j].type === 'assigned') {
				count++
				j++
			}
			groupedActivities.push({
				_id: current._id,
				type: 'assigned',
				count,
				date: current.date,
				time: current.time,
			})
			i = j
		} else {
			groupedActivities.push({ ...current })
			i++
		}
	}

	return (
		<div className='crm-container'>
			{/* Header */}
			<div className='crm-header'>
				<h1 className='crm-logo'>
					Canova<span className='logo-accent'>CRM</span>
				</h1>
				<p className='greeting'>Good Morning</p>
				<h2 className='user-name'>{user && user.name}</h2>

				{/* Logout Button */}
				<button className='logout-button' onClick={handleLogout}>
					<LogOut size={17} style={{ marginRight: '6px' }} />
					Logout
				</button>
			</div>

			{/* Content */}
			<div className='crm-content'>
				{/* Timings Section */}
				<div className='section'>
					<h3 className='section-title'>Timings</h3>

					{/* Check In/Out Card */}
					<div className='timing-card'>
						<div className='timing-row'>
							<div className='timing-item'>
								<span className='timing-label'>Check in</span>
								<span className='timing-value'>{latestCheckIn}</span>
							</div>
							<div className='timing-item'>
								<span className='timing-label'>Check out</span>
								<span className='timing-value'>{latestCheckOut}</span>
							</div>
						</div>
					</div>

					{/* Break Card */}
					<div className='timing-card'>
						<div className='break-header'>
							<span className='timing-label'>Break</span>
							<div className='clock-icon'>
								<Clock size={20} color='#666' />
							</div>
						</div>

						{/* Break Records */}
						<div className='break-records'>
							<div className='break-record-header'>
								<span className='break-header-text'>Check In</span>
								<span className='break-header-text'>Check Out</span>
								<span className='break-header-text'>Date</span>
							</div>
							{attendanceRecords.map((record, index) => {
								const dateObj = new Date(record.date)
								const formattedDate = dateObj.toLocaleDateString('en-GB')
								return (
									<div key={index} className='break-record'>
										<span className='break-time'>
											{record.checkInTime || '--:--'}
										</span>
										<span className='break-time'>
											{record.checkOutTime || '--:--'}
										</span>
										<span className='break-date'>{formattedDate}</span>
									</div>
								)
							})}
						</div>
					</div>
				</div>

				{/* Recent Activity Section */}
				<div className='section'>
					<h3 className='section-title'>Recent Activity</h3>
					<div className='activity-card'>
						{groupedActivities.map((activity) => (
							<div key={activity._id} className='activity-item'>
								<div className='bullet-point'></div>
								<div className='activity-text'>
									<p>
										{activity.type === 'assigned'
											? `You were assigned ${activity.count || 1} lead${
													activity.count > 1 ? 's' : ''
											  }`
											: 'You closed a deal'}
									</p>
									<span>
										- {getTimeAgo(`${activity.date}T${activity.time}`)}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Bottom Navigation Component */}
			<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>
	)
}

export default CanovaCRM
