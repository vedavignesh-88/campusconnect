import React, { useEffect, useState } from 'react';

import { API_URL } from '../apiConfig';

const statusOptions = ['', 'Pending', 'In Progress', 'Resolved'];

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Server ${response.status}`);
      const data = await response.json();
      setComplaints(data);
    } catch (e) {
      setError(e.message || 'Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  // Fetch once on mount
  useEffect(() => {
    fetchComplaints();
  }, []);

  // Apply filters whenever data or filter values change
  useEffect(() => {
    let result = [...complaints];
    if (categoryFilter) {
      result = result.filter(c => c.category === categoryFilter);
    }
    if (statusFilter) {
      result = result.filter(c => c.status === statusFilter);
    }
    setFiltered(result);
  }, [complaints, categoryFilter, statusFilter]);

  // Derive unique categories for the filter dropdown
  const uniqueCategories = Array.from(new Set(complaints.map(c => c.category))).filter(Boolean);

  const formatDate = iso => {
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="view-complaints">
      <h2>All Complaints</h2>

      {/* Filters */}
      <div className="filters" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {uniqueCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {statusOptions.slice(1).map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
        <button onClick={fetchComplaints} disabled={loading}>Refresh</button>
      </div>

      {/* Loading / Error / Empty */}
      {loading && <p>Loading complaints…</p>}

      {error && (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchComplaints}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        filtered.length === 0 ? (
          <p>No complaints match the selected filters.</p>
        ) : (
          <div className="table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="complaints-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Submitted At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td>{c.id}</td>
                    <td>{c.studentName}</td>
                    <td>{c.studentId}</td>
                    <td>{c.category}</td>
                    <td>{c.problemLocation}</td>
                    <td>{c.description}</td>
                    <td>{formatDate(c.submissionDateTime)}</td>
                    <td>
                      <span className={`status-label ${c.status.replace(' ', '-').toLowerCase()}`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default ViewComplaints;
