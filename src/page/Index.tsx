import React from 'react'
import SideBar from '../shared/component/SideBar';
import { Outlet } from 'react-router-dom';

function PageIndex() {
  return (
    <div className='page-index__container'>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default PageIndex;
