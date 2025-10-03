import { useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './views/Home'
import MemberManagement from './views/Management/MemberManagement'
import Trainer from './views/Management/Trainer'
import Finance from './views/Management/Finance'
import Facilities from './views/Management/Facilities'
import WorkoutRoutine from './views/Workout & Diet plans/WorkoutRoutines'
import DietPlan from './views/Workout & Diet plans/DietPlan'



function App() {
 

  return (
    <>
      <div>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path ="/members" element = {<MemberManagement/>}></Route>
              <Route path='/trainer' element={<Trainer/>}></Route>
              <Route path="/finance" element={<Finance/>}></Route>
              <Route path='/facilities' element={<Facilities/>}></Route>
              <Route path='/workoutRoutines' element={<WorkoutRoutine/>}></Route>
              <Route path='/dietPlan' element={<DietPlan/>}></Route>
            </Routes>
      
        
      </div>
    </>
  )
}

export default App
