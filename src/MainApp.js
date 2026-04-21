import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import Viewer2D from './components/Viewer2D';

const MainApp = () => {
  const [dimensions, setDimensions] = useState({ length: 200, width: 150, height: 60 });
  const [material, setMaterial] = useState('corrugated'); // e.g., 'cardboard', 'kraft'
  const [sizeMode, setSizeMode] = useState('outer'); // 'inner' or 'outer'
  const [foldProgress, setFoldProgress] = useState(50);

  const updateDim = (key, val) => setDimensions({ ...dimensions, [key]: parseInt(val) || 0 });

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: '#f0f2f5' }}>
      
      {/* LEFT SIDEBAR: Configuration */}
      <div style={{ width: '320px', background: 'white', padding: '24px', zIndex: 10, boxShadow: '2px 0 10px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ fontSize: '18px', margin: 0 }}>Dimensions</h2>
        
        {/* Size Mode Toggle */}
        <div style={{ display: 'flex', background: '#f0f2f5', borderRadius: '8px', padding: '4px' }}>
          {['inner', 'outer'].map(mode => (
            <button 
              key={mode}
              onClick={() => setSizeMode(mode)}
              style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: sizeMode === mode ? 'white' : 'transparent', fontWeight: sizeMode === mode ? 'bold' : 'normal' }}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Inputs */}
        {['length', 'width', 'height'].map(dim => (
          <div key={dim}>
            <label style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>{dim} (mm)</label>
            <input type="number" value={dimensions[dim]} onChange={(e) => updateDim(dim, e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid #ddd', borderRadius: '6px' }} />
          </div>
        ))}

        {/* Material Selection */}
        <div style={{ marginTop: '10px' }}>
          <label style={{ fontSize: '12px', color: '#666' }}>MATERIAL</label>
          <select value={material} onChange={(e) => setMaterial(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '4px' }}>
            <option value="corrugated">Corrugated Cardboard (E-Flute)</option>
            <option value="kraft">Brown Kraft Paper</option>
            <option value="white">White Paperboard</option>
          </select>
        </div>

        {/* Fold Slider */}
        <div style={{ marginTop: '20px' }}>
          <label style={{ fontSize: '12px', color: '#666' }}>FOLDING: {foldProgress}%</label>
          <input type="range" min="0" max="100" value={foldProgress} onChange={(e) => setFoldProgress(e.target.value)} style={{ width: '100%' }} />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, position: 'relative', background: '#e9ecef' }}>
        
        {/* 2D DIELINE: Hero View */}
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Viewer2D boxData={{ dimensions, material }} />
        </div>

        {/* 3D PREVIEW: Top Right Floating Window */}
        <div style={{ 
          position: 'absolute', top: '20px', right: '20px', 
          width: '300px', height: '300px', 
          background: 'white', borderRadius: '12px', 
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          overflow: 'hidden', border: '1px solid #fff'
        }}>
          <div style={{ position: 'absolute', top: '10px', left: '15px', zIndex: 5, fontSize: '12px', fontWeight: 'bold', color: '#999' }}>3D VIEW</div>
          <Viewer3D boxData={{ dimensions, material }} foldProgress={foldProgress} />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
