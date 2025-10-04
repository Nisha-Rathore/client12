import { useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './views/Home'
import MemberManagement from './views/Management/MemberManagement'
import Trainer from './views/Management/Trainer'
import Finance from './views/Management/Finance'
import WorkoutRoutine from './views/Workout & Diet plans/WorkoutRoutines'
import DietPlan from './views/Workout & Diet plans/DietPlan'
import ProgressTracking from './views/Workout & Diet plans/ProgressTracking'
import AnalyticsReports from './views/Workout & Diet plans/AnalyticsReports'
import ClassesSchedules from './views/Our Services/Classes&Schedules'
import Courses from './views/Our Services/Courses'
import FranchiseMembership from './views/Our Services/FranchiseMembership'
import SignInGym from './views/Authentication/SignIn'
import SignUpGym from './views/Authentication/SignUp'
import ForgotResetPasswordGym from './views/Authentication/ForgotResetPassword'
import Proteins from './views/Products/Protiens'
import SupplementsCatalog from './views/Products/Suppliments'
import AminoAcidSupplements from './views/Products/AminoAcideSuppliments'
import MultivitaminsPage from './views/Products/Multivitamins'
import NotificationsAndCommunication from './views/NotificationCommunication'
import GymBlog from './views/GymBlog'
import SupportTickets from './views/SupportTickets'
import Settings from './views/Settings'
import LogoutScreen from './views/LogOut'
import Security from './views/Management/Security'



function App() {
 

  return (
    <>
      <div>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path ="/members" element = {<MemberManagement/>}></Route>
              <Route path='/trainer' element={<Trainer/>}></Route>
              <Route path="/finance" element={<Finance/>}></Route>
              <Route path='/security' element={<Security/>}></Route>
              <Route path='/workoutRoutines' element={<WorkoutRoutine/>}></Route>
              <Route path='/dietPlan' element={<DietPlan/>}></Route>
              <Route path='/progressTracking' element={<ProgressTracking/>}></Route>
              <Route path='/analyticsReports' element = {<AnalyticsReports/>}></Route>
              <Route path='/classes&schedules' element = {<ClassesSchedules/>}></Route>
              <Route path='/courses' element = {<Courses/>}></Route>
              <Route path='/franchiseMembership' element = {<FranchiseMembership/>}></Route>
              <Route path='/security' element = {<Security/>}></Route>
              <Route path='/signUp' element = {<SignUpGym/>}></Route>
              <Route path='/signIn' element = {<SignInGym/>}></Route>
              <Route path='/forgotResetPassword' element = {<ForgotResetPasswordGym/>}></Route>
               <Route path='/protiens' element = {<Proteins/>}></Route>
               <Route path='/suppliments' element = {<SupplementsCatalog/>}></Route>
               <Route path='/aminoAcideSuppliments' element = {<AminoAcidSupplements/>}></Route>
               <Route path='/multivitamins' element = {<MultivitaminsPage/>}></Route>
               <Route path='/notificationCommunication' element = {<NotificationsAndCommunication/>}></Route>
               <Route path='/gymblog' element = {<GymBlog/>}></Route>
               <Route path='/supportTickets' element = {<SupportTickets/>}></Route>
               <Route path='/settings' element = {<Settings/>}></Route>
               <Route path='/logOut' element = {<LogoutScreen/>}></Route>
            </Routes>
      
        
      </div>
    </>
  )
}

export default App
