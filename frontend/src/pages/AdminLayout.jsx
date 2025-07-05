import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
// import './Dashboard.css'
import TopBar from '../components/TopBar'
import { SearchProvider } from '../context/SearchContext'


const AdminLayout = () => {
	return (
		<div className='app-container'>
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content Area */}
			<SearchProvider>
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
			</SearchProvider>
		</div>
	)
}

export default AdminLayout
