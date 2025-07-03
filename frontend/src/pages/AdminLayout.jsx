import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
// import './Dashboard.css'
import TopBar from '../components/TopBar'

const AdminLayout = () => {
	return (

		// <div className='container'>
		// 	{/* Sidebar */}
		// 	<Sidebar />

		// 	{/* Main Content */}
		// 	<div className='main-content'>
		// 		<Outlet />
		// 	</div>
		// </div>


		// Version 2
		<div className='app-container'>
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content Area */}
			<div className='main-content-container'>
				{/* Top Search Bar */}
				<TopBar />

				<main className='main-content'>
					{/* Dashboard Content */}
					<Outlet />
					{/* <Dashboard /> */}
          {/* <Leads /> */}
          {/* <Employees /> */}
          {/* <Settings /> */}
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
