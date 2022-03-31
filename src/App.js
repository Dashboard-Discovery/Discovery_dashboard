import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Login from './components/login/login';
import Dashboard from './dashboard';
import Home from './home';

import { getToken, removeUserSession, setUserSession } from './utils/Common';
import useToken from './utils/useToken';

import './App.scss';



function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact="true" className="active" to="/">Home</NavLink>
            <NavLink className="active" to="/dashboard">Dashboard</NavLink>
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

