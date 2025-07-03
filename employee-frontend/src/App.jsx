import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// import UserProvider from './context/userContext'
// import { UserContext } from './context/userContext'
import Login from './pages/Auth/Login'

// import ProtectedRoute from './components/ProtectedRoute'

import EmployeeLayout from './pages/EmployeeLayout'
import Home from './pages/Home/Home'
import EmployeeLeads from './pages/Leads/EmployeeLeads'
import Schedule from './pages/Schedule/Schedule'
import Profile from './pages/Profile/Profile'
import ProtectedRoute from './pages/Auth/ProtectedRoute'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Public Route */}
				<Route path='/' element={<Login />} />

				{/* Employee  Routes */}
				<Route path='/employee'
					element={
						<ProtectedRoute>
							<EmployeeLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Home />} />
					<Route path='leads' element={<EmployeeLeads />} />
					<Route path='schedule' element={<Schedule />} />
					<Route path='profile' element={<Profile />} />
				</Route>

			</Routes>
		</BrowserRouter>
	)
}

export default App
