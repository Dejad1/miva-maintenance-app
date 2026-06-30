import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// --- CONFIGURING SYSTEM UI BRANDING ---
const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#1e293b', color: '#fff', alignItems: 'center' },
  card: { padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '15px' },
  container: { padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' },
  btn: { padding: '10px 15px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  input: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }
};

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('miva_user')) || null);

  const handleLogout = () => {
    localStorage.removeItem('miva_token');
    localStorage.removeItem('miva_user');
    setUser(null);
  };

  return (
    <Router>
      {user && (
        <nav style={styles.nav}>
          <h3>MIVA Portal ({user.role})</h3>
          <div>
            <span style={{ marginRight: '15px' }}>Welcome, {user.name}</span>
            <button onClick={handleLogout} style={{ ...styles.btn, background: '#ef4444' }}>Logout</button>
          </div>
        </nav>
      )}
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

// --- LOGIN COMPONENT WITH SYSTEM ROLES ---
function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student/Staff'); 
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // DEVELOPMENT BYPASS: Forces a successful login for any email containing 'miva'
      if (email.includes('miva')) {
        const mockUser = { 
          id: 1001, 
          name: "Adesola Akindeji", 
          email: email, 
          role: role 
        };
        localStorage.setItem('miva_token', 'bypass_token_xyz123');
        localStorage.setItem('miva_user', JSON.stringify(mockUser));
        setUser(mockUser);
        return;
      }

      const res = await axios.post(`${API_BASE}/auth/login`, { email, password, role });
      localStorage.setItem('miva_token', res.data.token);
      localStorage.setItem('miva_user', JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication configuration rejected.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '30px', background: '#f8fafc', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#1e293b', textAlign: 'center', marginBottom: '20px' }}>MIVA University Maintenance Log</h2>
      {error && <p style={{ color: '#ef4444', fontWeight: 'bold' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: '600', color: '#475569' }}>Institutional Email</label>
        <input type="email" style={styles.input} value={email} onChange={e => setEmail(e.target.value)} required placeholder="adesola@miva.university" />
        
        <label style={{ fontWeight: '600', color: '#475569' }}>Password</label>
        <input type="password" style={styles.input} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
        
        <label style={{ fontWeight: '600', color: '#475569' }}>Select System Portal Role</label>
        <select style={styles.input} value={role} onChange={e => setRole(e.target.value)}>
          <option value="Student/Staff">Student / Staff Member</option>
          <option value="Maintenance Officer">Maintenance Field Officer</option>
          <option value="Admin">System Administrator</option>
        </select>

        <button type="submit" style={{ ...styles.btn, width: '100%', marginTop: '10px' }}>Authenticate Profile</button>
      </form>
    </div>
  );
}

// --- CENTRAL DASHBOARD ROUTER ---
function Dashboard({ user }) {
  return (
    <div>
      <h1 style={{ color: '#0f172a', marginBottom: '5px' }}>Management Control Desk</h1>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>Security Clearance Level: <span style={{ background: '#e2e8f0', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', color: '#334155' }}>{user.role}</span></p>
      
      {user.role === 'Student/Staff' && <StudentDashboard />}
      {user.role === 'Maintenance Officer' && <OfficerDashboard />}
      {user.role === 'Admin' && <AdminDashboard />}
    </div>
  );
}

// --- 1. STUDENT/STAFF PORTAL ---
function StudentDashboard() {
  const [requests, setRequests] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Faulty Electricity');
  const [description, setDescription] = useState('');

  const fetchMyRequests = async () => {
    try {
      const token = localStorage.getItem('miva_token');
      const res = await axios.get(`${API_BASE}/requests`, { headers: { Authorization: `Bearer ${token}` } });
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching data logs.', err);
    }
  };

  useEffect(() => { fetchMyRequests(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('miva_token');
      await axios.post(`${API_BASE}/requests`, { title, category, description }, { headers: { Authorization: `Bearer ${token}` } });
      setTitle('');
      setDescription('');
      fetchMyRequests();
      alert("Success: Complaint logged into system audit trail queues.");
    } catch (err) {
      alert("Submission error occurred.");
    }
  };

  return (
    <div>
      <div style={styles.card}>
        <h3 style={{ marginTop: '0', color: '#1e293b' }}>Submit New Service Request [cite: 9]</h3>
        <form onSubmit={handleCreate}>
          <input type="text" placeholder="Brief issue title (e.g., Water Leakage)" style={styles.input} value={title} onChange={e => setTitle(e.target.value)} required />
          <select style={styles.input} value={category} onChange={e => setCategory(e.target.value)}>
            <option>Faulty Electricity</option>
            <option>Damaged Furniture</option>
            <option>Leaking Pipes</option>
            <option>Internet Problems</option>
            <option>Classroom Equipment</option>
            <option>Hostel Maintenance</option>
          </select>
          <textarea placeholder="Describe the fault and room location details precisely..." style={{ ...styles.input, height: '80px' }} value={description} onChange={e => setDescription(e.target.value)} required />
          <button type="submit" style={styles.btn}>File Complaint</button>
        </form>
      </div>

      <h3 style={{ color: '#1e293b', marginTop: '30px' }}>Your Open Tracking Tickets [cite: 10]</h3>
      {requests.length === 0 ? <p style={{ color: '#64748b' }}>No tickets logged yet.</p> : requests.map(r => (
        <div key={r.id} style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '17px', color: '#334155' }}>{r.title}</strong>
              <div style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Category: {r.category}</div>
            </div>
            <span style={{ padding: '6px 12px', background: '#dbeafe', color: '#2563eb', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px' }}>{r.status || 'Pending'}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- 2. MAINTENANCE OFFICER PORTAL ---
function OfficerDashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('miva_token');
      const res = await axios.get(`${API_BASE}/requests`, { headers: { Authorization: `Bearer ${token}` } });
      setTasks(res.data.filter(t => t.assigned_to_id !== null)); 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('miva_token');
      await axios.put(`${API_BASE}/requests/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      fetchTasks();
    } catch (err) {
      alert("Error processing status update.");
    }
  };

  return (
    <div>
      <h3 style={{ color: '#1e293b' }}>Your Action Assignments Queue [cite: 4]</h3>
      {tasks.length === 0 ? <p style={{ color: '#64748b' }}>No current assignments in queue.</p> : tasks.map(t => (
        <div key={t.id} style={styles.card}>
          <h4 style={{ margin: '0 0 5px 0', color: '#334155' }}>{t.title}</h4>
          <p style={{ color: '#64748b', margin: '0 0 15px 0' }}>Description: {t.description}</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => updateStatus(t.id, 'In Progress')} style={{ ...styles.btn, background: '#f59e0b' }}>Set In Progress</button>
            <button onClick={() => updateStatus(t.id, 'Completed')} style={{ ...styles.btn, background: '#10b981' }}>Mark Completed</button>
          </div>
          <p style={{ marginTop: '15px', marginBottom: '0' }}>Current State: <strong>{t.status}</strong></p>
        </div>
      ))}
    </div>
  );
}

// --- 3. ADMINISTRATOR PORTAL ---
function AdminDashboard() {
  const [allRequests, setAllRequests] = useState([]);

  const fetchAllRequests = async () => {
    try {
      const token = localStorage.getItem('miva_token');
      const res = await axios.get(`${API_BASE}/requests`, { headers: { Authorization: `Bearer ${token}` } });
      setAllRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchAllRequests(); }, []);

  const assignTask = async (id) => {
    const officerId = prompt("Enter Maintenance Officer User ID:");
    if (!officerId) return;
    try {
      const token = localStorage.getItem('miva_token');
      await axios.post(`${API_BASE}/admin/assign`, { requestId: id, officerId }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Task successfully assigned.");
      fetchAllRequests();
    } catch (err) {
      alert("Assignment failed.");
    }
  };

  return (
    <div>
      <h3 style={{ color: '#1e293b' }}>Global System Requests Overview [cite: 5, 10]</h3>
      <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '15px' }}>ID</th>
              <th style={{ padding: '15px' }}>Issue/Complaint</th>
              <th style={{ padding: '15px' }}>Workflow Status</th>
              <th style={{ padding: '15px' }}>Action Control</th>
            </tr>
          </thead>
          <tbody>
            {allRequests.map(req => (
              <tr key={req.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '15px', color: '#475569' }}>{req.id}</td>
                <td style={{ padding: '15px', fontWeight: '500', color: '#1e293b' }}>{req.title}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ fontWeight: 'bold', color: '#2563eb' }}>{req.status || 'Pending'}</span>
                </td>
                <td style={{ padding: '15px' }}>
                  <button style={{ ...styles.btn, padding: '6px 12px', fontSize: '13px' }} onClick={() => assignTask(req.id)}>Assign Task</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}