import React from 'react'
import "./navbar.css"

export default function Navbar() {
  return (
    <div className='MainNavbarContainer'>
      <div className='dashboardContainer'>
        <h1 className='dashtext'>Dashboard</h1>
      </div>
      <div className='searchItemsContainer'>
        <img src="" alt=""/>
        <input type="search" placeholder='Search' className='searchInput' />
      </div>
      <div className='profileItemsContainer'>
      <img src="" alt=""/>
      <div className='profileItems'>
      <img src="" alt=""/>
      <p>Suman</p>
      </div>
      </div>
    </div>
  )
}
