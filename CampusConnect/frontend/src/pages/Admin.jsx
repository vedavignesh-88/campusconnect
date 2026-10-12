import React, { useEffect, useState } from 'react';
import { API_URL } from '../apiConfig';

const statusOptions = ['Pending', 'In Progress', 'Resolved'];

const Admin = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setComplaints(data);
    } catch (e) {
      setError(e.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: newStatus
      });
      if (!response.ok) throw new Error('Failed to update status');
      await fetchComplaints();
    } catch (e) {
      alert(e.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete complaint');
      await fetchComplaints();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="admin-page" style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
      <h2>Admin Panel - Manage Complaints</h2>
      <button onClick={fetchComplaints} style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>Refresh List</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && complaints.length === 0 && <p>No complaints submitted yet.</p>}

      {!loading && complaints.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#34495e', color: 'white' }}>
                <th style={{ padding: '8px' }}>Title</th>
                <th style={{ padding: '8px' }}>Category</th>
                <th style={{ padding: '8px' }}>Student</th>
                <th style={{ padding: '8px' }}>Current Status</th>
                <th style={{ padding: '8px' }}>Change Status</th>
                <th style={{ padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>{c.title}</td>
                  <td style={{ padding: '8px' }}>{c.category}</td>
                  <td style={{ padding: '8px' }}>{c.studentName || 'Anonymous'}</td>
                  <td style={{ padding: '8px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: c.status === 'Resolved' ? '#2ecc71' : c.status === 'In Progress' ? '#f39c12' : '#e74c3c',
                      color: 'white',
                      fontSize: '0.85rem'
                    }}>
                      {c.status || 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '8px' }}>
                    <select
                      value={c.status || 'Pending'}
                      disabled={updatingId === c.id}
                      onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    >
                      {statusOptions.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '8px' }}>
                    <button
                      onClick={() => handleDelete(c.id)}
                      style={{ background: '#c0392b', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer', borderRadius: '3px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
