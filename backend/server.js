require('dotenv').config()
const express = require('express')
const cors = require('cors');
const path = require('path')
const connectDB = require('./config/db')
const CsvBatch = require('./models/CsvBatch')
const Lead = require('./models/Lead');
const Sale = require('./models/Sale');


// new code  
const multer = require('multer')
const fs = require('fs')
const csv = require('csv-parser')

const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const leadsRoutes = require('./routes/leadsRoutes')
const saleRoutes = require('./routes/saleRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')

const app = express()

// Database Connection
connectDB()

// Middleware
app.use(express.json())


app.use(cors({
  origin: ['https://crm-umber-phi.vercel.app', 'https://crm-employee-six.vercel.app']
}));


// Routes
app.use('/api/admin', adminRoutes);       // admin-only routes
app.use("/api/auth", authRoutes); 			   // login/register for employees
app.use('/api/employee', employeeRoutes); // employee-only routes
app.use('/api/leads', leadsRoutes);     // leads management for employees
app.use('/api/sales', saleRoutes)      // sales data for admin dashboard
app.use('/api/attendence', attendanceRoutes)    // sales data for admin dashboard


// new code 
// Upload CSV API
const upload = multer({ dest: 'uploads/' });

// csv upload
// api/upload-csv
app.post('/api/upload-csv', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

  const results = []
  const filePath = req.file.path

  try {
    // Determine batch name like CSV001
    const lastBatch = await CsvBatch.findOne().sort({ uploadDate: -1 })
    let nextNumber = 1
    if (lastBatch) {
      const match = lastBatch.name.match(/CSV(\d+)/)
      if (match) nextNumber = parseInt(match[1]) + 1
    }
    const batchName = `CSV${String(nextNumber).padStart(3, '0')}`

    // Create the batch
    const batch = await CsvBatch.create({ name: batchName })

    // Parse CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        fs.unlinkSync(filePath)

        const leads = results.map((lead) => ({
          name: lead.name,
          email: lead.email,
          phone: Number(lead.phone.replace(/\D/g, '')),
          language: lead.language || '',
          location: lead.location || '',
          recieved_date: lead.recieved_date,
          batchId: batch._id,
        }))

        await Lead.insertMany(leads)
        // await axios.post('http://localhost:5001/api/leads/assign-leads')
        res.status(200).json({ message: 'CSV uploaded successfully' })
      })
  } catch (err) {
    console.error('CSV processing error:', err)
    fs.unlinkSync(filePath)
    res.status(500).json({ error: 'CSV processing failed' })
  }
})
// app.post('/api/upload-csv', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   const results = []

//   fs.createReadStream(req.file.path)
//     .pipe(csv())
//     .on('data', (data) => {
//       // clean/validate data
//       results.push({
//         name: data.name,
//         email: data.email,
//         phone: data.phone,
//         recieved_date: data.recieved_date,
//         language: data.language,
//         location: data.location
//       })
//     })
//     .on('end', async () => {
//       fs.unlinkSync(req.file.path) // delete temp file

//       try {
//         const response = await fetch('http://localhost:5001/api/leads/bulk-upload', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ leads: results })
//         })
//         const data = await response.json()
//         res.status(200).json(data)
//       } catch (error) {
//         res.status(500).json({ message: 'Failed to save leads to database' })
//       }
//     })
// })



// Serve uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {}))

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
