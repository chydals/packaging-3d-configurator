import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import Viewer2D from './components/Viewer2D';

const MainApp = () => {
  const [unit, setUnit] = useState('mm'); // 'mm' or 'in'
  const [dimensions, setDimensions] = useState({ length: 315, width: 202, height: 62 });
  const [thickness, setThickness] = useState(0.5);
  const [material, setMaterial] = useState('white-cardboard');
  const [sizeMode, setSizeMode] = useState('Outer');
  const [foldProgress, setFoldProgress] = useState(50);
  
  // Visibility Settings
  const [settings, setSettings] = useState({
    showOverallDim: true,
    showBasicDim: true,
    showBleed: true,
    showAnnotations: true
  });

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#f8f9fa', fontFamily: 'sans-serif' }}>
      
      {/* LEFT PANEL: Configuration */}
      <div style={{ width: '350px', background: 'white', padding: '20px', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
        <h3>Custom Size</h3>
        <div style={{ marginBottom: '15px' }}>
          {['mm', 'in'].map(u => (
            <button key={u} onClick={() => setUnit(u)} style={{ padding: '5px 15px', background: unit === u ? '#007bff' : '#eee', color: unit === u ? 'white' : 'black', border: 'none', borderRadius: '4px', marginRight: '5px' }}>{u}</button>
          ))}
        </div>

        {['length', 'width', 'height'].map(dim => (
          <div key={dim} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '12px', textTransform: 'capitalize' }}>{dim} ({unit})</label>
            <input type="number" value={dimensions[dim]} onChange={(e) => setDimensions({...dimensions, [dim]: parseFloat(e.target.value)})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }} />
          </div>
        ))}

        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px' }}>Custom Thickness (0.2 - 5mm)</label>
          <input type="range" min="0.2" max="5" step="0.1" value={thickness} onChange={(e) => setThickness(e.target.value)} style={{ width: '100%' }} />
          <span>{thickness} mm</span>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px' }}>Choose Material</label>
          <select value={material} onChange={(e) => setMaterial(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <optgroup label="Cardboard">
              <option value="white-cardboard">White Cardboard</option>
              <option value="dark-kraft">Dark Kraft Paper</option>
            </optgroup>
            <optgroup label="Corrugated Board">
              <option value="f-flute">F-flute Paper</option>
              <option value="e-flute">E-flute Paper</option>
              <option value="b-flute">B-flute Paper</option>
            </optgroup>
          </select>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px' }}>Size Mode</label>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['Manufacture', 'Inner', 'Outer'].map(mode => (
              <button key={mode} onClick={() => setSizeMode(mode)} style={{ flex: 1, fontSize: '10px', padding: '8px 2px', background: sizeMode === mode ? '#007bff' : '#fff', color: sizeMode === mode ? 'white' : '#666' }}>{mode}</button>
            ))}
          </div>
        </div>
      </div>

      {/* CENTRAL AREA */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <Viewer2D dimensions={dimensions} settings={settings} />
        
        {/* TOP RIGHT: Floating 3D Viewer */}
        <div style={{ position: 'absolute', top: '20px', right: '20px', width: '350px', height: '350px', background: 'rgba(255,255,255,0.9)', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, fontSize: '10px', color: '#999' }}>3D VIEW</div>
          <Viewer3D dimensions={dimensions} material={material} foldProgress={foldProgress} />
          
          {/* SLIDER INSIDE 3D BOX */}
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '80%', textAlign: 'center', background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '20px' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '5px' }}>
               <span>Open</span><span>Close</span>
             </div>
             <input type="range" value={foldProgress} onChange={(e) => setFoldProgress(e.target.value)} style={{ width: '100%' }} />
          </div>
        </div>

        {/* BOTTOM: 2D Control Panel */}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', background: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <button>🔍+</button>
          <button>🔍-</button>
          <button>✋ Hand</button>
          <div style={{ width: '1px', background: '#ddd', margin: '0 10px' }} />
          <label style={{ fontSize: '12px' }}><input type="checkbox" checked={settings.showBleed} onChange={() => setSettings({...settings, showBleed: !settings.showBleed})} /> Bleed</label>
          <label style={{ fontSize: '12px' }}><input type="checkbox" checked={settings.showOverallDim} onChange={() => setSettings({...settings, showOverallDim: !settings.showOverallDim})} /> Dimensions</label>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
