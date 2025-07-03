// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { API_PATHS } from '../utils/apiPaths'
// import './Employee.css'

// const Employee = () => {
// 	const [employees, setEmployees] = useState([])
// 	const [loading, setLoading] = useState(true)
// 	const [error, setError] = useState(null)

// 	const [showModal, setShowModal] = useState(false)
// 	const [newEmployee, setNewEmployee] = useState({
// 		firstName: '',
// 		lastName: '',
// 		email: '',
// 	})

// 	useEffect(() => {
// 		const fetchEmployees = async () => {
// 			try {
// 				const response = await axios.get('http://localhost:5001/api/admin/employees')
// 				setEmployees(response.data || [])
// 			} catch (err) {
// 				console.error('Failed to fetch employees:', err)
// 				setError('Failed to load employee data')
// 			} finally {
// 				setLoading(false)
// 			}
// 		}

// 		fetchEmployees()
// 	}, [])

// 	const handleInputChange = (e) => {
// 		const { name, value } = e.target
// 		setNewEmployee((prev) => ({
// 			...prev,
// 			[name]: value,
// 		}))
// 	}

// 	const handleAddEmployee = async () => {
// 		try {
// 			const payload = {
// 				name: `${newEmployee.firstName} ${newEmployee.lastName}`,
// 				email: newEmployee.email,
// 				password: newEmployee.firstName
// 			}

// 			const response = await axios.post(
// 				'http://localhost:5001/api/auth/register',
// 				payload
// 			)

// 			// Refresh employee list
// 			setEmployees((prev) => [...prev, response.data])
// 			setShowModal(false)
// 			setNewEmployee({ firstName: '', lastName: '', email: '' })
// 		} catch (err) {
// 			console.error('Failed to add employee:', err)
// 			alert('Error adding employee')
// 		}
// 	}

// 	if (loading) return <div>Loading employees...</div>
// 	if (error) return <div>{error}</div>

// 	return (
// 		<div>
// 			<h2>Employees</h2>
// 			<p>View or manage employee accounts.</p>

// 			<button
// 				onClick={() => setShowModal(true)}
// 				style={{ marginBottom: '16px' }}
// 			>
// 				Add Employee
// 			</button>

// 			{/* Employee table  */}
// 			<table border='1' cellPadding='8' cellSpacing='0'>
// 				<thead>
// 					<tr>
// 						<th>Name</th>
// 						<th>Email</th>
// 						<th>ID</th>
// 						<th>Assigned Leads</th>
// 						<th>Closed Leads</th>
// 						<th>Status</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{employees.map((emp) => (
// 						<tr key={emp._id}>
// 							<td>{emp.name}</td>
// 							<td>{emp.email}</td>
// 							<td>{emp._id}</td>
// 							<td>{emp.assignedLeadsCount ? emp.assignedLeadsCount : 0}</td>
// 							<td>{emp.closedLeadsCount? emp.closedLeadsCount : 0}</td>
// 							<td>{emp.status}</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>

// 			{/* Add Employee Modal */}
// 			{showModal && (
// 				<div className='modal-overlay'>
// 					<div className='modal'>
// 						<h3>Add New Employee</h3>
// 						<input
// 							type='text'
// 							name='firstName'
// 							placeholder='First Name'
// 							value={newEmployee.firstName}
// 							onChange={handleInputChange}
// 						/>
// 						<input
// 							type='text'
// 							name='lastName'
// 							placeholder='Last Name'
// 							value={newEmployee.lastName}
// 							onChange={handleInputChange}
// 						/>
// 						<input
// 							type='email'
// 							name='email'
// 							placeholder='Email'
// 							value={newEmployee.email}
// 							onChange={handleInputChange}
// 						/>

// 						<div style={{ marginTop: '12px' }}>
// 							<button onClick={handleAddEmployee}>Add</button>
// 							<button
// 								onClick={() => setShowModal(false)}
// 								style={{ marginLeft: '8px' }}
// 							>
// 								Cancel
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default Employee

// Version frontend sorting
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import './Employee.css'
// import { getInitials } from '../utils/helper'

// const Employee = () => {
// 	const [employees, setEmployees] = useState([])
// 	const [loading, setLoading] = useState(true)
// 	const [error, setError] = useState(null)

// 	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
// 	const [showModal, setShowModal] = useState(false)
// 	const [newEmployee, setNewEmployee] = useState({
// 		firstName: '',
// 		lastName: '',
// 		email: '',
// 	})
// 	const [openMenuId, setOpenMenuId] = useState(null)

// 	useEffect(() => {
// 		const fetchEmployees = async () => {
// 			try {
// 				const response = await axios.get(
// 					'http://localhost:5001/api/admin/employees'
// 				)
// 				setEmployees(response.data || [])
// 			} catch (err) {
// 				console.error('Failed to fetch employees:', err)
// 				setError('Failed to load employee data')
// 			} finally {
// 				setLoading(false)
// 			}
// 		}

// 		fetchEmployees()
// 	}, [])

// 	const sortedEmployees = [...employees].sort((a, b) => {
// 		if (!sortConfig.key) return 0

// 		const aValue = a[sortConfig.key]
// 		const bValue = b[sortConfig.key]

// 		if (typeof aValue === 'string' && typeof bValue === 'string') {
// 			return sortConfig.direction === 'asc'
// 				? aValue.localeCompare(bValue)
// 				: bValue.localeCompare(aValue)
// 		}

// 		return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
// 	})

// 	const handleSort = (key) => {
// 		setSortConfig((prev) => {
// 			if (prev.key === key) {
// 				return {
// 					key,
// 					direction: prev.direction === 'asc' ? 'desc' : 'asc',
// 				}
// 			} else {
// 				return { key, direction: 'asc' }
// 			}
// 		})
// 	}

// 	const handleInputChange = (e) => {
// 		const { name, value } = e.target
// 		setNewEmployee((prev) => ({
// 			...prev,
// 			[name]: value,
// 		}))
// 	}

// 	const handleAddEmployee = async () => {
// 		try {
// 			const payload = {
// 				name: `${newEmployee.firstName} ${newEmployee.lastName}`,
// 				email: newEmployee.email,
// 				password: newEmployee.firstName,
// 			}

// 			const response = await axios.post(
// 				'http://localhost:5001/api/auth/register',
// 				payload
// 			)

// 			// Refresh employee list
// 			setEmployees((prev) => [...prev, response.data])
// 			setShowModal(false)
// 			setNewEmployee({ firstName: '', lastName: '', email: '' })
// 		} catch (err) {
// 			console.error('Failed to add employee:', err)
// 			alert('Error adding employee')
// 		}
// 	}

// 	const toggleMenu = (id) => {
// 		setOpenMenuId((prev) => (prev === id ? null : id))
// 	}

// 	if (loading) return <div>Loading employees...</div>
// 	if (error) return <div>{error}</div>

// 	return (
// 		<div>
// 			<div className='dashboard-content'>
// 				{/* Breadcrumb and Button Section */}
// 				<div className='breadcrumb-and-actions'>
// 					<div className='breadcrumb'>
// 						<span className='crumb'>Home</span>
// 						<span className='separator'>›</span>
// 						<span className='crumb current'>Employees</span>
// 					</div>

// 					<button className='add-leads-btn' onClick={() => setShowModal(true)}>
// 						Add Employee
// 					</button>
// 				</div>

// 				{/* Employee Table */}
// 				<div className='employees-table'>
// 					<div className='employee-table'>
// 						<table className='custom-table'>
// 							<thead>
// 								<tr>
// 									<th onClick={() => handleSort('name')}>
// 										Name{' '}
// 										{sortConfig.key === 'name' && (
// 											<span>
// 												{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
// 											</span>
// 										)}
// 									</th>
// 									<th onClick={() => handleSort('name')}>Employee ID</th>
// 									<th onClick={() => handleSort('name')}>Assigned Leads</th>
// 									<th onClick={() => handleSort('name')}>Closed Leads</th>
// 									<th onClick={() => handleSort('name')}>Status</th>
// 									<th></th>
// 								</tr>
// 							</thead>
// 							<tbody>
// 								{sortedEmployees.map((emp) => (
// 									<tr key={emp._id}>
// 										<td className='employee-info'>
// 											{emp.img ? (
// 												<img src={emp.img} alt={emp.name} className='avatar' />
// 											) : (
// 												<div className='avatar fallback'>
// 													{getInitials(emp.name)}
// 												</div>
// 											)}
// 											<div>
// 												<strong>{emp.name}</strong>
// 												<div className='email'>{emp.email}</div>
// 											</div>
// 										</td>
// 										<td>
// 											<span className='badge'>#{emp._id}</span>
// 										</td>
// 										<td>
// 											{emp.assignedLeadsCount ? emp.assignedLeadsCount : 0}
// 										</td>
// 										<td>{emp.closedLeadsCount ? emp.closedLeadsCount : 0}</td>
// 										<td>
// 											<span
// 												className={`status ${
// 													emp.status === 'active' ? 'active' : 'inactive'
// 												}`}
// 											>
// 												● {emp.status}
// 											</span>
// 										</td>
// 										<td>
// 											{/* <button className='options-btn'>⋮</button> */}
// 											<div className='options-wrapper'>
// 												<button
// 													className='options-btn'
// 													onClick={() => toggleMenu(emp._id)}
// 												>
// 													⋮
// 												</button>

// 												{openMenuId === emp._id && (
// 													<div className='dropdown-menu'>
// 														<button onClick={() => handleEdit(emp)}>
// 															✏️ Edit
// 														</button>
// 														<button onClick={() => handleDelete(emp._id)}>
// 															🗑 Delete
// 														</button>
// 													</div>
// 												)}
// 											</div>
// 										</td>
// 									</tr>
// 								))}
// 							</tbody>
// 						</table>
// 					</div>

// 					<div className='pagination'>
// 						<button className='pagination-btn'>← Previous</button>
// 						<div className='pages'>
// 							<button className='page active'>1</button>
// 							<button className='page'>2</button>
// 							<button className='page'>3</button>
// 							<span>...</span>
// 							<button className='page'>10</button>
// 						</div>
// 						<button className='pagination-btn'>Next →</button>
// 					</div>
// 				</div>

// 				{/* Add Employee Modal */}
// 				{showModal && (
// 					<div className='modal-overlay' onClick={() => setShowModal(false)}>
// 						<div className='modal-box' onClick={(e) => e.stopPropagation()}>
// 							<div className='modal-header'>
// 								<h3 className='modal-title'>Add New Employee</h3>
// 								<button
// 									className='modal-close'
// 									onClick={() => setShowModal(false)}
// 								>
// 									x
// 								</button>
// 							</div>

// 							<form className='modal-form' onSubmit={handleAddEmployee}>
// 								<div className='form-group'>
// 									<label>First name</label>
// 									<input
// 										type='text'
// 										name='firstName'
// 										placeholder='First name'
// 										value={newEmployee.firstName}
// 										onChange={handleInputChange}
// 									/>
// 								</div>

// 								<div className='form-group'>
// 									<label>Last name</label>
// 									<input
// 										type='text'
// 										name='lastName'
// 										placeholder='Last name'
// 										value={newEmployee.lastName}
// 										onChange={handleInputChange}
// 									/>
// 								</div>

// 								<div className='form-group'>
// 									<label>Email</label>
// 									<input
// 										type='email'
// 										name='email'
// 										placeholder='Email'
// 										value={newEmployee.email}
// 										onChange={handleInputChange}
// 									/>
// 								</div>

// 								<div className='form-group'>
// 									<label>Location</label>
// 									<select name='location' disabled>
// 										<option value='Delhi'>Delhi</option>
// 									</select>
// 								</div>

// 								<div className='form-group'>
// 									<label>Preferred Language</label>
// 									<select name='language' disabled>
// 										<option value='Hindi'>Hindi</option>
// 									</select>
// 								</div>

// 								<div className='form-footer'>
// 									<button type='submit' className='btn-save'>
// 										Save
// 									</button>
// 								</div>
// 							</form>
// 						</div>
// 					</div>
// 				)}
// 				{showModal && (
// 					<div className='modal-overlay' onClick={() => setShowModal(false)}>
// 						<div className='modal-box' onClick={(e) => e.stopPropagation()}>
// 							<div className='modal-header'>
// 								<h3 className='modal-title'>Edit Employee</h3>
// 								<button
// 									className='modal-close'
// 									onClick={() => setShowModal(false)}
// 								>
// 									x
// 								</button>
// 							</div>

// 							<form className='modal-form' onSubmit={handleAddEmployee}>
// 								<div className='form-group'>
// 									<label>First name</label>
// 									<input
// 										type='text'
// 										name='firstName'
// 										placeholder='First name'
// 										value={newEmployee.firstName}
// 										onChange={handleInputChange}
// 									/>
// 								</div>

// 								<div className='form-group'>
// 									<label>Last name</label>
// 									<input
// 										type='text'
// 										name='lastName'
// 										placeholder='Last name'
// 										value={newEmployee.lastName}
// 										onChange={handleInputChange}
// 									/>
// 								</div>

// 								<div className='form-group'>
// 									<label>Email</label>
// 									<input
// 										type='email'
// 										name='email'
// 										placeholder='Email'
// 										value={newEmployee.email}
// 										onChange={handleInputChange}
// 									/>
// 								</div>

// 								<div className='form-group'>
// 									<label>Location</label>
// 									<select name='location' disabled>
// 										<option value='Delhi'>Delhi</option>
// 									</select>
// 								</div>

// 								<div className='form-group'>
// 									<label>Preferred Language</label>
// 									<select name='language' disabled>
// 										<option value='Hindi'>Hindi</option>
// 									</select>
// 								</div>

// 								<div className='form-footer'>
// 									<button type='submit' className='btn-save'>
// 										Save
// 									</button>
// 								</div>
// 							</form>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	)
// }

// export default Employee

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Employee.css'
import { getInitials } from '../utils/helper'

const Employee = () => {
	const [employees, setEmployees] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
	const [showAddModal, setShowAddModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [selectedEmployee, setSelectedEmployee] = useState(null)
	const [newEmployee, setNewEmployee] = useState({
		firstName: '',
		lastName: '',
		email: '',
		location: 'Delhi',
		language: 'Hindi',
	})
	const [openMenuId, setOpenMenuId] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const employeesPerPage = 8

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5001/api/admin/employees'
				)
				setEmployees(response.data || [])
			} catch (err) {
				console.error('Failed to fetch employees:', err)
				setError('Failed to load employee data')
			} finally {
				setLoading(false)
			}
		}
		fetchEmployees()
	}, [])

	// const sortedEmployees = [...employees].sort((a, b) => {
	// 	if (!sortConfig.key) return 0
	// 	const aValue = a[sortConfig.key]
	// 	const bValue = b[sortConfig.key]
	// 	if (typeof aValue === 'string' && typeof bValue === 'string') {
	// 		return sortConfig.direction === 'asc'
	// 			? aValue.localeCompare(bValue)
	// 			: bValue.localeCompare(aValue)
	// 	}
	// 	return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
	// })

	const handleSort = (key) => {
		setSortConfig((prev) => {
			if (prev.key === key) {
				return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
			} else {
				return { key, direction: 'asc' }
			}
		})
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setNewEmployee((prev) => ({ ...prev, [name]: value }))
	}

	const handleAddEmployee = async (e) => {
		e.preventDefault()
		try {
			const payload = {
				name: `${newEmployee.firstName} ${newEmployee.lastName}`,
				email: newEmployee.email,
				password: newEmployee.firstName,
			}
			const response = await axios.post(
				'http://localhost:5001/api/auth/register',
				payload
			)
			setEmployees((prev) => [...prev, response.data])
			setShowAddModal(false)
			setNewEmployee({
				firstName: '',
				lastName: '',
				email: '',
				location: 'Delhi',
				language: 'Hindi',
			})
		} catch (err) {
			console.error('Failed to add employee:', err)
			alert('Error adding employee')
		}
	}

	const handleEditEmployee = async (e) => {
		e.preventDefault()
		try {
			const payload = {
				name: `${newEmployee.firstName} ${newEmployee.lastName}`,
				email: newEmployee.email,
			}
			const response = await axios.put(
				`http://localhost:5001/api/admin/employees/${selectedEmployee._id}`,
				payload
			)
			setEmployees((prev) =>
				prev.map((emp) =>
					emp._id === selectedEmployee._id ? response.data : emp
				)
			)
			setShowEditModal(false)
			setSelectedEmployee(null)
			setNewEmployee({
				firstName: '',
				lastName: '',
				email: '',
				location: 'Delhi',
				language: 'Hindi',
			})
		} catch (err) {
			console.error('Failed to update employee:', err)
			alert('Error updating employee')
		}
	}

	const toggleMenu = (id) => {
		setOpenMenuId((prev) => (prev === id ? null : id))
	}

	const handleEdit = (emp) => {
		const [firstName, ...rest] = emp.name.split(' ')
		const lastName = rest.join(' ')
		setNewEmployee({
			firstName,
			lastName,
			email: emp.email,
			location: 'Delhi',
			language: 'Hindi',
		})
		setSelectedEmployee(emp)
		setShowEditModal(true)
	}

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:5001/api/admin/employees/${id}`)
			setEmployees((prev) => prev.filter((emp) => emp._id !== id))
		} catch (err) {
			console.error('Failed to delete employee:', err)
			alert('Error deleting employee')
		}
	}

	// Pagination logic
	const indexOfLastEmployee = currentPage * employeesPerPage
	const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage

	const sortedEmployees = [...employees].sort((a, b) => {
		if (!sortConfig.key) return 0
		const aValue = a[sortConfig.key]
		const bValue = b[sortConfig.key]
		if (typeof aValue === 'string' && typeof bValue === 'string') {
			return sortConfig.direction === 'asc'
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue)
		}
		return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
	})

	const currentEmployees = sortedEmployees.slice(
		indexOfFirstEmployee,
		indexOfLastEmployee
	)
	const totalPages = Math.ceil(employees.length / employeesPerPage)

	const goToPage = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	if (loading) return <div>Loading employees...</div>
	if (error) return <div>{error}</div>

	return (
		<div>
			<div className='dashboard-content'>
				<div className='breadcrumb-and-actions'>
					<div className='breadcrumb'>
						<span className='crumb'>Home</span>
						<span className='separator'>›</span>
						<span className='crumb current'>Employees</span>
					</div>
					<button
						className='add-leads-btn'
						onClick={() => setShowAddModal(true)}
					>
						Add Employee
					</button>
				</div>

				<div className='employees-table'>
					<div className='employee-table'>
						<table className='custom-table'>
							<thead>
								<tr>
									<th onClick={() => handleSort('name')}>Name</th>
									<th>Employee ID</th>
									<th>Assigned Leads</th>
									<th>Closed Leads</th>
									<th>Status</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{currentEmployees.map((emp) => (
									<tr key={emp._id}>
										<td className='employee-info'>
											{emp.img ? (
												<img src={emp.img} alt={emp.name} className='avatar' />
											) : (
												<div className='avatar fallback'>
													{getInitials(emp.name)}
												</div>
											)}
											<div>
												<strong>{emp.name}</strong>
												<div className='email'>{emp.email}</div>
											</div>
										</td>
										<td>
											<span className='badge'>#{emp._id}</span>
										</td>
										<td>{emp.assignedLeadsCount || 0}</td>
										<td>{emp.closedLeadsCount || 0}</td>
										<td>
											<span
												className={`status ${
													emp.status === 'active' ? 'active' : 'inactive'
												}`}
											>
												● {emp.status}
											</span>
										</td>
										<td>
											<div className='options-wrapper'>
												<button
													className='options-btn'
													onClick={() => toggleMenu(emp._id)}
												>
													⋮
												</button>
												{openMenuId === emp._id && (
													<div className='dropdown-menu'>
														<button onClick={() => handleEdit(emp)}>
															✏️ Edit
														</button>
														<button onClick={() => handleDelete(emp._id)}>
															🗑 Delete
														</button>
													</div>
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* <div className='pagination'>
					<button className='pagination-btn'>← Previous</button>
					<div className='pages'>
						<button className='page active'>1</button>
						<button className='page'>2</button>
						<button className='page'>3</button>
						<span>...</span>
						<button className='page'>10</button>
					</div>
					<button className='pagination-btn'>Next →</button>
				</div> */}
				<div className='pagination'>
					<button
						className='pagination-btn'
						onClick={() => goToPage(currentPage - 1)}
						disabled={currentPage === 1}
					>
						← Previous
					</button>
					<div className='pages'>
						{[...Array(totalPages)].map((_, index) => (
							<button
								key={index + 1}
								className={`page ${currentPage === index + 1 ? 'active' : ''}`}
								onClick={() => goToPage(index + 1)}
							>
								{index + 1}
							</button>
						))}
					</div>
					<button
						className='pagination-btn'
						onClick={() => goToPage(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						Next →
					</button>
				</div>

				{showAddModal && (
					<div className='modal-overlay' onClick={() => setShowAddModal(false)}>
						<div className='modal-box' onClick={(e) => e.stopPropagation()}>
							<div className='modal-header'>
								<h3 className='modal-title'>Add New Employee</h3>
								<button
									className='modal-close'
									onClick={() => setShowAddModal(false)}
								>
									x
								</button>
							</div>
							<form className='modal-form' onSubmit={handleAddEmployee}>
								<div className='form-group'>
									<label>First name</label>
									<input
										type='text'
										name='firstName'
										value={newEmployee.firstName}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-group'>
									<label>Last name</label>
									<input
										type='text'
										name='lastName'
										value={newEmployee.lastName}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-group'>
									<label>Email</label>
									<input
										type='email'
										name='email'
										value={newEmployee.email}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-group'>
									<label>Location</label>
									<select
										name='location'
										value={newEmployee.location}
										onChange={handleInputChange}
									>
										<option value='Delhi'>Delhi</option>
										<option value='Mumbai'>Mumbai</option>
									</select>
								</div>
								<div className='form-group'>
									<label>Preferred Language</label>
									<select
										name='language'
										value={newEmployee.language}
										onChange={handleInputChange}
									>
										<option value='Hindi'>Hindi</option>
										<option value='English'>English</option>
									</select>
								</div>
								<div className='form-footer'>
									<button type='submit' className='btn-save'>
										Save
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				{showEditModal && (
					<div
						className='modal-overlay'
						onClick={() => setShowEditModal(false)}
					>
						<div className='modal-box' onClick={(e) => e.stopPropagation()}>
							<div className='modal-header'>
								<h3 className='modal-title'>Edit Employee</h3>
								<button
									className='modal-close'
									onClick={() => setShowEditModal(false)}
								>
									x
								</button>
							</div>
							<form className='modal-form' onSubmit={handleEditEmployee}>
								<div className='form-group'>
									<label>First name</label>
									<input
										type='text'
										name='firstName'
										value={newEmployee.firstName}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-group'>
									<label>Last name</label>
									<input
										type='text'
										name='lastName'
										value={newEmployee.lastName}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-group'>
									<label>Email</label>
									<input
										type='email'
										name='email'
										value={newEmployee.email}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-group'>
									<label>Location</label>
									<select name='location' value={newEmployee.location} disabled>
										<option value='Delhi'>Delhi</option>
										<option value='Mumbai'>Mumbai</option>
									</select>
								</div>
								<div className='form-group'>
									<label>Preferred Language</label>
									<select name='language' value={newEmployee.language} disabled>
										<option value='Hindi'>Hindi</option>
										<option value='English'>English</option>
									</select>
								</div>
								<div className='form-footer'>
									<button type='submit' className='btn-save'>
										Update
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Employee
