import React from 'react'
import Header from './pages/Header'
import {Routes, Route } from 'react-router-dom'
import Dashboard from './pages/components/Dashboard'
import Notfound from './pages/components/Notfound'
import PostUser from './pages/employee/PostUser'
import UpdateUser from './pages/employee/UpdateUser'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/employee' element={<PostUser />} />
        <Route path='/employee/:id' element={<UpdateUser />} />
        <Route path='/employees' element={<Dashboard />} />
        <Route path='*' element={<Notfound/>} />

      </Routes>

    </>
  )
}

export default App
