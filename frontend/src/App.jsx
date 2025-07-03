import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Employee from './pages/Employee'
import AdminLayout from './pages/AdminLayout'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'
import Settings from './pages/Settings'

import './App.css'

const App = () => { 
	return (
		<Routes>
			{/* Admin Protected Routes */}
			<Route path='/' element={<AdminLayout />}>
				<Route index element={<Dashboard />} />
				<Route path='leads' element={<Leads />} />
				<Route path='employees' element={<Employee />} />
				<Route path='settings' element={<Settings />} />
			</Route>
		</Routes>
	)
}

export default App
