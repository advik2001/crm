// import React from 'react';
// import { Home, Users, Calendar, User } from 'lucide-react';
// import { NavLink } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = ({ activeTab, setActiveTab }) => {
//   const navItems = [
//     { id: 'home', icon: Home, label: 'Home', path: '/employee' },
//     { id: 'leads', icon: Users, label: 'Leads', path: '/employee/leads' },
//     { id: 'schedule', icon: Calendar, label: 'Schedule', path: '/employee/schedule' },
//     { id: 'profile', icon: User, label: 'User', path: '/employee/profile' }
//   ];

//   return (
//     <div className='bottom-nav'>
//       {navItems.map((item) => {
//         const Icon = item.icon;
//         return (
//           <NavLink key={item.id} to={item.path}>
//             <div
//               className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(item.id)}
//             >
//               <Icon size={24} color={activeTab === item.id ? '#4F46E5' : '#666'} />
//               <span className='nav-label'>{item.label}</span>
//             </div>
//           </NavLink>
//         );
//       })}

//       <div
//         className='nav-indicator'
//         style={{
//           left: `${12.5 + navItems.findIndex(item => item.id === activeTab) * 25}%`,
//         }}
//       />
//     </div>
//   );
// };

// export default Navbar;

import React from 'react'
import { Home, Users, Calendar, User } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/employee' },
    { id: 'leads', icon: Users, label: 'Leads', path: '/employee/leads' },
    { id: 'schedule', icon: Calendar, label: 'Schedule', path: '/employee/schedule' },
    { id: 'profile', icon: User, label: 'User', path: '/employee/profile' }
  ]

  const getActiveTabId = () => {
    const match = navItems.find(item => location.pathname === item.path)
    return match ? match.id : null
  }

  const activeTab = getActiveTabId()

  return (
    <div className='bottom-nav'>
      {navItems.map(item => {
        const Icon = item.icon
        return (
          <NavLink key={item.id} to={item.path}>
            <div className={`nav-item ${activeTab === item.id ? 'active' : ''}`}>
              <Icon size={24} color={activeTab === item.id ? '#4F46E5' : '#666'} />
              <span className='nav-label'>{item.label}</span>
            </div>
          </NavLink>
        )
      })}

      <div
        className='nav-indicator'
        style={{
          left: `${12.5 + navItems.findIndex(item => item.id === activeTab) * 25}%`
        }}
      />
    </div>
    
  )
}

export default Navbar
