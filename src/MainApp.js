import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import Viewer2D from './components/Viewer2D';

const MainApp = () => {
  const [dimensions, setDimensions] = useState({ length: 200, width: 150, height: 60 });
  const [foldProgress, setFoldProgress] = useState(100); // 0 to 100

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '320px', background: 'white', padding: '24px', borderRight: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Custom Dimensions</h2>
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ fontSize: '12px', color: '#6b7280' }}>FOLDING ANIMATION</label>
          <input 
            type="range" min="0" max="100" 
            value={foldProgress} 
            onChange={(e) => setFoldProgress(e.target.value)}
            style={{ width: '100%', marginTop: '10px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
            <span>FLAT (2D)</span>
            <span>CLOSED (3D)</span>
          </div>
        </div>

        {/* ... Dimension Inputs here ... */}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <div style={{ flex: 1, background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <Viewer3D boxData={{ dimensions }} foldProgress={foldProgress} />
        </div>
        <div style={{ height: '350px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <Viewer2D boxData={{ dimensions }} />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
