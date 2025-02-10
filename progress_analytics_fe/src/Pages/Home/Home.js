import React from 'react'
import Sidebar from '../../Component/Sidebar'
import ProgressDB from '../../Component/ProgressDB/ProgressDB'
import "./home.css"

export default function Home() {
  return (
    <div className='MainHomeContainer'>
        <Sidebar/>
        <ProgressDB/>
    </div>
  )
}
