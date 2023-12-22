import React from 'react'
import { Route,Routes,useNavigate } from 'react-router-dom'
import Login from './components/login'
import Home from './container/Home'
import { UserProfile } from './components'
export const App = () => {
  return (
    <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='/*' element={<Home/>}/>
    </Routes>
  )
}
