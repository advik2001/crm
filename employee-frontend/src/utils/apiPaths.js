export const BASE_URL = `${import.meta.env.VITE_API_URL}`

export const API_PATHS = {
	AUTH: {
		REGISTER: '/api/auth/register', // Signup
		LOGIN: '/api/auth/login', // Authenticate user & return JWT token
		// GET_PROFILE: '/api/auth/profile', // Get logged-in user details
	},

	// IMAGE: {
	// 	UPLOAD_IMAGE: '/api/auth/upload-image', // Upload profile picture
	// },

}
