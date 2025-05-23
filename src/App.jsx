import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './user/components/Navbar';
import Footer from './user/components/Footer';
import Home from './user/pages/Home';
import AdminLogin from './user/components/AdminLogin';
import NavigationBar from './user/components/Navbar';
import AdminDashboard from './user/pages/AdminDashboard';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin" element={<AdminLogin />} /> */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
