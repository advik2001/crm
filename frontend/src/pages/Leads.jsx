// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import './Leads.css'

// const Leads = () => {
// 	const [csvBatches, setCsvBatches] = useState([])
// 	const [loading, setLoading] = useState(true)
// 	const [showUploadModal, setShowUploadModal] = useState(false)
// 	const [csvFile, setCsvFile] = useState(null)
// 	const [uploading, setUploading] = useState(false)
// 	const [uploadMessage, setUploadMessage] = useState('')

// 	const fetchCsvBatches = async () => {
// 		try {
// 			const res = await axios.get('http://localhost:5001/api/leads/csv-batches')
// 			setCsvBatches(res.data)

// 		} catch (err) {
// 			console.error('Error fetching CSV batches:', err)
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	useEffect(() => {
// 		fetchCsvBatches()
// 	}, [])

// 	const handleCSVUpload = async () => {
// 		if (!csvFile) return
// 		setUploading(true)
// 		setUploadMessage('')

// 		const formData = new FormData()
// 		formData.append('file', csvFile)

// 		try {
// 			await axios.post('http://localhost:5001/api/upload-csv', formData)
// 			await axios.post('http://localhost:5001/api/leads/assign-leads')

// 			setUploadMessage('CSV uploaded successfully')
// 			setCsvFile(null)
// 			setShowUploadModal(false)
// 			fetchCsvBatches()
// 		} catch (err) {
// 			console.error('Upload failed:', err)
// 			setUploadMessage('Upload failed')
// 		} finally {
// 			setUploading(false)
// 		}
// 	}

// 	return (
// 		<div className="leads-container">
// 			<div className="leads-header">
// 				<div>
// 					<h2>Lead Uploads</h2>
// 					<p>View all uploaded CSV files and lead summary.</p>
// 				</div>
// 				<button onClick={() => setShowUploadModal(true)}>Add Leads</button>
// 			</div>

// 			{loading ? (
// 				<p>Loading...</p>
// 			) : csvBatches.length === 0 ? (
// 				<p>No CSV uploads found.</p>
// 			) : (
// 				<div className="leads-table-container">
// 					<table className="leads-table">
// 						<thead>
// 							<tr>
// 								<th>No.</th>
// 								<th>Name</th>
// 								<th>Date</th>
// 								<th>No. of Leads</th>
// 								<th>Assigned Leads</th>
// 								<th>Unassigned Leads</th>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							{csvBatches.map((batch, index) => (

// 								<tr key={batch._id}>
// 									<td>{String(index + 1).padStart(2, '0')}</td>
// 									<td>{batch.name}</td>
// 									<td>{new Date(batch.uploadDate).toLocaleDateString()}</td>
// 									<td>{batch.totalLeads}</td>
// 									<td>{batch.assignedCount}</td>
// 									<td>{batch.totalLeads - batch.assignedCount}</td>
// 								</tr>
// 							))}
// 						</tbody>
// 					</table>
// 				</div>
// 			)}

// 			{showUploadModal && (
// 				<div className="modal-overlay">
// 					<div className="modal">
// 						<h3>Upload Leads CSV</h3>
// 						<input
// 							type="file"
// 							accept=".csv"
// 							onChange={(e) => setCsvFile(e.target.files[0])}
// 						/>
// 						<div className="modal-actions">
// 							<button onClick={() => setShowUploadModal(false)}>Cancel</button>
// 							<button disabled={uploading} onClick={handleCSVUpload}>
// 								{uploading ? 'Uploading...' : 'Upload'}
// 							</button>
// 						</div>
// 						{uploadMessage && <p className="upload-message">{uploadMessage}</p>}
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default Leads

// Frontend Version

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Leads.css'
import { useSearch } from '../context/SearchContext'

const Leads = () => {
	const [csvBatches, setCsvBatches] = useState([])
	const [loading, setLoading] = useState(true)
	const [showUploadModal, setShowUploadModal] = useState(false)
	const [csvFile, setCsvFile] = useState(null)
	const [uploading, setUploading] = useState(false)
	const [uploadMessage, setUploadMessage] = useState('')

	const { searchQuery } = useSearch()

	const fetchCsvBatches = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/leads/csv-batches`
			)
			setCsvBatches(res.data)
		} catch (err) {
			console.error('Error fetching CSV batches:', err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchCsvBatches()
	}, [])

	const filteredBatches = csvBatches.filter((batch) => {
		const query = searchQuery.toLowerCase()
		return (
			batch.name.toLowerCase().includes(query) ||
			batch.totalLeads.toString().includes(query) ||
			batch.assignedCount.toString().includes(query) ||
			(batch.totalLeads - batch.assignedCount).toString().includes(query) ||
			new Date(batch.uploadDate).toLocaleDateString().includes(query)
		)
	})

	const handleCSVUpload = async () => {
		if (!csvFile) return
		setUploading(true)
		setUploadMessage('')

		const formData = new FormData()
		formData.append('file', csvFile)

		try {
			await axios.post(
				`${import.meta.env.VITE_API_URL}/api/upload-csv`,
				formData
			)
			await axios.post(`${import.meta.env.VITE_API_URL}/api/leads/assign-leads`)

			setUploadMessage('CSV uploaded successfully')
			setCsvFile(null)
			setShowUploadModal(false)
			fetchCsvBatches()
		} catch (err) {
			console.error('Upload failed:', err)
			setUploadMessage('Upload failed')
		} finally {
			setUploading(false)
		}
	}

	const handleDrop = (e) => {
		e.preventDefault()
		const file = e.dataTransfer.files[0]
		if (file && file.type === 'text/csv') {
			setCsvFile(file)
		}
	}

	const handleDragOver = (e) => {
		e.preventDefault()
	}

	return (
		<div>
			<div className='dashboard-content'>
				{/* Breadcrumb and Button Section */}
				<div className='breadcrumb-and-actions'>
					<div className='breadcrumb'>
						<span className='crumb'>Home</span>
						<span className='separator'>›</span>
						<span className='crumb current'>Leads</span>
					</div>

					<button
						className='add-leads-btn'
						onClick={() => setShowUploadModal(true)}
					>
						Add Leads
					</button>
				</div>

				{/* Leads Table */}
				{loading ? (
					<p>Loading...</p>
				) : csvBatches.length === 0 ? (
					<p>No CSV uploads found.</p>
				) : (
					<div className='leads-table'>
						<div className='table-header'>
							<div>No.</div>
							<div>Name</div>
							<div>Date</div>
							<div>No. of Leads</div>
							<div>Assigned Leads</div>
							<div>Unassigned Leads</div>
						</div>

						{filteredBatches.map((batch, index) => (
							<div className='table-row' key={batch._id}>
								<div>{String(index + 1).padStart(2, '0')}</div>
								<div>{batch.name}</div>
								<div>{new Date(batch.uploadDate).toLocaleDateString()}</div>
								<div>{batch.totalLeads}</div>
								<div>{batch.assignedCount}</div>
								<div>{batch.totalLeads - batch.assignedCount}</div>
								<div>⋮</div>
							</div>
						))}
					</div>
				)}

				{/* {showUploadModal && (
				<div className="modal-overlay">
					<div className="modal">
						<h3>Upload Leads CSV</h3>
						<input
							type="file"
							accept=".csv"
							onChange={(e) => setCsvFile(e.target.files[0])}
						/>
						<div className="modal-actions">
							<button onClick={() => setShowUploadModal(false)}>Cancel</button>
							<button disabled={uploading} onClick={handleCSVUpload}>
								{uploading ? 'Uploading...' : 'Upload'}
							</button>
						</div>
						{uploadMessage && <p className="upload-message">{uploadMessage}</p>}
					</div>
				</div>
			)} */}

				{showUploadModal && (
					<div
						className='modal-overlay'
						onClick={() => setShowUploadModal(false)}
					>
						<div
							className='modal upload-modal'
							onClick={(e) => e.stopPropagation()}
						>
							<h3>CSV Upload</h3>
							<p>Add your documents here</p>
							<div
								className='drop-area'
								onDrop={handleDrop}
								onDragOver={handleDragOver}
							>
								{uploading ? (
									<div className='progress-circle'>
										<div className='circle-text'>{uploadProgress}%</div>
										<p>Verifying...</p>
									</div>
								) : (
									<>
										<p>Drag your file(s) to start uploading</p>
										<span>OR</span>
										<input
											type='file'
											accept='.csv'
											onChange={(e) => setCsvFile(e.target.files[0])}
											style={{ marginTop: '10px' }}
										/>
									</>
								)}
							</div>
							{csvFile && <p style={{ marginTop: '10px' }}>{csvFile.name}</p>}
							<div className='modal-actions'>
								<button onClick={() => setShowUploadModal(false)}>
									Cancel
								</button>
								<button disabled={uploading} onClick={handleCSVUpload}>
									{uploading ? 'Uploading...' : 'Upload'}
								</button>
							</div>
							{uploadMessage && (
								<p className='upload-message'>{uploadMessage}</p>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Leads
