import React, { useState } from 'react';

export default function App() {
  // Session & Access States
  const [user, setUser] = useState(null); 
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('Student / Staff Member');
  
  // Interactive Controls
  const [currentView, setCurrentView] = useState('summary'); 
  const [statusFilter, setStatusFilter] = useState('ALL'); 
  
  // Maintenance Record Intake States
  const [selectedCategory, setSelectedCategory] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [roomLocation, setRoomLocation] = useState('');
  const [urgencyTier, setUrgencyTier] = useState('Medium Priority Scope');
  const [issueDescription, setIssueDescription] = useState('');

  // Live Master Telemetry Repository
  const [requests, setRequests] = useState([
    { id: 'MVA-8841', title: 'Power phase drop in main theater', category: 'Electrical', location: 'Lecture Hall 1', priority: 'High', status: 'Pending', officer: 'Unassigned', timestamp: '2 hours ago' },
    { id: 'MVA-7619', title: 'Core switch data line failure', category: 'Internet / IT', location: 'Postgraduate Lab', priority: 'Critical', status: 'In Progress', officer: 'Engr. Taiwo', timestamp: '1 day ago' },
    { id: 'MVA-4412', title: 'Broken writing desk support bars', category: 'Furniture', location: 'Classroom Block B', priority: 'Low', status: 'Completed', officer: 'Baba Ibrahim', timestamp: '3 days ago' },
    { id: 'MVA-3091', title: 'Water line valve pressure leak', category: 'Plumbing', location: 'Hostel Block A Restrooms', priority: 'High', status: 'In Progress', officer: 'Engr. Taiwo', timestamp: '4 days ago' },
    { id: 'MVA-2281', title: 'Projector lens replacement required', category: 'Classroom Equipment', location: 'Auditorium Center', priority: 'Medium', status: 'Completed', officer: 'M. Shuaibu', timestamp: '1 week ago' }
  ]);

  // Public hosting endpoint serving the official MIVA brand identity token
  const mivaLogoUrl = "https://i.postimg.cc/mDZHmsYw/MIVA-LOGO.jpg";

  const handleDemoBypass = (role) => {
    setEmailInput('a.akindeji3503@miva.edu.ng');
    setPasswordInput('👑 MIT-CONFIDENTIAL');
    setSelectedRole(role);
  };

  const executeLogin = (e) => {
    e.preventDefault();
    setUser({
      fullname: "ADESOLA AKINDEJI OLUWOLE",
      idCode: "301823503",
      matric: "2025/A/MIT/0447",
      email: emailInput || "a.akindeji3503@miva.edu.ng",
      role: selectedRole
    });
    setCurrentView('summary');
  };

  const executeLogCreation = (e) => {
    e.preventDefault();
    const generatedId = `MVA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord = {
      id: generatedId,
      title: issueTitle,
      category: selectedCategory || 'General Maintenance',
      location: roomLocation,
      priority: urgencyTier,
      status: 'Pending',
      officer: 'Unassigned',
      timestamp: 'Just now'
    };
    setRequests([newRecord, ...requests]);
    
    // Reset wizard fields
    setIssueTitle('');
    setRoomLocation('');
    setIssueDescription('');
    setSelectedCategory('');
    setCurrentView('summary');
  };

  const handleSignOut = () => {
    setUser(null);
    setEmailInput('');
    setPasswordInput('');
  };

  // Status Toggles
  const handleToggleStatus = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  // Officer Assignments
  const handleAssignOfficer = (id, officerName) => {
    setRequests(requests.map(req => req.id === id ? { ...req, officer: officerName, status: 'In Progress' } : req));
  };

  const filteredRequests = requests.filter(req => {
    if (statusFilter === 'ALL') return true;
    return req.status.toUpperCase() === statusFilter;
  });

  /* =========================================================================
     🔒 GATEWAY: SECURITY ACCESS LAYER WITH OFFICIAL MIVA LOGO
     ========================================================================= */
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", "Segoe UI", sans-serif', backgroundColor: '#0B132B' }}>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: '460px', backgroundColor: '#1C2541', borderRadius: '16px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid #3A506B' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <img src={mivaLogoUrl} alt="MIVA University Emblem" style={{ width: '140px', height: 'auto', borderRadius: '4px', marginBottom: '14px', backgroundColor: '#FFF', padding: '4px' }} />
              <h2 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: '700', margin: '0' }}>Asset Control Node</h2>
              <p style={{ color: '#5BC0BE', fontSize: '11px', margin: '6px 0 0 0', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>MIT Continuous Assessment Framework</p>
            </div>

            <form onSubmit={executeLogin}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', color: '#FFF', fontSize: '12px', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase' }}>Institutional Identity Email</label>
                <input type="email" required placeholder="a.akindeji3503@miva.edu.ng" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0B132B', border: '1px solid #3A506B', borderRadius: '8px', color: '#FFF', boxSizing: 'border-box', fontSize: '14px' }} />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', color: '#FFF', fontSize: '12px', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase' }}>Access Token Password</label>
                <input type="password" required placeholder="••••••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0B132B', border: '1px solid #3A506B', borderRadius: '8px', color: '#FFF', boxSizing: 'border-box', fontSize: '14px' }} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: '#FFF', fontSize: '12px', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase' }}>Security Authorization Level</label>
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0B132B', border: '1px solid #3A506B', borderRadius: '8px', color: '#FFF', fontSize: '14px', cursor: 'pointer' }}>
                  <option>Student / Staff Member</option>
                  <option>Maintenance Field Officer</option>
                  <option>System Administrator</option>
                </select>
              </div>

              <button type="submit" style={{ width: '100%', padding: '14px', border: 'none', backgroundColor: '#BF1E2E', color: '#FFFFFF', fontWeight: '700', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Authorize System Gateway
              </button>
            </form>

            <div style={{ marginTop: '28px', borderTop: '1px solid #3A506B', paddingTop: '20px' }}>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: '#5BC0BE', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', textAlign: 'center' }}>Evaluation Role Switchers</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <button onClick={() => handleDemoBypass('Student / Staff Member')} style={{ padding: '8px 4px', backgroundColor: '#0B132B', border: '1px solid #3A506B', color: '#FFF', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Student</button>
                <button onClick={() => handleDemoBypass('Maintenance Field Officer')} style={{ padding: '8px 4px', backgroundColor: '#0B132B', border: '1px solid #3A506B', color: '#FFF', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Officer</button>
                <button onClick={() => handleDemoBypass('System Administrator')} style={{ padding: '8px 4px', backgroundColor: '#0B132B', border: '1px solid #3A506B', color: '#FFF', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Admin</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     🎛️ SYSTEM SHELL HEADER WITH RECOGNIZED METRICS STRIP
     ========================================================================= */
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: '"Inter", sans-serif', color: '#0F172A', display: 'flex', flexDirection: 'column' }}>
      
      <header style={{ backgroundColor: '#0F2C59', color: '#FFF', padding: '0 40px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(15,44,89,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={mivaLogoUrl} alt="MIVA Logo" style={{ height: '40px', width: 'auto', borderRadius: '4px', backgroundColor: '#FFF', padding: '2px' }} />
            <span style={{ fontWeight: '800', fontSize: '14px', letterSpacing: '0.5px', color: '#E2E8F0' }}>SYSTEM PORTAL</span>
          </div>
          
          {/* NAVIGATION CONSTRAINED DYNAMICALLY BY ACTIVE IDENTITY ROLE */}
          <nav style={{ display: 'flex', gap: '4px', height: '90px', alignItems: 'center' }}>
            <button onClick={() => setCurrentView('summary')} style={{ height: '100%', padding: '0 20px', border: 'none', background: 'none', color: currentView === 'summary' ? '#FFF' : '#94A3B8', borderBottom: currentView === 'summary' ? '4px solid #BF1E2E' : '4px solid transparent', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
              {user.role === 'Student / Staff Member' && "📊 My Operations"}
              {user.role === 'Maintenance Field Officer' && "🛠️ Assigned Repairs"}
              {user.role === 'System Administrator' && "🛡️ Global Core Console"}
            </button>
            
            {user.role === 'Student / Staff Member' && (
              <button onClick={() => setCurrentView('submit-wizard')} style={{ height: '100%', padding: '0 20px', border: 'none', background: 'none', color: currentView === 'submit-wizard' ? '#FFF' : '#94A3B8', borderBottom: currentView === 'submit-wizard' ? '4px solid #BF1E2E' : '4px solid transparent', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>📝 Log Disruption</button>
            )}

            <button onClick={() => setCurrentView('full-ledger')} style={{ height: '100%', padding: '0 20px', border: 'none', background: 'none', color: currentView === 'full-ledger' ? '#FFF' : '#94A3B8', borderBottom: currentView === 'full-ledger' ? '4px solid #BF1E2E' : '4px solid transparent', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>📜 Structural Audit Ledger</button>
          </nav>
        </div>

        {/* Dynamic Verification Token Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFF' }}>{user.fullname}</div>
            <div style={{ fontSize: '11px', color: '#38BDF8', marginTop: '2px', fontWeight: '600' }}>{user.role} &bull; {user.matric}</div>
          </div>
          <button onClick={handleSignOut} style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: '700' }}>Disconnect</button>
        </div>
      </header>

      {/* MAIN LAYOUT BODY */}
      <main style={{ padding: '40px', maxWidth: '1320px', margin: '0 auto', width: '100%', boxSizing: 'border-box', flexGrow: 1 }}>
        
        {currentView === 'summary' && (
          <div>
            {/* =========================================================================
               VIEW ROLE 1: STUDENT / STAFF PERSONAL INTAKE PANEL
               ========================================================================= */}
            {user.role === 'Student / Staff Member' && (
              <div>
                <div style={{ marginBottom: '32px', backgroundColor: '#EFF6FF', borderLeft: '4px solid #1D4ED8', padding: '20px', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 4px 0', color: '#1E40AF', fontSize: '15px', fontWeight: '700' }}>Welcome back, Student Account Node</h4>
                  <p style={{ margin: '0', color: '#1E3A8A', fontSize: '13px' }}>Below is an exclusive matrix tracing the operational status of disruptions you have logged across campus structures.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                  <div style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>My Logged Faults</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '4px', color: '#0F2C59' }}>{requests.length}</div>
                  </div>
                  <div style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Awaiting Technical Review</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '4px', color: '#D97706' }}>{requests.filter(r => r.status === 'Pending').length}</div>
                  </div>
                  <div style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Resolved Infrastructure Items</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '4px', color: '#16A34A' }}>{requests.filter(r => r.status === 'Completed').length}</div>
                  </div>
                </div>

                {/* Tracking Monitor Frame */}
                <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid #E2E8F0' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0F2C59', margin: '0 0 20px 0', textTransform: 'uppercase' }}>Personal Request Pipeline</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {requests.map(req => (
                      <div key={req.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #F1F5F9', borderRadius: '8px', backgroundColor: '#F8FAFC' }}>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '14px' }}>{req.title}</div>
                          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>📍 Location: {req.location} &bull; Class: <strong style={{ color: '#BF1E2E' }}>{req.category}</strong></div>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '4px', backgroundColor: req.status === 'Completed' ? '#D1FAE5' : '#FEF3C7', color: req.status === 'Completed' ? '#065F46' : '#92400E' }}>{req.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
               VIEW ROLE 2: FIELD OPERATION INTERFACE (MAINTENANCE OFFICER)
               ========================================================================= */}
            {user.role === 'Maintenance Field Officer' && (
              <div>
                <div style={{ marginBottom: '32px', backgroundColor: '#FFF7ED', borderLeft: '4px solid #EA580C', padding: '20px', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 4px 0', color: '#C2410C', fontSize: '15px', fontWeight: '700' }}>Active Engineering Despatch Deck</h4>
                  <p style={{ margin: '0', color: '#9A3412', fontSize: '13px' }}>You are authorized to execute structural remediation actions, adjust progress meters, and sign off verified closures.</p>
                </div>

                <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '32px', border: '1px solid #E2E8F0' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0F2C59', margin: '0 0 24px 0', textTransform: 'uppercase' }}>Assigned Remediation Task Board</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {requests.filter(r => r.status !== 'Completed').map(req => (
                      <div key={req.id} style={{ padding: '20px', border: '1px solid #E2E8F0', borderRadius: '8px', backgroundColor: '#F8FAFC' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '12px', backgroundColor: '#CBD5E1', padding: '2px 6px', borderRadius: '4px' }}>{req.id}</span>
                          <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#DBEAFE', color: '#1E40AF' }}>{req.status}</span>
                        </div>
                        <h4 style={{ margin: '12px 0 6px 0', fontSize: '15px', fontWeight: '700' }}>{req.title}</h4>
                        <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#64748B' }}>📍 Location Matrix: <strong>{req.location}</strong> | Sector: {req.category}</p>
                        
                        {/* Interactive Workflow Lifecycle Actions */}
                        <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
                          <button onClick={() => handleToggleStatus(req.id, 'In Progress')} style={{ flexGrow: 1, padding: '8px', border: 'none', backgroundColor: '#2563EB', color: '#FFF', fontWeight: '700', fontSize: '11px', borderRadius: '4px', cursor: 'pointer' }}>Set Active</button>
                          <button onClick={() => handleToggleStatus(req.id, 'Completed')} style={{ flexGrow: 1, padding: '8px', border: 'none', backgroundColor: '#16A34A', color: '#FFF', fontWeight: '700', fontSize: '11px', borderRadius: '4px', cursor: 'pointer' }}>Mark Resolved</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
               VIEW ROLE 3: GLOBAL CONTROL HUB (SYSTEM ADMINISTRATOR)
               ========================================================================= */}
            {user.role === 'System Administrator' && (
              <div>
                <div style={{ marginBottom: '32px', backgroundColor: '#F0FDFA', borderLeft: '4px solid #0D9488', padding: '20px', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 4px 0', color: '#115E59', fontSize: '15px', fontWeight: '700' }}>Root Control Governance Center</h4>
                  <p style={{ margin: '0', color: '#134E4A', fontSize: '13px' }}>Global access granted. Execute asset group tracking, dispatch engineering field technicians, and update operational matrix blocks.</p>
                </div>

                <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0F2C59', margin: '0', textTransform: 'uppercase' }}>Global Workorder & Dispatch Registry</h3>
                    <div style={{ backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '6px', display: 'flex', gap: '4px' }}>
                      {['ALL', 'PENDING', 'IN PROGRESS', 'COMPLETED'].map(f => (
                        <button key={f} onClick={() => setStatusFilter(f)} style={{ padding: '6px 10px', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', backgroundColor: statusFilter === f ? '#0F2C59' : 'transparent', color: statusFilter === f ? '#FFF' : '#64748B' }}>{f}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {filteredRequests.map(req => (
                      <div key={req.id} style={{ padding: '20px', border: '1px solid #E2E8F0', borderRadius: '8px', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '11px', color: '#475569', backgroundColor: '#E2E8F0', padding: '2px 6px', borderRadius: '4px' }}>{req.id}</span>
                          <h4 style={{ margin: '8px 0 4px 0', fontSize: '15px' }}>{req.title}</h4>
                          <p style={{ margin: '0', fontSize: '12px', color: '#64748B' }}>📍 {req.location} &bull; Current Assigned: <strong style={{ color: '#0F2C59' }}>{req.officer}</strong></p>
                        </div>
                        
                        {/* Interactive Dispatch Core */}
                        <div>
                          {req.officer === 'Unassigned' ? (
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => handleAssignOfficer(req.id, 'Engr. Taiwo')} style={{ padding: '6px 12px', backgroundColor: '#0F2C59', color: '#FFF', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Deploy Taiwo</button>
                              <button onClick={() => handleAssignOfficer(req.id, 'Baba Ibrahim')} style={{ padding: '6px 12px', backgroundColor: '#0F2C59', color: '#FFF', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Deploy Ibrahim</button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '4px', backgroundColor: req.status === 'Completed' ? '#D1FAE5' : '#DBEAFE', color: req.status === 'Completed' ? '#065F46' : '#1E40AF' }}>{req.status}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
           WIZARD VIEW: DISRUPTION INTAKE SYSTEM (STUDENT ACCESS ONLY)
           ========================================================================= */}
        {currentView === 'submit-wizard' && (
          <div style={{ maxWidth: '720px', margin: '0 auto', backgroundColor: '#FFF', borderRadius: '16px', padding: '40px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0F2C59', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Log Infrastructure Disruption</h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 32px 0' }}>Populate the discrete matrix variables below to route the ticket to campus engineering services.</p>
            
            <form onSubmit={executeLogCreation}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '10px', textTransform: 'uppercase' }}>Select Structural Group Category</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {['Electrical', 'Plumbing', 'Furniture', 'Internet / IT', 'Classroom Equipment', 'Hostel Maintenance'].map(cat => (
                    <div key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '14px 8px', border: selectedCategory === cat ? '2px solid #BF1E2E' : '1px solid #CBD5E1', borderRadius: '8px', backgroundColor: selectedCategory === cat ? '#FFF5F5' : '#FFF', cursor: 'pointer', textAlign: 'center', fontSize: '13px', fontWeight: '600' }}>{cat}</div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>Incident Scope Title</label>
                  <input type="text" required placeholder="Brief descriptor label" value={issueTitle} onChange={(e) => setIssueTitle(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>Location Space Identifier</label>
                  <input type="text" required placeholder="e.g. Theater 2, Floor 1" value={roomLocation} onChange={(e) => setRoomLocation(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>Urgency Evaluation Tier</label>
                <select value={urgencyTier} onChange={(e) => setUrgencyTier(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px', backgroundColor: '#FFF' }}>
                  <option>Low Priority Scope</option>
                  <option>Medium Priority Scope</option>
                  <option>High Priority Scope</option>
                  <option>Critical System Breakdown</option>
                </select>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>Detailed Structural Context Log</label>
                <textarea placeholder="Provide details regarding asset breakdown here..." value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px', height: '100px', boxSizing: 'border-box', fontFamily: 'inherit' }}></textarea>
              </div>

              <button type="submit" style={{ width: '100%', padding: '14px', border: 'none', backgroundColor: '#0F2C59', color: '#FFF', fontWeight: '700', borderRadius: '8px', textTransform: 'uppercase', fontSize: '13px', cursor: 'pointer' }}>Commit Incident Log Row</button>
            </form>
          </div>
        )}

        {/* =========================================================================
           LEDGER VIEW: SYSTEM COMPLIANCE RECORDS AUDIT TRAIL
           ========================================================================= */}
        {currentView === 'full-ledger' && (
          <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0F2C59', marginBottom: '6px', textTransform: 'uppercase' }}>Master Compliance Infrastructure Ledger</h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '24px' }}>Systematic records of all facility maintenance mutations logged across academic nodes.</p>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#475569', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px' }}>Ticket Code</th>
                    <th style={{ padding: '12px' }}>Description Focus</th>
                    <th style={{ padding: '12px' }}>Category Hierarchy</th>
                    <th style={{ padding: '12px' }}>Target Space Matrix</th>
                    <th style={{ padding: '12px' }}>Assigned Field Agent</th>
                    <th style={{ padding: '12px' }}>Workflow State</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '13.5px' }}>
                      <td style={{ padding: '16px 12px', fontFamily: 'monospace', fontWeight: '700', color: '#475569' }}>#{req.id}</td>
                      <td style={{ padding: '16px 12px', fontWeight: '600' }}>{req.title}</td>
                      <td style={{ padding: '16px 12px', color: '#64748B' }}>{req.category}</td>
                      <td style={{ padding: '16px 12px', color: '#64748B' }}>{req.location}</td>
                      <td style={{ padding: '16px 12px', fontWeight: '600', color: '#0F2C59' }}>{req.officer}</td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px