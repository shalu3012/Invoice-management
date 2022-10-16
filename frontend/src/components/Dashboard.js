import React from 'react'
import Header from './Header'
import MainDashboard from './MainDashboard'
import SideBar from './SideBar'

export default function Dashboard({signUpuser,loginUser,clients}) {
  return (
    <div>
        <Header/>
        <SideBar/>
        <MainDashboard  clients={clients} signUpuser={signUpuser} loginUser={loginUser}/>
    </div>
  )
}
