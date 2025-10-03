import { useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './views/Home'
import MemberManagement from './views/Management/MemberManagement'


function App() {
 

  return (
    <>
      <div>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path ="/members" element = {<MemberManagement/>}></Route>
            </Routes>
      
        
      </div>
    </>
  )
}

export default App
