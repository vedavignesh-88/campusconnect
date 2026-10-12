import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SubmitComplaint from './pages/SubmitComplaint';
import ViewComplaints from './pages/ViewComplaints';
import Admin from './pages/Admin';

const App = () => (
  <Router>
    <Navbar />
    <div style={{ padding: '1rem' }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/submit' element={<SubmitComplaint />} />
        <Route path='/view' element={<ViewComplaints />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  </Router>
);

export default App;
