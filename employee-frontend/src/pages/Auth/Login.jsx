import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react'
import './Login.css'

import { UserContext } from '../../context/UserContext'

const Login = () => {
	const navigate = useNavigate()
	// const { login } = useAuth()
	const { updateUser } = useContext(UserContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState({})

	// Handle Login Form Submit
	// const handleLogin = async (e) => {
	// 	e.preventDefault()
	// 	setIsLoading(true)

	// 	// Login API call
	// 	try {
	// 		const response = await axios.post(
	// 			'http://localhost:5001/api/auth/login',
	// 			{
	// 				email,
	// 				password,
	// 			}
	// 		)

	// 		if (response.status === 200) {
	// 			console.log(response.data)
	// 			updateUser(response.data) // save user globally
	// 			navigate('/employee')
	// 		}
	// 	} catch (error) {
	// 		if (
	// 			error.response &&
	// 			error.response.data &&
	// 			error.response.data.message
	// 		) {
	// 			alert(error.response.data.message)
	// 		} else {
	// 			alert('Login failed. Please try again.')
	// 		}
	// 	} finally {
	// 		setIsLoading(false)
	// 	}
	// }
	const handleLogin = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			// Step 1: Login API
			const response = await axios.post(
				'http://localhost:5001/api/auth/login',
				{ email, password }
			)

			if (response.status === 200) {
				console.log(response.data)
				updateUser(response.data) // Save user in context
				const userId = response.data._id // Adjust this if user ID is nested (e.g., response.data.user._id)

				// Step 2: Attendance Check-In API
				await axios.post('http://localhost:5001/api/attendence/checkin', {
					userId: userId,
				})

				// Step 3: Navigate to dashboard
				navigate('/employee')
			}
		} catch (error) {
			if (error.response?.data?.message) {
				alert(error.response.data.message)
			} else {
				alert('Login failed. Please try again.')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='login-container'>
			<div className='login-card'>
				{/* Header */}
				<div className='login-header'>
					<div className='logo-container'>
						<h1 className='login-logo'>
							Canova<span className='logo-accent'>CRM</span>
						</h1>
					</div>
					<h2 className='login-title'>Welcome Back</h2>
					<p className='login-subtitle'>Sign in to your account to continue</p>
				</div>

				{/* Login Form */}
				<form className='login-form' onSubmit={handleLogin}>
					{/* Email Field */}
					<div className='form-group'>
						<label className='form-label'>Email Address</label>
						<div className='input-container'>
							<Mail className='input-icon' size={20} />
							<input
								type='email'
								name='email'
								value={email}
								autoFocus
								onChange={(e) => setEmail(e.target.value)}
								className={`form-input ${errors.email ? 'error' : ''}`}
								placeholder='Enter your email'
								disabled={isLoading}
							/>
						</div>
						{errors.email && (
							<span className='error-message'>{errors.email}</span>
						)}
					</div>

					{/* Password Field */}
					<div className='form-group'>
						<label className='form-label'>Password</label>
						<div className='input-container'>
							<Lock className='input-icon' size={20} />
							<input
								type={showPassword ? 'text' : 'password'}
								name='password'
								value={password}
								// onChange={handleInputChange}
								onChange={(e) => setPassword(e.target.value)}
								className={`form-input ${errors.password ? 'error' : ''}`}
								placeholder='Enter your password'
								disabled={isLoading}
							/>
							<button
								type='button'
								className='password-toggle'
								onClick={() => setShowPassword(!showPassword)}
								disabled={isLoading}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						{errors.password && (
							<span className='error-message'>{errors.password}</span>
						)}
					</div>

					{/* Login Button */}
					<button
						type='submit'
						className={`login-button ${isLoading ? 'loading' : ''}`}
						disabled={isLoading}
					>
						{isLoading ? (
							<div className='loading-spinner'></div>
						) : (
							<>
								<span>Sign In</span>
								<ArrowRight size={20} />
							</>
						)}
					</button>
				</form>
			</div>

			{/* Background Elements */}
			<div className='background-elements'>
				<div className='bg-circle bg-circle-1'></div>
				<div className='bg-circle bg-circle-2'></div>
				<div className='bg-circle bg-circle-3'></div>
			</div>
		</div>
	)
}

export default Login
