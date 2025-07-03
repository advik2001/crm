export const BASE_URL = 'http://localhost:5001'

export const API_PATHS = {
	
	AUTH: {
		REGISTER: '/api/auth/register', // Signup
		LOGIN: '/api/auth/login', // Authenticate user & return JWT token
		// GET_PROFILE: '/api/auth/profile', // Get logged-in user details
	},

	// IMAGE: {
	// 	UPLOAD_IMAGE: '/api/auth/upload-image', // Upload profile picture
	// },

	ADMIN: {
		GET_EMPLOYEES: '/api/admin/employees', // Get all employees data
		UPDATE_PROFILE: '/api/admin/update-profile' // Update the user details
	},

	// EMPLOYEE: {
	// 	ADD_TO_SESSION: '/api/questions/add', // Add more questions to a session
	// 	PIN: (id) => `/api/questions/${id}/pin`, // Pin or unpin a question
	// 	UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // Update/Add a note to a question
	// },
}
