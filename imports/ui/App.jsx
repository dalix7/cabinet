import { Home } from '@mui/icons-material'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
export const App = () => (
  <div>
    <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route exact path='/dali' element={<div>dali</div>}></Route>
    </Routes>
  </div>
)
