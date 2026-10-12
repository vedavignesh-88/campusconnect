import React, { useState } from 'react';

import { API_URL } from '../apiConfig';

const categories = [
  'Electricity',
  'Water',
  'Washrooms',
  'Classrooms',
  'Wi-Fi',
  'Library',
  'Furniture',
  'Other',
];

const SubmitComplaint = () => {
  const [form, setForm] = useState({
    studentName: '',
    studentId: '',
    department: '',
    category: '',
    problemLocation: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // contains success message and id
  const [apiError, setApiError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // clear field error on change
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, val]) => {
      if (!val.trim()) newErrors[key] = 'This field is required';
    });
    if (!form.category) newErrors.category = 'Select a category';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setResult(null);
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          status: 'Pending', // backend will set default, but we include for safety
        }),
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Server ${response.status}: ${errText}`);
      }
      const data = await response.json();
      setResult({ id: data.id, message: 'Complaint submitted successfully' });
      // clear form after success
      setForm({
        studentName: '',
        studentId: '',
        department: '',
        category: '',
        problemLocation: '',
        description: '',
      });
    } catch (err) {
      setApiError(err.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Submit a Complaint</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <input
          name="studentName"
          placeholder="Student Name"
          value={form.studentName}
          onChange={handleChange}
          required
        />
        {errors.studentName && <p className="error">{errors.studentName}</p>}

        <input
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
          required
        />
        {errors.studentId && <p className="error">{errors.studentId}</p>}

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />
        {errors.department && <p className="error">{errors.department}</p>}

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="error">{errors.category}</p>}

        <input
          name="problemLocation"
          placeholder="Problem Location"
          value={form.problemLocation}
          onChange={handleChange}
          required
        />
        {errors.problemLocation && <p className="error">{errors.problemLocation}</p>}

        <textarea
          name="description"
          placeholder="Complaint Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting…' : 'Submit'}
        </button>
      </form>

      {apiError && <p className="error">{apiError}</p>}
      {result && (
        <p className="success">
          {result.message}. <strong>Complaint ID:</strong> {result.id}
        </p>
      )}
    </div>
  );
};

export default SubmitComplaint;

