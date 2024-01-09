import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Question from './components/Question'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';


function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' Component={Signup}></Route>
        <Route path='/home' Component={Question}></Route>
      </Routes>
    </Router>
  )
}

export default App
