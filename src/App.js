import logo from './logo.svg';
import React from 'react';
import './App.css';
// import AdminNavbar from './components/AdminNavbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
// import Auth from './components/auth/Auth';
function App() {
  return (
    <div className="App">
      <Signup/>
      {/* <AdminNavbar/> */}
      {/* <Login/> */}
      {/* <Auth/> */}
    </div>
  );
}

export default App;
