import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, CheckCircle, Clock, Search, UserPlus, 
  ScanLine, QrCode, ChevronRight, X, ArrowLeft
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import './index.css';

// The full class roster for CSE(AI) SEC E
const studentNames = [
  "ADARASH CHHAGANLAL PARMAR", "ADITYA", "ADITYA SHARMA", "AKSHAT VAISHNAV", 
  "AMAN NAHAR", "ANUSHKA SHARMA", "ARPITA SHARMA", "BHARAT SHARMA", 
  "BHARAT SINGH", "BHAVIKA KUMAWAT", "DEV RATHOR", "DHARMENDRA SINGH D", 
  "DHRUV INANI", "DHRUV KUMAWAT", "DINKI GOYAL", "DIVYANSHI KATARA", 
  "DIVYARAJ SINGH", "DIXIT TAILOR", "EKLAVYA JOSHI", "GUNJAN SINGH", 
  "HANNAH CHOUTHARIA", "HIMANSHI PARIHAR", "JAY KUMAWAT", "KAILASH KUMAR", 
  "KAPIL TRIVEDI", "KHUSHAL MALVIYA", "LAHAR SANADHYA", "MADHUR PALIWAL", 
  "MAHIRAJ SINGH CHOUHAN", "MANSI JOSHI", "MEETALI SAHU", "MILIND PURBIA", 
  "MOHIT SALVI", "MOHMMAD SHAYAAN RAZA", "MRITUNJAY KUMAR", "NAVREET KAUR", 
  "NEHA JAIN", "PADAM SINGH RAJPUROHIT", "PAYAL JANGID", "PRACHI LAKSHKAR", 
  "PRASANNA MUNET", "PREETI KUNWAR RAO", "PRINCY JAIN", "PRIYANKA CHUNDAWAT", 
  "PUROHIT JAGADEESH SINGH", "RAGHAV SHUKLA", "RANVEER SINGH SARANGDEVOT", 
  "RISHI RAJ VISHNOI", "RUDRAKSH SHARMA", "RUPANSHI SETHIYA", "SAJID KHAN", 
  "SHUBHRA SHARMA", "SUMIT JOSHI", "SUNIL SHARMA", "SWARAJ SINGH INDALIA", 
  "TAMANNA VAISHNAV", "TANISHA JAIN", "TANISHA RAJPUROHIT", "VANSH GUPTA", 
  "VEDIKA VASITA", "VIJAYA RAJPAL", "VIPIN PANCHOLI", "VISHVENDRA SINGH MASANI", 
  "VYAVAHARIKA DANGI"
];

// Generate mock data for the roster
const initialStudents = studentNames.map((name, index) => ({
  id: `STU${String(index + 1).padStart(3, '0')}`,
  name: name,
  status: Math.random() > 0.8 ? 'present' : 'absent',
  time: Math.random() > 0.8 ? '08:' + Math.floor(Math.random() * 60).toString().padStart(2, '0') + ' AM' : '-'
}));

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [scanType, setScanType] = useState(null); // 'face' or 'qr'
  const [students, setStudents] = useState(initialStudents);
  
  const presentCount = students.filter(s => s.status === 'present').length;

  const Header = () => (
    <header className="header">
      <h1>
        <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '6px', color: 'white', display: 'flex' }}>
          <ScanLine size={20} />
        </div>
        TapeIn
      </h1>
      <nav className="nav-links">
        <a className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>Dashboard</a>
        <a className={`nav-link ${currentView === 'scan' ? 'active' : ''}`} onClick={() => { setCurrentView('scan'); setScanType(null); }}>Log Attendance</a>
        <a className={`nav-link ${currentView === 'students' ? 'active' : ''}`} onClick={() => setCurrentView('students')}>Students</a>
      </nav>
    </header>
  );

  const Dashboard = () => (
    <div className="fade-in">
      <div className="grid-cards">
        <div className="panel stat-card">
          <div className="stat-icon blue"><Users /></div>
          <div className="stat-info">
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="panel stat-card">
          <div className="stat-icon green"><CheckCircle /></div>
          <div className="stat-info">
            <h3>{presentCount}</h3>
            <p>Present Today</p>
          </div>
        </div>
        <div className="panel stat-card">
          <div className="stat-icon purple"><Clock /></div>
          <div className="stat-info">
            <h3>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h3>
            <p>Current Time</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Quick Actions</h2>
        <div className="action-grid">
          <div className="panel action-card blue" onClick={() => { setCurrentView('scan'); setScanType('face'); }}>
            <h3><ScanLine size={20} color="#2563eb" /> Face Recognition</h3>
            <p>Open live camera to automatically detect and log student attendance via facial recognition.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}><ChevronRight size={18} color="var(--text-muted)" /></div>
          </div>
          <div className="panel action-card purple" onClick={() => { setCurrentView('scan'); setScanType('qr'); }}>
            <h3><QrCode size={20} color="#9333ea" /> QR Scanner</h3>
            <p>Activate barcode scanner to read student digital ID cards instantly from the camera.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}><ChevronRight size={18} color="var(--text-muted)" /></div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Recent Check-ins</h2>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Check-in Time</th>
              </tr>
            </thead>
            <tbody>
              {students.filter(s => s.status === 'present').slice(0, 5).map((s, i) => (
                <tr key={i}>
                  <td>{s.id}</td>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td><span className={`status-badge ${s.status}`}>{s.status.toUpperCase()}</span></td>
                  <td>{s.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ScannerView = () => {
    const videoRef = useRef(null);
    const [scanResult, setScanResult] = useState(null);
    const [qrScanner, setQrScanner] = useState(null);

    // Stop all video streams when unmounting or changing views
    const stopCamera = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (qrScanner) {
        qrScanner.stop().catch(e => console.error("Error stopping QR scanner", e));
        qrScanner.clear();
        setQrScanner(null);
      }
    };

    useEffect(() => {
      if (scanType === 'face') {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
            }
          })
          .catch(err => console.error("Error accessing camera:", err));
      } else if (scanType === 'qr') {
        const scanner = new Html5Qrcode("qr-reader");
        setQrScanner(scanner);
        scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText, decodedResult) => {
            // Simulated match found
            setScanResult({
              name: decodedText, // In a real app we'd map this text to a student
              id: "STU-QR",
              method: 'QR Validated'
            });
            scanner.stop();
          },
          (errorMessage) => {
            // parse error, ignore
          }
        ).catch(err => console.error("Error starting QR scanner:", err));
      }

      return () => stopCamera();
    }, [scanType]);

    const handleBack = () => {
      stopCamera();
      if (scanResult) {
        setScanResult(null); // Go back to scanning
      } else if (scanType) {
        setScanType(null); // Go back to scan selection
      } else {
        setCurrentView('dashboard'); // Go back to dashboard
      }
    };

    if (!scanType) {
      return (
        <div className="fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
             <button className="btn btn-outline" onClick={handleBack} style={{ padding: '6px 12px' }}>
                <ArrowLeft size={16} /> Back
             </button>
             <h2 style={{ fontSize: '1.5rem' }}>Select Logging Method</h2>
          </div>
          
          <div className="action-grid" style={{ maxWidth: '800px' }}>
            <div className="panel action-card blue" onClick={() => setScanType('face')}>
              <h3><ScanLine size={24} color="#2563eb" /> Face Scan</h3>
              <p>Use device camera for facial recognition</p>
            </div>
            <div className="panel action-card purple" onClick={() => setScanType('qr')}>
              <h3><QrCode size={24} color="#9333ea" /> QR Code</h3>
              <p>Scan digital ID cards via camera</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fade-in panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn btn-outline" onClick={handleBack} style={{ padding: '6px 12px' }}>
              <ArrowLeft size={16} /> Back
            </button>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.25rem' }}>
              {scanType === 'face' && <><ScanLine color="#2563eb" /> AI Face Recognition</>}
              {scanType === 'qr' && <><QrCode color="#9333ea" /> QR Scanner</>}
            </h2>
          </div>
        </div>

        {!scanResult ? (
          <div className="scanner-container">
            <div className="scanner-frame" style={{ aspectRatio: scanType === 'face' ? '4/3' : 'auto' }}>
              {scanType === 'face' ? (
                 <video ref={videoRef} autoPlay playsInline muted />
              ) : (
                 <div id="qr-reader" style={{ width: '100%', minHeight: '300px' }}></div>
              )}
            </div>
            <p style={{ color: 'var(--text-muted)' }}>
              {scanType === 'face' ? "Position student's face within the frame. Auto-detecting..." : "Point camera at the QR code."}
            </p>
            {scanType === 'face' && (
              <button className="btn btn-success" onClick={() => {
                // Manually trigger a successful scan for demonstration
                setScanResult({
                  name: students[Math.floor(Math.random() * students.length)].name,
                  id: "STU-FACE",
                  method: 'Face Match'
                });
                stopCamera();
              }}>
                Simulate Successful Match
              </button>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px' }} className="fade-in">
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={32} color="var(--success)" />
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Attendance Logged!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Successfully verified via {scanResult.method}</p>
            
            <div className="panel" style={{ display: 'inline-block', textAlign: 'left', minWidth: '300px', background: '#f9fafb' }}>
              <p style={{ marginBottom: '4px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Student Verified</p>
              <p style={{ marginBottom: '16px', fontSize: '1.1rem', fontWeight: 'bold' }}>{scanResult.name}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--surface-border)', paddingTop: '12px', marginTop: '12px' }}>
                 <div>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Time</p>
                   <p style={{ fontWeight: 500 }}>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status</p>
                   <p style={{ color: 'var(--success)', fontWeight: 600 }}>PRESENT</p>
                 </div>
              </div>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn" onClick={() => { setScanResult(null); }}>Log Next Student</button>
              <button className="btn btn-outline" onClick={() => setCurrentView('dashboard')}>Dashboard</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const StudentsView = () => {
    const [search, setSearch] = useState('');
    
    const filteredStudents = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));

    return (
      <div className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn btn-outline" onClick={() => setCurrentView('dashboard')} style={{ padding: '6px 12px' }}>
              <ArrowLeft size={16} /> Back
            </button>
            <h2 style={{ fontSize: '1.5rem' }}>Class Roster: CSE(AI) SEC E</h2>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="input-field" 
                placeholder="Search students..." 
                style={{ paddingLeft: '36px', width: '250px' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn btn-success"><UserPlus size={16} /> Register</button>
          </div>
        </div>

        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="data-table-wrapper" style={{ border: 'none', borderRadius: 0, maxHeight: '600px', overflowY: 'auto' }}>
            <table className="data-table">
              <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                <tr>
                  <th>No.</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Today's Status</th>
                  <th>Check-in Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                    <td style={{ fontWeight: '500' }}>{s.name}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{s.id}</td>
                    <td><span className={`status-badge ${s.status}`}>{s.status.toUpperCase()}</span></td>
                    <td style={{ color: 'var(--text-muted)' }}>{s.time}</td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>No students found matching "{search}"</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="main-content">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'scan' && <ScannerView />}
        {currentView === 'students' && <StudentsView />}
      </main>
    </>
  );
}
