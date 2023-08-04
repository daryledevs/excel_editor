import React from 'react'
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <div className='sidebar__container'>
      <ul>
        <li>
          <Link to="/" className='sidebar__link'>
            Home
          </Link>
        </li>
        <li>
          <Link to="/list" className="sidebar__link">
            List
          </Link>
        </li>
        <li>Upload</li>
      </ul>
    </div>
  )
}

export default SideBar;
