import React from 'react'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'

function LayOut({children}) {
  return (
    <div>
      <Header />
      {children}
      {/* <Outlet /> */}
    </div>
  )
}

export default LayOut
