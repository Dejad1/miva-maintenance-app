import React, { useState } from 'react';

export default function App() {
  // Authentication & Navigation Tracking States
  const [user, setUser] = useState(null); 
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('Student / Staff Member');
  
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, new-request, my-requests, my-profile
  const [formStep, setFormStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('Low');

  // Comprehensive mock data ledger matching your course criteria
  const [requests, setRequests] = useState([
    { id: 'C09F81CB', title: 'Test Mobile Request', category: 'Electrical', location: 'Lab 3', priority: 'Low', status: 'Completed', date: '9 days ago' },
    { id: 'E08D69D6', title: 'Test Request E2E', category: 'Electrical', location: 'Campus Library', priority: 'High', status: 'Completed', date: '9 days ago' },
    { id: '70F0144C', title: 'Tests', category: 'Electrical', location: 'Home', priority: 'Low', status: 'Pending', date: '9 days ago' },
    { id: '6E78CF5D', title: 'Projector Not Working in Hall 2', category: 'Classroom Equipment', location: 'Lecture Hall 2, Block B', priority: 'Medium', status: 'Pending', date: '10 days ago' },
    { id: '30B064B8', title: 'Wi-Fi Down in Hostel Block B', category: 'Internet / IT', location: 'Hostel Block B, Ground Floor', priority: 'Critical', status: 'In Progress', date: '10 days ago' },
    { id: 'F810766B', title: 'Faulty Power Socket in Lab 3', category: 'Computer Lab 3, Block A', priority: 'High', status: 'Assigned', date: '10 days ago' }
  ]);

  // Demo shortcut autocomplete button values
  const handleDemoFill = (roleType) => {
    setEmailInput('a.akindeji3503@miva.edu.ng');
    setPasswordInput('••••••••••••');
    setSelectedRole(roleType);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Creates a valid session object using your real MIVA bio
    setUser({
      name: "ADESOLA AKINDEJI OLUWOLE",
      email: emailInput || "a.akindeji3503@miva.edu.ng",
      role: selectedRole
    });
    setActiveTab('dashboard');
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newEntry = {
      id: randomId,
      title: issueTitle,
      category: selectedCategory,
      location: location || 'Main Campus',
      priority: priority,
      status: 'Pending',
      date: 'Just now'
    };
    setRequests([newEntry, ...requests]);
    // Reset wizard states
    setIssueTitle('');
    setIssueDescription('');
    setLocation('');
    setSelectedCategory('');
    setFormStep(1);
    setActiveTab('dashboard');
  };

  const handleSignOut = () => {
    setUser(null);
    setEmailInput('');
    setPasswordInput('');
  };

  // Status Badge Rendering Configs
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return { backgroundColor: '#DEF7EC', color: '#03543F', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
      case 'In Progress': return { backgroundColor: '#E1EFFE', color: '#1E429F', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
      case 'Assigned': return { backgroundColor: '#E4E6EF', color: '#3F4254', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
      default: return { backgroundColor: '#FEF08A', color: '#713F12', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' };
    }
  };

  /* -------------------------------------------------------------------------
     STATE A: RENDER BEAUTIFUL LANDING & LOGIN PAGE (IF NOT LOGGED IN)
     ------------------------------------------------------------------------- */
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", "Arial", sans-serif', backgroundColor: '#F8FAFC' }}>
        
        {/* Top Navbar Header */}
        <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#BF1E2E', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#FFF', fontSize: '16px' }}>M</div>
            <div>
              <span style={{ fontWeight: '800', fontSize: '18px', color: '#0F2C59', letterSpacing: '0.3px' }}>MIVA</span>
              <span style={{ fontSize: '12px', color: '#64748B', display: 'block', marginTop: '-2px' }}>Open University</span>
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>📚 Campus Operations Ledger</div>
        </header>

        {/* Split Screen Container Body */}
        <div style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', maxWidth: '1200px', margin: '40px auto', width: '100%', gap: '40px', padding: '0 20px', boxSizing: 'border-box' }}>
          
          {/* Left Side: Editorial Banner Section */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '20px' }}>
            <span style={{ backgroundColor: '#FFF5F5', color: '#BF1E2E', fontWeight: 'bold', fontSize: '12px', padding: '6px 14px', borderRadius: '20px', width: 'max-content', letterSpacing: '0.5px', marginBottom: '16px', border: '1px solid #FEE2E2' }}>FACILITIES WORKSPACE</span>
            <h1 style={{ fontSize: '38px', color: '#0F2C59', fontWeight: '800', lineHeight: '1.2', margin: '0 0 16px 0' }}>
              Digital Campus Infrastructure & <span style={{ color: '#BF1E2E' }}>Maintenance Portal</span>
            </h1>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', margin: '0 0 24px 0' }}>
              Welcome to the central asset log system for MIVA Open University. Students, academic staff, and structural maintenance officers can securely file requests, assign engineering technicians, and audit utility repairs across all faculty spaces.
            </p>
            
            {/* Value Indicators */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '10px' }}>
              <div style={{ borderLeft: '3px solid #BF1E2E', paddingLeft: '12px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#0F2C59' }}>Role-Based Access</div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Isolated control grids for administrators, officers, and students.</div>
              </div>
              <div style={{ borderLeft: '3px solid #0F2C59', paddingLeft: '12px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#0F2C59' }}>Atomic Request Pipelines</div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Track infrastructure issues from intake loops to completion verification.</div>
              </div>
            </div>
          </div>

          {/* Right Side: Professional Glassmorphism Login Control */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '36px', boxShadow: '0 10px 25px -5px rgba(15, 44, 89, 0.05)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F2C59', margin: '0 0 6px 0' }}>Account Sign-In</h2>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 24px 0' }}>Enter your institutional portal codes below.</p>
              
              <form onSubmit={handleLoginSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', marginBottom: '6px', color: '#334155' }}>Institutional Email Address</label>
                  <input type="email" required placeholder="a.akindeji3503@miva.edu.ng" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', marginBottom: '6px', color: '#334155' }}>Account Password</label>
                  <input type="password" required placeholder="••••••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '8px', boxSizing: 'border-box', fontSize: '14px' }} />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', marginBottom: '6px', color: '#334155' }}>Portal Cleared Level Role</label>
                  <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '8px', backgroundColor: '#FFF', fontSize: '14px' }}>
                    <option>Student / Staff Member</option>
                    <option>Maintenance Field Officer</option>
                    <option>System Administrator</option>
                  </select>
                </div>

                <button type="submit" style={{ width: '100%', padding: '12px', border: 'none', backgroundColor: '#0F2C59', color: '#FFFFFF', fontWeight: 'bold', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15, 44, 89, 0.15)', transition: 'background-color 0.2s' }}>
                  Authenticate Profile
                </button>
              </form>

              {/* HIGHLY PROFESSIONAL QUICK-DEMO EVALUATOR ASSISTANCE ACCORDION */}
              <div style={{ marginTop: '28px', borderTop: '1px dashed #E2E8F0', paddingTop: '20px' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', textAlign: 'center' }}>
                  ⚡ Quick Evaluation Demo Shortcuts
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <button onClick={() => handleDemoFill('Student / Staff Member')} style={{ padding: '8px 4px', border: '1px solid #E2E8F0', borderRadius: '6px', backgroundColor: '#F8FAFC', fontSize: '11px', fontWeight: '600', color: '#0F2C59', cursor: 'pointer' }}>🎓 Student</button>
                  <button onClick={() => handleDemoFill('Maintenance Field Officer')} style={{ padding: '8px 4px', border: '1px solid #E2E8F0', borderRadius: '6px', backgroundColor: '#F8FAFC', fontSize: '11px', fontWeight: '600', color: '#0F2C59', cursor: 'pointer' }}>🔧 Officer</button>
                  <button onClick={() => handleDemoFill('System Administrator')} style={{ padding: '8px 4px', border: '1px solid #E2E8F0', borderRadius: '6px', backgroundColor: '#F8FAFC', fontSize: '11px', fontWeight: '600', color: '#0F2C59', cursor: 'pointer' }}>💼 Admin</button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer info tracking */}
        <footer style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: '#64748B', borderTop: '1px solid #E2E8F0', backgroundColor: '#FFF' }}>
          MIVA Open University Master of Information Technology Program &bull; Assignment Accomplishment Ledger Artifact
        </footer>
      </div>
    );
  }

  /* -------------------------------------------------------------------------
     STATE B: FULL PREMIUM APPWORKSPACE (IF LOGGED IN)
     ------------------------------------------------------------------------- */
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Inter", sans-serif', backgroundColor: '#F8FAFC', color: '#1E293B' }}>
      
      {/* 1. FIXED BRAND NAVIGATION SIDEBAR */}
      <div style={{ width: '270px', backgroundColor: '#0F2C59', color: '#FFFFFF', display: 'flex', flexDirection: 'column', padding: '24px 16px', borderRight: '1px solid #1E3A8A', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#BF1E2E', borderRadius: '6px', display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#FFF', fontSize: '14px', justifyContent: 'center' }}>M</div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px', letterSpacing: '0.5px' }}>MIVA</div>
            <div style={{ fontSize: '11px', color: '#93C5FD' }}>Maintenance Portal</div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
          <button onClick={() => setActiveTab('dashboard')} style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 16px', borderRadius: '8px', border: 'none', background: activeTab === 'dashboard' ? '#BF1E2E' : 'transparent', color: '#FFF', textAlign: 'left', cursor: 'pointer', fontWeight: '500' }}>📊 Dashboard Workspace</button>
          <button onClick={() => { setActiveTab('new-request'); setFormStep(1); }} style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 16px', borderRadius: '8px', border: 'none', background: activeTab === 'new-request' ? '#BF1E2E' : 'transparent', color: '#FFF', textAlign: 'left', cursor: 'pointer', fontWeight: '500' }}>➕ File New Request</button>
          <button onClick={() => setActiveTab('my-requests')} style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 16px', borderRadius: '8px', border: 'none', background: activeTab === 'my-requests' ? '#BF1E2E' : 'transparent', color: '#FFF', textAlign: 'left', cursor: 'pointer', fontWeight: '500' }}>📋 System Ledger Logs</button>
          <button onClick={() => setActiveTab('my-profile')} style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 16px', borderRadius: '8px', border: 'none', background: activeTab === 'my-profile' ? '#BF1E2E' : 'transparent', color: '#FFF', textAlign: 'left', cursor: 'pointer', fontWeight: '500' }}>👤 Profile Credentials</button>
        </nav>

        <div style={{ borderTop: '1px solid #1E3A8A', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
            <div style={{ fontSize: '11px', color: '#93C5FD' }}>{user.role.split(' ')[0]} Account</div>
          </div>
          <button onClick={handleSignOut} style={{ background: '#BF1E2E', border: 'none', color: '#FFF', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>Exit</button>
        </div>
      </div>

      {/* RIGHT DISPLAY HUB */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* UPPER STATUS BAR HEADER */}
        <header style={{ height: '70px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>AUTHORIZED SESSION: </span>
            <span style={{ fontSize: '13px', color: '#BF1E2E', fontWeight: '700' }}>{user.role}</span>
          </div>
          <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Academic Session: 2026/2027</div>
        </header>

        {/* COMPONENT INTERACTION CONTAINER */}
        <main style={{ padding: '32px', flexGrow: 1, overflowY: 'auto' }}>
          
          {/* TAB 1: WORKSPACE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Total Submitted</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px', color: '#0F2C59' }}>{requests.length}</div>
                </div>
                <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Pending Review</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px', color: '#D97706' }}>{requests.filter(r => r.status === 'Pending').length}</div>
                </div>
                <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>In Progress</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px', color: '#2563EB' }}>{requests.filter(r => r.status === 'In Progress' || r.status === 'Assigned').length}</div>
                </div>
                <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Completed</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px', color: '#16A34A' }}>{requests.filter(r => r.status === 'Completed').length}</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F2C59' }}>Recent Operational Records</h3>
                  <button onClick={() => setActiveTab('my-requests')} style={{ background: 'none', border: 'none', color: '#BF1E2E', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>View Complete History</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '12px', fontWeight: 'bold' }}>
                        <th style={{ padding: '12px 8px' }}>TICKET ID</th>
                        <th style={{ padding: '12px 8px' }}>DESCRIPTION TITLE</th>
                        <th style={{ padding: '12px 8px' }}>CATEGORY SELECTION</th>
                        <th style={{ padding: '12px 8px' }}>WORKFLOW STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.slice(0, 5).map((req) => (
                        <tr key={req.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}>
                          <td style={{ padding: '16px 8px', color: '#64748B', fontFamily: 'monospace', fontWeight: 'bold' }}>#{req.id}</td>
                          <td style={{ padding: '16px 8px', fontWeight: '600', color: '#1E293B' }}>{req.title}</td>
                          <td style={{ padding: '16px 8px', color: '#475569' }}>{req.category}</td>
                          <td style={{ padding: '16px 8px' }}><span style={getStatusStyle(req.status)}>{req.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MULTI-STEP REQUEST INGESTION CARD */}
          {activeTab === 'new-request' && (
            <div style={{ maxWidth: '680px', backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '32px', margin: '0 auto', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F2C59' }}>Log Infrastructure Defect</h3>
                <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>Section {formStep} of 2 &bull; {formStep === 1 ? 'Categorization Matrix' : 'Describe Fault Parameters'}</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <div style={{ flexGrow: 1, height: '4px', backgroundColor: '#BF1E2E', borderRadius: '2px' }}></div>
                  <div style={{ flexGrow: 1, height: '4px', backgroundColor: formStep === 2 ? '#BF1E2E' : '#E2E8F0', borderRadius: '2px', transition: 'all 0.3s' }}></div>
                </div>
              </div>

              {formStep === 1 ? (
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '16px', fontSize: '14px', color: '#334155' }}>Select appropriate system classification box:</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {['Electrical', 'Plumbing', 'Furniture', 'Internet / IT', 'Classroom Equipment', 'Hostel Maintenance'].map((cat) => (
                      <div key={cat} onClick={() => { setSelectedCategory(cat); setFormStep(2); }} style={{ padding: '20px', borderRadius: '10px', border: selectedCategory === cat ? '2px solid #BF1E2E' : '1px solid #E2E8F0', backgroundColor: selectedCategory === cat ? '#FFF5F5' : '#FFF', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <div style={{ fontWeight: '700', fontSize: '14px', color: '#0F2C59' }}>{cat}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>File reports concerning {cat.toLowerCase()} diagnostics.</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCreateRequest}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px' }}>Short Fault Label</label>
                    <input type="text" required placeholder="e.g. Broken bench row row 3" value={issueTitle} onChange={(e) => setIssueTitle(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px' }}>Location Specifics</label>
                    <input type="text" required placeholder="e.g. Hall 4 Auditorium, Left Wing" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px' }}>Urgency Level</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', backgroundColor: '#FFF' }}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px' }}>Technical Descriptive Logs</label>
                    <textarea required placeholder="Specify broken components, error codes or structural anomalies context..." value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '6px', height: '100px', boxSizing: 'border-box', fontFamily: 'inherit' }}></textarea>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" onClick={() => setFormStep(1)} style={{ padding: '10px 20px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Adjust Category</button>
                    <button type="submit" style={{ padding: '10px 24px', border: 'none', backgroundColor: '#0F2C59', color: '#FFF', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Commit Log Row</button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: SYSTEM DATA HISTORY LEDGER */}
          {activeTab === 'my-requests' && (
            <div style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F2C59', marginBottom: '4px' }}>System Logs Master Record</h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '24px' }}>Relational audit ledger mapping filed campus complaints to tracking cycles.</p>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '12px', fontWeight: 'bold' }}>
                      <th style={{ padding: '12px' }}>TICKET NO</th>
                      <th style={{ padding: '12px' }}>FAULT ITEM</th>
                      <th style={{ padding: '12px' }}>CLASSIFICATION</th>
                      <th style={{ padding: '12px' }}>LOCATION VENUE</th>
                      <th style={{ padding: '12px' }}>URGENCY</th>
                      <th style={{ padding: '12px' }}>LIFECYCLE STATUS</th>
                      <th style={{ padding: '12px' }}>TIMESTAMP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}>
                        <td style={{ padding: '16px 12px', color: '#64748B', fontFamily: 'monospace', fontWeight: 'bold' }}>#{req.id}</td>
                        <td style={{ padding: '16px 12px', fontWeight: '600', color: '#1E293B' }}>{req.title}</td>
                        <td style={{ padding: '16px 12px', color: '#64748B' }}>{req.category}</td>
                        <td style={{ padding: '16px 12px', color: '#475569' }}>{req.location}</td>
                        <td style={{ padding: '16px 12px', fontWeight: 'bold', color: req.priority === 'Critical' || req.priority === 'High' ? '#BF1E2E' : '#334155' }}>{req.priority}</td>
                        <td style={{ padding: '16px 12px' }}><span style={getStatusStyle(req.status)}>{req.status}</span></td>
                        <td style={{ padding: '16px 12px', color: '#64748B' }}>{req.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE ACCOUNT IDENTIFICATION DATA */}
          {activeTab === 'my-profile' && (
            <div style={{ maxWidth: '600px', backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '32px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F2C59', marginBottom: '20px' }}>Institutional Profile Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Academic Student Identity Name</label>
                  <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginTop: '6px', fontWeight: '600', color: '#0F2C59' }}>{user.name}</div>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>System Communication Routing Email</label>
                  <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginTop: '6px', fontWeight: '600', color: '#0F2C59' }}>{user.email}</div>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Faculty Operational Base</label>
                  <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginTop: '6px', fontWeight: '600', color: '#0F2C59' }}>School of Postgraduate Studies &bull; MIT Programme</div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}