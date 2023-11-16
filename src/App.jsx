import { useState } from 'react'
import './App.css'
import Navbar from './Component/navbar/navbar'
import Signup from './Component/signup/signup'
import Login from './Component/login/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
    <Navbar />
    <Signup/>
    <Login/>
    {/*<BrowserRouter>
       
        <Routes>
          <Route exact path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />

        </Routes>

      </BrowserRouter>*/}
    </>
  )
}


export default App
