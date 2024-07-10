import React from 'react'
import FindNumber from './components/FindNumber/FindNumber'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Login/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/game" element={<FindNumber />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App;
