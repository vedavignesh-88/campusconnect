import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '1rem', background: '#2c3e50', color: '#ecf0f1' }}>
    <Link to='/' style={{ marginRight: '1rem', color: '#ecf0f1', textDecoration: 'none' }}>Home</Link>
    <Link to='/submit' style={{ marginRight: '1rem', color: '#ecf0f1', textDecoration: 'none' }}>Submit Complaint</Link>
    <Link to='/view' style={{ marginRight: '1rem', color: '#ecf0f1', textDecoration: 'none' }}>View Complaints</Link>
    <Link to='/admin' style={{ color: '#ecf0f1', textDecoration: 'none' }}>Admin</Link>
  </nav>
);

export default Navbar;
