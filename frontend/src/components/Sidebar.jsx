// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Activity, Users, User, Target } from 'lucide-react';

// const Sidebar = () => {
//   return (
//     <div className='sidebar'>
//       <div className='logo'>
//         <h2>
//           Canova<span className='highlight'>CRM</span>
//         </h2>
//       </div>
//       <nav>
//         <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
//           <Activity size={20} />
//           <span>Dashboard</span>
//         </NavLink>
//         <NavLink to="/leads" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
//           <Users size={20} />
//           <span>Leads</span>
//         </NavLink>
//         <NavLink to="/employees" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
//           <User size={20} />
//           <span>Employees</span>
//         </NavLink>
//         <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
//           <Target size={20} />
//           <span>Settings</span>
//         </NavLink>
//       </nav>
//       <div className='sidebar-footer'>
//         <div className='profile'>Profile</div>
//         <button className='logout-btn'>Logout</button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react'
import { NavLink } from 'react-router-dom'
import { Activity, Users, User, Target } from 'lucide-react'

const Sidebar = () => {
	return (
		<aside className='sidebar'>
			<div className='sidebar-content'>
				{/* Logo */}
				<h2 className='logo'>
					Canova<span className='highlight'>CRM</span>
				</h2>

				{/* Navigation */}
				<nav className='nav-links'>
					
					<NavLink
            className="nav-link"
						to='/'
						end
					>
						{/* <Activity size={20} /> */}
						Dashboard
					</NavLink>

					<NavLink
            className="nav-link"
						to='/leads'
						end
						// className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
					>
						{/* <Activity size={20} /> */}
						Leads
					</NavLink>

					<NavLink
            className="nav-link"
						to='/employees'
						end
						// className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
					>
						{/* <Activity size={20} /> */}
						Employees
					</NavLink>

					<NavLink
            className="nav-link"
						to='/settings'
						end
						// className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
					>
						{/* <Activity size={20} /> */}
						Settings
					</NavLink>
          {/* <a className='nav-link active'>Dashboard</a>
					<a className='nav-link'>Leads</a>
					<a className='nav-link'>Employees</a>
					<a className='nav-link'>Settings</a> */}
				</nav>
			</div>
		</aside>
	)
}

export default Sidebar
