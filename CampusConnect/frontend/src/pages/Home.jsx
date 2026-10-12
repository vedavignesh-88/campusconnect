import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { API_URL } from '../apiConfig';

const Home = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      setError('Failed to load complaint data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div>
      <h1>CampusConnect</h1>
      <p className="tagline">Your Voice, Our Campus Improvement.</p>
      <Link to="/submit">
        <button className="submit-btn">Submit a Complaint</button>
      </Link>

      {loading && <p>Loading dashboard…</p>}
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={fetchComplaints}>Retry</button>
        </div>
      )}
      {!loading && !error && (
        <>{total === 0 ? (
          <p>No complaints have been submitted yet.</p>
        ) : (
          <div className="card-grid">
            <div className="card">
              <h3>Total Complaints</h3>
              <p>{total}</p>
            </div>
            <div className="card">
              <h3>Pending</h3>
              <p>{pending}</p>
            </div>
            <div className="card">
              <h3>In Progress</h3>
              <p>{inProgress}</p>
            </div>
            <div className="card">
              <h3>Resolved</h3>
              <p>{resolved}</p>
            </div>
          </div>
        )}</>
      )}
    </div>
  );
};

export default Home;

