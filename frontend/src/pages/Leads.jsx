import React, { useEffect, useState } from 'react'
import { FolderUp } from 'lucide-react'
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

	const [dragActive, setDragActive] = useState(false)
	const [fileName, setFileName] = useState(null)

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

	const handleDrag = (e) => {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true)
		} else if (e.type === 'dragleave') {
			setDragActive(false)
		}
	}

	const handleDrop = (e) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const file = e.dataTransfer.files[0]
			if (file.name.endsWith('.csv')) {
				setFileName(file.name)
				setCsvFile(file)
			}
		}
	}

	const handleBrowse = (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			if (file.name.endsWith('.csv')) {
				setFileName(file.name)
				setCsvFile(file)
			}
		}
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

				{showUploadModal && (
					
					<div className='modal-overlay' onClick={() => setShowUploadModal(false)}>
						<div className='modal'>
							<div className='modal-header'>
								<div className='modal-title'>
									<h3>CSV Upload</h3>
									<p className='subtext'>Add your documents here</p>
								</div>
								<button className='close-btn' onClick={() => setShowUploadModal(false)}>&times;</button>
							</div>

							<div
								className={`drop-box ${dragActive ? 'active' : ''}`}
								onDragEnter={handleDrag}
								onDragLeave={handleDrag}
								onDragOver={handleDrag}
								onDrop={handleDrop}
							>
								<FolderUp size={40} strokeWidth={1.5} color='#333' />
								<p className='instruction'>
									Drag your file(s) to start uploading
								</p>
								<p className='or-text'>OR</p>

								<label className='browse-btn'>
									Browse files
									<input
										type='file'
										accept='.csv'
										onChange={handleBrowse}
										style={{ display: 'none' }}
									/>
								</label>

								{fileName && (
									<div className='file-preview'>
										<span>{fileName}</span>
									</div>
								)}
							</div>

							<div className='modal-actions'>
								<button className='cancel-btn' onClick={() => setShowUploadModal(false)}>Cancel</button>
								<button className='primary-btn' disabled={uploading} onClick={handleCSVUpload}>{uploading ? "Uploading..." : "Next →"}</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Leads
