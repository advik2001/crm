import React from 'react'
import './DashboardEmployees.css'
import { getInitials } from '../utils/helper'

const DashboardEmployees = ({ employees }) => {
	return (
		<div className='table'>
			{/* Table element */}
			<div className='employe-table'>
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
						{employees.map((emp, i) => (
							<tr key={i} className='table-row-bordered'>
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
								<td className='text-center'>
									{emp.assignedLeadsCount || 0}
								</td>
								<td className='text-center'>
									{emp.closedLeadsCount || 0}
								</td>
								<td>
									<span
										className={`status ${
											emp.status === 'active' ? 'active' : 'inactive'
										}`}
									>
										● {emp.status}
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

export default DashboardEmployees
