import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import Viewer2D from './components/Viewer2D';
// Note: We removed the logic/export imports temporarily to ensure it loads!

const MainApp = () => {
  const [dimensions, setDimensions] = useState({ length: 200, width: 150, height: 60 });
  const [isOpen, setIsOpen] = useState(false);

  const updateDim = (key, value) => {
    setDimensions({ ...dimensions, [key]: parseInt(value) || 0 });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f3f4f6', fontFamily: 'sans-serif' }}>
      {/* SIDEBAR */}
      <div style={{ width: '300px', background: 'white', padding: '20px', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Configurator</h2>
        
        {['length', 'width', 'height'].map((dim) => (
          <div key={dim}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block' }}>{dim.toUpperCase()} (mm)</label>
            <input 
              type="number" 
              value={dimensions[dim]} 
              onChange={(e) => updateDim(dim, e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
        ))}

        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ marginTop: '20px', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {isOpen ? "CLOSE BOX" : "OPEN BOX"}
        </button>
      </div>

      {/* VIEWERS */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ flex: 1, background: 'white', borderRadius: '8px', border: '1px solid #eee', minHeight: '400px' }}>
          <Viewer3D boxData={{ dimensions, isOpen }} />
        </div>
        <div style={{ height: '350px', background: 'white', borderRadius: '8px', border: '1px solid #eee' }}>
          <Viewer2D boxData={{ dimensions }} />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
