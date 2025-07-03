require('dotenv').config(); // load environment variables
const User = require('./models/User'); // fix the path if needed
const bcrypt = require('bcryptjs');


const connectDB = require('./config/db')

const userRegister = async () => {

	connectDB()

	try {
		const hashPassword = await bcrypt.hash('admin', 10)

		const newUser = new User({
			name: 'Admin',
			email: 'admin@gmail.com',
			password: hashPassword,
			role: 'admin',
		})

		await newUser.save()
	} catch (error) {
		console.log(error)
	}
}

userRegister()
