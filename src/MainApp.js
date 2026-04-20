import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import Viewer2D from './components/Viewer2D';
import './App.css';

const MainApp = () => {
  const [dimensions, setDimensions] = useState({ length: 200, width: 150, height: 60 });
  const [isOpen, setIsOpen] = useState(false);
  const [template, setTemplate] = useState("mailer");

  const updateDim = (key, value) => {
    setDimensions({ ...dimensions, [key]: parseInt(value) || 0 });
  };

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* 1. SIDEBAR CONTROLS */}
      <div className="sidebar" style={{ width: '350px', background: '#f0f4f8', padding: '25px', borderRight: '1px solid #d1e3f0' }}>
        <h2 style={{ color: '#2c3e50' }}>Box Configurator</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Template</label>
          <select 
            value={template} 
            onChange={(e) => setTemplate(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #adcbe3' }}
          >
            <option value="mailer">Flip Top Mailer</option>
            <option value="shipping">Standard Shipping Box</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label>Length (mm):
            <input type="number" value={dimensions.length} onChange={(e) => updateDim('length', e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </label>
          <label>Width (mm):
            <input type="number" value={dimensions.width} onChange={(e) => updateDim('width', e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </label>
          <label>Height (mm):
            <input type="number" value={dimensions.height} onChange={(e) => updateDim('height', e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </label>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          style={{ marginTop: '25px', width: '100%', padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          {isOpen ? "Close Box" : "Open Box"}
        </button>
      </div>

      {/* 2. MAIN VIEWPORT AREA */}
      <div className="viewer-area" style={{ flexGrow: 1, padding: '30px', background: '#ffffff', overflowY: 'auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h3>3.D Preview (Studio View)</h3>
          <Viewer3D boxData={{ dimensions, isOpen }} />
        </div>

        <div>
          <h3>2.D Technical Dieline</h3>
          <Viewer2D boxData={{ dimensions }} />
        </div>
      </div>

    </div>
  );
};

export default MainApp;
