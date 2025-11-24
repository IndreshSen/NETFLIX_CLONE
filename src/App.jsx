import React from 'react'
import './App.css'
import Home from './pages/Home/Home'

import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
           <Route path ='/' element={<Home/>}/>
      </Routes>
      <Home/>
    </div>
  )
}

export default App