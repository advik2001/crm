// import React, { useContext, useState } from 'react'
// // import axiosInstance from '../utils/axiosInstance'
// import axios from 'axios'
// import { API_PATHS } from '../utils/apiPaths'

// const Settings = () => {
// 	// const { user, updateUser } = useContext(UserContext)
// 	const { user, updateUser } = useState('Advik')

// 	const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '')
// 	const [lastName, setLastName] = useState(user?.name?.split(' ')[1] || '')
// 	const [email, setEmail] = useState(user?.email || '')
// 	const [loading, setLoading] = useState(false)
// 	const [error, setError] = useState(null)
// 	const [success, setSuccess] = useState(null)

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()

// 		setLoading(true)
// 		setError(null)
// 		setSuccess(null)

// 		try {
// 			const payload = {
// 				name: `${firstName} ${lastName}`,
// 				email,
// 			}

// 			const response = await axios.put(
// 				'http://localhost:5001/api/admin/update-profile',
// 				payload
// 			)

// 			setSuccess('Profile updated successfully.')
// 		} catch (err) {
// 			console.error(err)
// 			setError(
// 				err?.response?.data?.message ||
// 					'Something went wrong. Please try again.'
// 			)
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	return (
// 		<div>
// 			<h2>Edit Profile</h2>
// 			<form onSubmit={handleSubmit}>
// 				<div>
// 					<label>First Name</label>
// 					<input
// 						type='text'
// 						value={firstName}
// 						onChange={(e) => setFirstName(e.target.value)}
// 						disabled={loading}
// 					/>
// 				</div>

// 				<div>
// 					<label>Last Name</label>
// 					<input
// 						type='text'
// 						value={lastName}
// 						onChange={(e) => setLastName(e.target.value)}
// 						disabled={loading}
// 					/>
// 				</div>

// 				<div>
// 					<label>Email</label>
// 					<input
// 						type='email'
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 						disabled={loading}
// 					/>
// 				</div>

// 				{error && <p style={{ color: 'red' }}>{error}</p>}
// 				{success && <p style={{ color: 'green' }}>{success}</p>}

// 				<button type='submit' disabled={loading}>
// 					{loading ? 'Saving...' : 'Save Changes'}
// 				</button>
// 			</form>
// 		</div>
// 	)
// }

// export default Settings

// Version Frontend
import React, { useContext, useState } from 'react'
import axios from 'axios'
import './Settings.css'

const Settings = () => {
	// const { user, updateUser } = useContext(UserContext)
	const { user, updateUser } = useState('Advik')

	const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '')
	const [lastName, setLastName] = useState(user?.name?.split(' ')[1] || '')
	const [email, setEmail] = useState(user?.email || '')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()

		setLoading(true)
		setError(null)
		setSuccess(null)

		try {
			const payload = {
				name: `${firstName} ${lastName}`,
				email,
			}

			const response = await axios.put(
				`${import.meta.env.VITE_API_URL}/api/admin/update-profile`,
				payload
			)

			setSuccess('Profile updated successfully.')
		} catch (err) {
			console.error(err)
			setError(
				err?.response?.data?.message ||
					'Something went wrong. Please try again.'
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		// <div>
		// 	<div className='dashboard-content'>
		// 		{/* Breadcrumb and Button Section */}
		// 		<div className='breadcrumb-and-actions'>
		// 			<div className='breadcrumb'>
		// 				<span className='crumb'>Home</span>
		// 				<span className='separator'>›</span>
		// 				<span className='crumb current'>Settings</span>
		// 			</div>
		// 		</div>

		// 		{/* Settings Form */}
		// 		<div className='settings-form'>
		// 			<h3 className='form-title'>Edit Profile</h3>

		// 			<form className='form-body'>
		// 				<div className='form-group'>
		// 					<label>First name</label>
		// 					<input type='text' placeholder='First name' value='Sarthak' />
		// 				</div>

		// 				<div className='form-group'>
		// 					<label>Last name</label>
		// 					<input type='text' placeholder='Last name' value='Pal' />
		// 				</div>

		// 				<div className='form-group'>
		// 					<label>Email</label>
		// 					<input
		// 						type='email'
		// 						placeholder='Email'
		// 						value='Sarthakpal08@gmail.com'
		// 					/>
		// 				</div>

		// 				<div className='form-group'>
		// 					<label>Password</label>
		// 					<input type='password' value='***********' />
		// 				</div>

		// 				<div className='form-group'>
		// 					<label>Confirm Password</label>
		// 					<input type='password' value='***********' />
		// 				</div>

		// 				<div className='form-footer'>
		// 					<button type='submit' className='save-btn'>
		// 						Save
		// 					</button>
		// 				</div>
		// 			</form>
		// 		</div>
		// 	</div>
		// </div>

		<div className='dashboard-content'>
			{/* Breadcrumb and Button Section */}
			<div className='breadcrumb-and-actions'>
				<div className='breadcrumb'>
					<span className='crumb'>Home</span>
					<span className='separator'>›</span>
					<span className='crumb current'>Settings</span>
				</div>
			</div>

			{/* Settings Form */}
			<div className='settings-form'>
				<h3 className='form-title'>Edit Profile</h3>

				<form className='form-body' onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='firstName'>First name</label>
						<input
							id='firstName'
							type='text'
							placeholder='First name'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							disabled={loading}
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='lastName'>Last name</label>
						<input
							id='lastName'
							type='text'
							placeholder='Last name'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							disabled={loading}
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							id='email'
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading}
						/>
					</div>

					{error && <p style={{ color: 'red' }}>{error}</p>}
					{success && <p style={{ color: 'green' }}>{success}</p>}

					<div className='form-footer'>
						<button type='submit' className='save-btn'>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Settings
