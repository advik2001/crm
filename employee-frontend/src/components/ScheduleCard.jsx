import React from 'react'
// import './ScheduleCard.css'
import { MapPin } from 'lucide-react'

const ScheduleCard = ({ lead }) => {
	return (
		<div className='schedule-card'>
			<div className='schedule-card-header'>
				<span className='label'>Referral</span>
				<span className='date'>
					{lead.schedule_date
						? new Date(lead.schedule_date).toLocaleDateString('en-GB')
						: 'N/A'}
				</span>
			</div>

			<div className='phone'>{lead.phone}</div>

			<div className='call-info'>
				<MapPin size={16} />
				<span>Call</span>
			</div>

			<div className='assigned-user'>
				<img
					src='https://randomuser.me/api/portraits/women/45.jpg'
					alt='User'
					className='avatar'
				/>
				<span>{lead.name}</span>
			</div>
		</div>
	)
}

export default ScheduleCard
