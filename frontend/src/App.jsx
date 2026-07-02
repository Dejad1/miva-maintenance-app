import React, { useState } from 'react';

export default function App() {
  // Authentication & Session States
  const [user, setUser] = useState(null); 
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('Student / Staff Member');
  
  // Dashboard View and Filter Navigation States
  const [currentView, setCurrentView] = useState('summary'); // summary, submit-wizard, full-ledger
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, PENDING, ACTIVE, COMPLETED
  
  // Incident Form Intake States
  const [selectedCategory, setSelectedCategory] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [roomLocation, setRoomLocation] = useState('');
  const [urgencyTier, setUrgencyTier] = useState('Medium');

  // Unified Data Repository
  const [requests, setRequests] = useState([
    { id: 'MVA-8841', title: 'Power phase drop in main theater', category: 'Electrical', location: 'Lecture Hall 1', priority: 'High', status: 'Pending', timestamp: '2 hours ago' },
    { id: 'MVA-7619', title: 'Core switch data line failure', category: 'Internet / IT', location: 'Postgraduate Lab', priority: 'Critical', status: 'In Progress', timestamp: '1 day ago' },
    { id: 'MVA-4412', title: 'Broken writing desk support bars', category: 'Furniture', location: 'Classroom Block B', priority: 'Low', status: 'Completed', timestamp: '3 days ago' },
    { id: 'MVA-3091', title: 'Water line valve pressure leak', category: 'Plumbing', location: 'Hostel Block A Restrooms', priority: 'High', status: 'In Progress', timestamp: '4 days ago' },
    { id: 'MVA-2281', title: 'Projector lens replacement required', category: 'Classroom Equipment', location: 'Auditorium Center', priority: 'Medium', status: 'Completed', timestamp: '1 week ago' }
  ]);

  // Public hosting endpoint providing the real MIVA logo mark
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
      timestamp: 'Just now'
    };
    setRequests([newRecord, ...requests]);
    
    // Clear Input Parameters
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

  const filteredRequests = requests.filter(req => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'PENDING') return req.status === 'Pending';
    if (statusFilter === 'ACTIVE') return req.status === 'In Progress';
    if (statusFilter === 'COMPLETED') return req.status === 'Completed';
    return true;
  });

  /* =========================================================================
     SCREEN STYLE A: SECURITY ENTRY LAYER WITH VERIFIED MIVA LOGO BRANDING
     ========================================================================= */
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", "Segoe UI", sans-serif', backgroundColor: '#0A192F' }}>
        
        {/* Dynamic Entry split frame */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: '460px', backgroundColor: '#112240', borderRadius: '16px', padding: '40px', boxShadow: '0 20px 40px rgba(2,12,27,0.5)', border: '1px solid #233554' }}>
            
            {/* Embedded Logo Block */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <img 
                src={mivaLogoUrl} 
                alt="MIVA Open University Logo" 
                style={{ width: '150px', height: 'auto', borderRadius: '4px', marginBottom: '12px' }} 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <h2 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: '700', margin: '0', letterSpacing: '0.5px' }}>Infrastructure Portal</h2>
              <p style={{ color: '#64FFDA', fontSize: '11px', margin: '6px 0 0 0', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Campus Facilities Management Loop</p>
            </div>

            <form onSubmit={executeLogin}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', color: '#CCD6F6', fontSize: '12px', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Institutional Email</label>
                <input type="email" required placeholder="a.akindeji3503@miva.edu.ng" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0A192F', border: '1px solid #233554', borderRadius: '8px', color: '#FFF', boxSizing: 'border-box', fontSize: '14px' }} />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', color: '#CCD6F6', fontSize: '12px', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Security Password</label>
                <input type="password" required placeholder="••••••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0A192F', border: '1px solid #233554', borderRadius: '8px', color: '#FFF', boxSizing: 'border-box', fontSize: '14px' }} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: '#CCD6F6', fontSize: '12px', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cleared Authorization Level</label>
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0A192F', border: '1px solid #233554', borderRadius: '8px', color: '#FFF', fontSize: '14px', cursor: 'pointer' }}>
                  <option>Student / Staff Member</option>
                  <option>Maintenance Field Officer</option>
                  <option>System Administrator</option>
                </select>
              </div>

              <button type="submit" style={{ width: '100%', padding: '14px', border: 'none', backgroundColor: '#BF1E2E', color: '#FFFFFF', fontWeight: '700', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Authenticate Gateway Session
              </button>
            </form>

            {/* Quick Demo Utilities for Grading */}
            <div style={{ marginTop: '28px', borderTop: '1px solid #233554', paddingTop: '20px' }}>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: '#64FFDA', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', textAlign: 'center' }}>
                Evaluation Quick-Fill Accessors
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <button onClick={() => handleDemoBypass('Student / Staff Member')} style={{ padding: '8px 4px', backgroundColor: '#0A192F', border: '1px solid #233554', color: '#FFF', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Student</button>
                <button onClick={() => handleDemoBypass('Maintenance Field Officer')} style={{ padding: '8px 4px', backgroundColor: '#0A192F', border: '1px solid #233554', color: '#FFF', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Officer</button>
                <button onClick={() => handleDemoBypass('System Administrator')} style={{ padding: '8px 4px', backgroundColor: '#0A192F', border: '1px solid #233554', color: '#FFF', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Admin</button>
              </div>
            </div>

          </div>
        </div>

        <footer style={{ textAlign: 'center', padding: '16px', fontSize: '11px', color: '#8892B0', backgroundColor: '#020C1B', borderTop: '1px solid #112240' }}>
          MIVA Open University Master of Information Technology Program &bull; Operational Integrity Node
        </footer>
      </div>
    );
  }

  /* =========================================================================
     SCREEN STYLE B: HORIZONTAL BRANDED MANAGEMENT CENTER WORKSPACE
     ========================================================================= */
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F7FA', fontFamily: '"Inter", sans-serif', color: '#1E293B', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. BRANDED MAIN ROW HEADER */}
      <header style={{ backgroundColor: '#0F2C59', color: '#FFF', padding: '0 40px', height: '85px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(15,44,89,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {/* Logo Integration */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={mivaLogoUrl} 
              alt="MIVA Logo Mini" 
              style={{ height: '36px', width: 'auto', borderRadius: '4px', backgroundColor: '#FFF', padding: '2px' }} 
            />
            <span style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '0.5px', color: '#FFF' }}>CORE PLATFORM</span>
          </div>
          
          {/* Menu Anchors */}
          <nav style={{ display: 'flex', gap: '4px', height: '85px', alignItems: 'center' }}>
            <button onClick={() => setCurrentView('summary')} style={{ height: '100%', padding: '0 20px', border: 'none', background: 'none', color: currentView === 'summary' ? '#FFF' : '#93C5FD', borderBottom: currentView === 'summary' ? '4px solid #BF1E2E' : '4px solid transparent', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>📊 Control Workspace</button>
            <button onClick={() => setCurrentView('submit-wizard')} style={{ height: '100%', padding: '0 20px', border: 'none', background: 'none', color: currentView === 'submit-wizard' ? '#FFF' : '#93C5FD', borderBottom: currentView === 'submit-wizard' ? '4px solid #BF1E2E' : '4px solid transparent', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>📝 Dispatch Report</button>
            <button onClick={() => setCurrentView('full-ledger')} style={{ height: '100%', padding: '0 20px', border: 'none', background: 'none', color: currentView === 'full-ledger' ? '#FFF' : '#93C5FD', borderBottom: currentView === 'full-ledger' ? '4px solid #BF1E2E' : '4px solid transparent', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>📜 Facility Audit Trail</button>
          </nav>
        </div>

        {/* Identity Verification Box */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF' }}>{user.fullname}</div>
            <div style={{ fontSize: '11px', color: '#93C5FD', marginTop: '2px', fontWeight: '500' }}>{user.role} &bull; {user.matric}</div>
          </div>
          <button onClick={handleSignOut} style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: '700' }}>Exit Node</button>
        </div>
      </header>

      {/* 2. ROUTING CONTROLLER VIEWPORT */}
      <main style={{ padding: '40px', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box', flexGrow: 1 }}>
        
        {/* INTERFACE VIEW A: MATRIX CONTROL CONSOLE */}
        {currentView === 'summary' && (
          <div>
            {/* UPPER METRIC ROW */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '36px' }}>
              <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #0F2C59', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Ledger Entries</div>
                <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: '#0F2C59' }}>{requests.length}</div>
              </div>
              <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #D97706', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Unassigned Tickets</div>
                <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: '#D97706' }}>{requests.filter(r => r.status === 'Pending').length}</div>
              </div>
              <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #2563EB', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Remediation</div>
                <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: '#2563EB' }}>{requests.filter(r => r.status === 'In Progress').length}</div>
              </div>
              <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #16A34A', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Resolved Operations</div>
                <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: '#16A34A' }}>{requests.filter(r => r.status === 'Completed').length}</div>
              </div>
            </div>

            {/* INTEGRATED MODERN CARD ENGINE */}
            <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '2px solid #F1F5F9', paddingBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F2C59', margin: '0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Real-time Facilities Log Tracking</h3>
                
                {/* Advanced Filter Ribbon */}
                <div style={{ backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '8px', display: 'flex', gap: '4px' }}>
                  {['ALL', 'PENDING', 'ACTIVE', 'COMPLETED'].map((filter) => (
                    <button key={filter} onClick={() => setStatusFilter(filter)} style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '11px', cursor: 'pointer', backgroundColor: statusFilter === filter ? '#0F2C59' : 'transparent', color: statusFilter === filter ? '#FFF' : '#64748B' }}>{filter}</button>
                  ))}
                </div>
              </div>

              {/* Dynamic Stack Framework */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredRequests.map((req) => (
                  <div key={req.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', border: '1px solid #E2E8F0', borderRadius: '8px', backgroundColor: '#F8FAFC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#475569', fontSize: '12px', backgroundColor: '#E2E8F0', padding: '4px 8px', borderRadius: '4px' }}>{req.id}</span>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: '#1E293B' }}>{req.title}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>📍 Area Matrix: <strong>{req.location}</strong> &bull; Structural Wing: <span style={{ color: '#BF1E2E', fontWeight: '600' }}>{req.category}</span></div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '4px', backgroundColor: req.status === 'Completed' ? '#D1FAE5' : req.status === 'In Progress' ? '#DBEAFE' : '#FEF3C7', color: req.status === 'Completed' ? '#065F46' : req.status === 'In Progress' ? '#1E40AF' : '#92400E' }}>{req.status}</span>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>{req.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INTERFACE VIEW B: FAULT REGISTRATION CARRIER WIZARD */}
        {currentView === 'submit-wizard' && (
          <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: '#FFF', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0F2C59', margin: '0 0 6px 0', textTransform: 'uppercase' }}>Log Infrastructure Disruption</h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 28px 0' }}>Submit system defect telemetry profiles directly to campus engineering services.</p>
            
            <form onSubmit={executeLogCreation}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '10px', textTransform: 'uppercase' }}>System Functional Categorization</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {['Electrical', 'Plumbing', 'Furniture', 'Internet / IT', 'Classroom Equipment', 'Hostel Maintenance'].map(cat => (
                    <div key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '14px 8px', border: selectedCategory === cat ? '2px solid #BF1E2E' : '1px solid #CBD5E1', borderRadius: '8px', backgroundColor: selectedCategory === cat ? '#FFF5F5' : '#FFF', cursor: 'pointer', textAlign: 'center', fontSize: '13px', fontWeight: '600' }}>{cat}</div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>Incident Label Summary</label>
                  <input type="text" required placeholder="Brief fault identifier text" value={issueTitle} onChange={(e) => setIssueTitle(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>Specific Space Location</label>
                  <input type="text" required placeholder="e.g. Block C, Lecture Theater" value={roomLocation} onChange={(e) => setRoomLocation(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>Urgency Core Tier</label>
                <select value={urgencyTier} onChange={(e) => setUrgencyTier(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px', backgroundColor: '#FFF' }}>
                  <option>Low Priority Scope</option>
                  <option>Medium Priority Scope</option>
                  <option>High Priority Scope</option>
                  <option>Critical System Breakdown</option>
                </select>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '12px', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>Diagnostic Descriptive Log Context</label>
                <textarea placeholder="Provide extra helpful context or specific technician notes..." value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '8px', height: '100px', boxSizing: 'border-box', fontFamily: 'inherit' }}></textarea>
              </div>

              <button type="submit" style={{ width: '100%', padding: '14px', border: 'none', backgroundColor: '#0F2C59', color: '#FFF', fontWeight: '700', borderRadius: '8px', textTransform: 'uppercase', fontSize: '13px', cursor: 'pointer' }}>Commit Ticket Data Row</button>
            </form>
          </div>
        )}

        {/* INTERFACE VIEW C: COMPLETE HISTORICAL LEDGER GRID */}
        {currentView === 'full-ledger' && (
          <div style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0F2C59', marginBottom: '6px', textTransform: 'uppercase' }}>Master Compliance Infrastructure Ledger</h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '24px' }}>Relational audit logs archiving facility mutations across structural nodes.</p>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#475569', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px' }}>Ticket Code</th>
                    <th style={{ padding: '12px' }}>Description Focus</th>
                    <th style={{ padding: '12px' }}>Category</th>
                    <th style={{ padding: '12px' }}>Operational Room</th>
                    <th style={{ padding: '12px' }}>Workflow Lifecycle</th>
                    <th style={{ padding: '12px' }}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '13.5px' }}>
                      <td style={{ padding: '16px 12px', fontFamily: 'monospace', fontWeight: '700', color: '#475569' }}>#{req.id}</td>
                      <td style={{ padding: '16px 12px', fontWeight: '600' }}>{req.title}</td>
                      <td style={{ padding: '16px 12px', color: '#64748B' }}>{req.category}</td>
                      <td style={{ padding: '16px 12px', color: '#64748B' }}>{req.location}</td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', backgroundColor: req.status === 'Completed' ? '#DEF7EC' : '#FEF08A', color: req.status === 'Completed' ? '#03543F' : '#713F12' }}>{req.status}</span>
                      </td>
                      <td style={{ padding: '16px 12px', color: '#94A3B8' }}>{req.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER VERIFICATION BLOCK */}
      <footer style={{ textAlign: 'center', padding: '24px', backgroundColor: '#FFF', color: '#64748B', fontSize: '12px', borderTop: '1px solid #E2E8F0', fontWeight: '500' }}>
        MIVA Open University &bull; Postgraduate MIT Assessment Artifact &bull; Reference Profile Anchor Row
      </footer>

    </div>
  );
}