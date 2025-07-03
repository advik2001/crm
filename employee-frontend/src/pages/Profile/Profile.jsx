// import React, { useState, useContext } from 'react'
// import { Home, Users, Calendar, User, Clock } from 'lucide-react'
// import './Profile.css'
// import Navbar from '../../components/Navbar'
// import { UserContext } from '../../context/UserContext'
// import axios from 'axios'

// // Main CRM Component
// const Profile = () => {
// 	const { user, updateUser } = useContext(UserContext)
// 	const [activeTab, setActiveTab] = useState('home')

// 	const [formData, setFormData] = useState({
// 		name: user?.name || '',
// 		email: user?.email || '',
// 		password: '',
// 		confirmPassword: '',
// 	})

// 	const [isLoading, setIsLoading] = useState(false)
// 	const [message, setMessage] = useState('')
// 	const [error, setError] = useState('')

// 	const handleChange = (e) => {
// 		const { name, value } = e.target
// 		setFormData((prev) => ({ ...prev, [name]: value }))
// 	}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()
// 		setIsLoading(true)
// 		setMessage('')
// 		setError('')

// 		try {
// 			const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/employee/update/${user._id}`,
// 				formData
// 			)

// 			if (response.status === 200) {
// 				setMessage('Profile updated successfully')
// 				console.log(response.data.employee)
// 				updateUser(response.data.employee) // update context
// 			}
// 		} catch (err) {
// 			console.error('Update failed:', err)
// 			setError(
// 				err?.response?.data?.message || 'Failed to update profile. Try again.'
// 			)
// 		} finally {
// 			setIsLoading(false)
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
// 				<h2 className='user-name'>{user && user.name }</h2>
// 			</div>

// 			{/* Content */}
// 			<div className='profile-content'>
// 				<h3>Edit Profile</h3>

// 				<form className='profile-form' onSubmit={handleSubmit}>
// 					<label>
// 						Name:
// 						<input
// 							type='text'
// 							name='name'
// 							value={formData.name}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</label>

// 					<label>
// 						Email:
// 						<input
// 							type='email'
// 							name='email'
// 							value={formData.email}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</label>

// 					<label>
// 						New Password:
// 						<input
// 							type='password'
// 							name='password'
// 							value={formData.password}
// 							onChange={handleChange}
// 							placeholder='Leave blank to keep unchanged'
// 						/>
// 					</label>

// 					<label>
// 						Confirm Password:
// 						<input
// 							type='password'
// 							name='confirmPassword'
// 							value={formData.confirmPassword}
// 							onChange={handleChange}
// 							placeholder='Leave blank to keep unchanged'
// 						/>
// 					</label>

// 					<button type='submit' disabled={isLoading}>
// 						{isLoading ? 'Saving...' : 'Update Profile'}
// 					</button>

// 					{message && <p className='success-msg'>{message}</p>}
// 					{error && <p className='error-msg'>{error}</p>}
// 				</form>
// 			</div>

// 			{/* Bottom Navigation Component */}
// 			<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
// 		</div>
// 	)
// }

// export default Profile








// import React, { useState, useContext } from 'react'
// import { Home, Users, Calendar, User, Clock } from 'lucide-react'
// import './Profile.css'
// import Navbar from '../../components/Navbar'
// import { UserContext } from '../../context/UserContext'
// import axios from 'axios'

// // Main CRM Component
// const Profile = () => {
// 	const { user, updateUser } = useContext(UserContext)
// 	const [activeTab, setActiveTab] = useState('home')

// 	const initialFirstName = user?.name?.split(' ')[0] || ''
// 	const initialLastName = user?.name?.split(' ')[1] || ''

// 	const [formData, setFormData] = useState({
// 		firstName: initialFirstName,
// 		lastName: initialLastName,
// 		email: user?.email || '',
// 		password: '',
// 		confirmPassword: '',
// 	})

// 	const [isLoading, setIsLoading] = useState(false)
// 	const [message, setMessage] = useState('')
// 	const [error, setError] = useState('')

// 	const handleChange = (e) => {
// 		const { name, value } = e.target
// 		setFormData((prev) => ({ ...prev, [name]: value }))  // check this part for error
// 	}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()
// 		setIsLoading(true)
// 		setMessage('')
// 		setError('')

// 		const fullName = `${formData.firstName} ${formData.lastName}`.trim()

// 		try {
// 			const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/employee/update/${user._id}`, {
// 				name: fullName,
// 				email: formData.email,
// 				password: formData.password,
// 				confirmPassword: formData.confirmPassword,
// 			})

// 			if (response.status === 200) {
// 				setMessage('Profile updated successfully')
// 				updateUser(response.data.employee)
// 			}
// 		} catch (err) {
// 			console.error('Update failed:', err)
// 			setError(
// 				err?.response?.data?.message || 'Failed to update profile. Try again.'
// 			)
// 		} finally {
// 			setIsLoading(false)
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
// 			</div>

// 			{/* Content */}
// 			<div className='profile-content'>
// 				<h3>Edit Profile</h3>

// 				<form className='profile-form' onSubmit={handleSubmit}>
// 					<label>
// 						First Name:
// 						<input
// 							type='text'
// 							name='firstName'
// 							value={formData.firstName}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</label>

// 					<label>
// 						Last Name:
// 						<input
// 							type='text'
// 							name='lastName'
// 							value={formData.lastName}
// 							onChange={handleChange}
// 						/>
// 					</label>

// 					<label>
// 						Email:
// 						<input
// 							type='email'
// 							name='email'
// 							value={formData.email}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</label>

// 					<label>
// 						New Password:
// 						<input
// 							type='password'
// 							name='password'
// 							value={formData.password}
// 							onChange={handleChange}
// 							placeholder='Leave blank to keep unchanged'
// 						/>
// 					</label>

// 					<label>
// 						Confirm Password:
// 						<input
// 							type='password'
// 							name='confirmPassword'
// 							value={formData.confirmPassword}
// 							onChange={handleChange}
// 							placeholder='Leave blank to keep unchanged'
// 						/>
// 					</label>

// 					<button type='submit' disabled={isLoading}>
// 						{isLoading ? 'Saving...' : 'Update Profile'}
// 					</button>

// 					{message && <p className='success-msg'>{message}</p>}
// 					{error && <p className='error-msg'>{error}</p>}
// 				</form>
// 			</div>

// 			{/* Bottom Navigation Component */}
// 			<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
// 		</div>
// 	)
// }

// export default Profile







import React, { useState, useContext } from 'react'
import { Home, Users, Calendar, User, Clock } from 'lucide-react'
import './Profile.css'
import Navbar from '../../components/Navbar'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'

// Main CRM Component
const Profile = () => {
	const { user, updateUser } = useContext(UserContext)
	const [activeTab, setActiveTab] = useState('home')

	// Safely split name into first and last name
	const initialFirstName = user?.name?.split(' ')[0] || ''
	const initialLastName = user?.name?.split(' ')[1] || ''

	const [formData, setFormData] = useState({
		firstName: initialFirstName,
		lastName: initialLastName,
		email: user?.email || '',
		password: '',
		confirmPassword: '',
	})

	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')

	// Handle input change
	const handleChange = (e) => {
		const { name, value } = e.target
		if (
			!['firstName', 'lastName', 'email', 'password', 'confirmPassword'].includes(
				name
			)
		)
			return
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	// Handle form submit
	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		setMessage('')
		setError('')

		// Password check
		if (formData.password && formData.password !== formData.confirmPassword) {
			setError('Passwords do not match')
			setIsLoading(false)
			return
		}

		const fullName = `${formData.firstName} ${formData.lastName}`.trim().replace(/\s+/g, ' ')

		try {
			const response = await axios.put(
				`${import.meta.env.VITE_API_URL}/api/employee/update/${user._id}`,
				{
					name: fullName,
					email: formData.email,
					password: formData.password,
					confirmPassword: formData.confirmPassword,
				}
			)

			if (response.status === 200) {
				setMessage('Profile updated successfully')
				updateUser(response.data.employee)
			}
		} catch (err) {
			console.error('Update failed:', err)
			setError(
				err?.response?.data?.message || 'Failed to update profile. Try again.'
			)
		} finally {
			setIsLoading(false)
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
				<h2 className='user-name'>{user?.name}</h2>
			</div>

			{/* Content */}
			<div className='profile-content'>
				<h3>Edit Profile</h3>

				<form className='profile-form' onSubmit={handleSubmit}>
					<label>
						First Name:
						<input
							type='text'
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
							required
						/>
					</label>

					<label>
						Last Name:
						<input
							type='text'
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
						/>
					</label>

					<label>
						Email:
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</label>

					<label>
						New Password:
						<input
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							placeholder='Leave blank to keep unchanged'
						/>
					</label>

					<label>
						Confirm Password:
						<input
							type='password'
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
							placeholder='Leave blank to keep unchanged'
						/>
					</label>

					<button type='submit' disabled={isLoading}>
						{isLoading ? 'Saving...' : 'Update Profile'}
					</button>

					{message && <p className='success-msg'>{message}</p>}
					{error && <p className='error-msg'>{error}</p>}
				</form>
			</div>

			{/* Bottom Navigation Component */}
			<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>
	)
}

export default Profile
