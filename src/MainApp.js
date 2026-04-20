import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import Viewer2D from './components/Viewer2D';
import './App.css';

const MainApp = () => {
  const [dimensions, setDimensions] = useState({ length: 200, width: 150, height: 60 });
  const [isOpen, setIsOpen] = useState(false);

  const updateDim = (key, value) => {
    setDimensions({ ...dimensions, [key]: parseInt(value) || 0 });
  };

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', background: '#f8f9fb' }}>
      {/* LEFT SIDEBAR: Controls */}
      <div className="sidebar" style={{ width: '320px', background: '#ffffff', padding: '24px', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ fontSize: '1.25rem', color: '#111827' }}>Dimensions (mm)</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['length', 'width', 'height'].map((dim) => (
            <div key={dim}>
              <label style={{ display: 'block', textTransform: 'capitalize', marginBottom: '4px', fontSize: '14px' }}>{dim}</label>
              <input 
                type="number" 
                value={dimensions[dim]} 
                onChange={(e) => updateDim(dim, e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
          >
            {isOpen ? "Close Box View" : "Open Box View"}
          </button>
        </div>
      </div>

      {/* RIGHT AREA: Viewers */}
      <div className="viewer-grid" style={{ flex: 1, padding: '24px', display: 'grid', gridTemplateRows: '1fr 1fr', gap: '24px', overflowY: 'auto' }}>
        <div className="card" style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', position: 'relative' }}>
          <h3 style={{ position: 'absolute', top: '15px', left: '20px', margin: 0, fontSize: '14px', color: '#6b7280' }}>3D PREVIEW</h3>
          <Viewer3D boxData={{ dimensions, isOpen }} />
        </div>
        <div className="card" style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', position: 'relative' }}>
          <h3 style={{ position: 'absolute', top: '15px', left: '20px', margin: 0, fontSize: '14px', color: '#6b7280' }}>2D DIELINE</h3>
          <Viewer2D boxData={{ dimensions }} />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
