import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './componenets/Navbar'
import Login from './componenets/Login'
import Register from './componenets/Register'
import Home from './componenets/Home'
import Flights from './componenets/Flights'
import Mybooking from './componenets/Mybooking'
import Admindashbord from './componenets/Admindashbord'
import Bookingform from './componenets/Bookingform'

import Protect from './componenets/Protect'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path ='/Register' element={<Register />} />
        <Route path='/home' element={
          <Protect><Home /></Protect>
        }/>
       
          <Route path='/Flights' element={
          <Protect><Flights /></Protect>
        }/>
        <Route path="/book" element={<Protect><Bookingform /></Protect>} />
          <Route path='/Mybooking' element={
          <Protect><Mybooking /></Protect>
        }/>
          <Route path='/Admindashbord' element={
          <Protect role="admin"><Admindashbord /></Protect>
        }/>

      </Routes>
    </div>
  )
}

export default App