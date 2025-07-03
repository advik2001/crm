// import { createContext, useContext, useState, useEffect } from 'react'

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {

// 	const [user, setUser] = useState(() => {
// 		try {
// 			const storedUser = localStorage.getItem('user')
// 			return storedUser && storedUser !== 'undefined'
// 				? JSON.parse(storedUser)
// 				: null
// 		} catch (error) {
// 			console.error('Failed to parse stored user:', error)
// 			return null
// 		}
// 	})

// 	const login = (userData) => {
// 		setUser(userData)
// 		localStorage.setItem('user', JSON.stringify(userData))
// 	}

// 	const logout = () => {
// 		setUser(null)
// 		localStorage.removeItem('user')
// 	}

// 	return (
// 		<AuthContext.Provider
// 			value={{ user, login, logout, isAuthenticated: !!user }}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	)
// }

// export const useAuth = () => useContext(AuthContext)

import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { API_PATHS } from '../utils/apiPaths'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true) // state to track loading

	useEffect(() => {
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser))
			} catch (err) {
				console.error('Error parsing stored user:', err)
				clearUser()
			}
		}
		setLoading(false)
	}, [])

	const updateUser = (userData) => {
		setUser(userData)
		localStorage.setItem('user', JSON.stringify(userData))
		setLoading(false)
	}

	const clearUser = () => {
  setUser(null);
  localStorage.removeItem('user');
};


	return (
		<UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
