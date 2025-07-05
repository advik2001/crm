import React from 'react'
import { Search } from 'lucide-react'
import './TopBar.css'
import { useSearch } from '../context/SearchContext'

const TopBar = () => {
	const { searchQuery, setSearchQuery } = useSearch()

	return (
		<div className='top-bar'>
			<div className='search-container'>
				<Search className='search-icon' size={16} strokeWidth={1.5} />
				<input
					type='text'
					placeholder='Search here...'
					className='search-input'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
		</div>
	)
}

export default TopBar
