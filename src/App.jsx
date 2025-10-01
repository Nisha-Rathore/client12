import { useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './views/Home'

function App() {
 

  return (
    <>
      <div>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route></Route>
            </Routes>
      
        
      </div>
    </>
  )
}

export default App
