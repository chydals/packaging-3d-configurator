import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import Viewer2D from './components/Viewer2D';
import { generateDXF } from './utils/dxfGenerator';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const MainApp = () => {
  // --- STATE MANAGEMENT ---
  const [unit, setUnit] = useState('mm');
  const [dimensions, setDimensions] = useState({ length: 315, width: 202, height: 62 });
  const [thickness, setThickness] = useState(1.5);
  const [material, setMaterial] = useState('white-cardboard');
  const [sizeMode, setSizeMode] = useState('Outer');
  const [foldProgress, setFoldProgress] = useState(50);
  
  const [settings, setSettings] = useState({
    showOverallDim: true,
    showBasicDim: true,
    showBleed: true,
    showAnnotations: true
  });

  // --- HANDLERS ---
  const handleDimChange = (key, val) => {
    setDimensions({ ...dimensions, [key]: parseFloat(val) || 0 });
  };

  const downloadFile = (format) => {
    if (format === 'DXF') {
      const data = generateDXF(dimensions);
      const blob = new Blob([data], { type: 'application/dxf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `dieline_${dimensions.length}x${dimensions.width}.dxf`;
      link.click();
    } else {
      alert(`Exporting to ${format}... This requires a PDF/AI worker library.`);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#f0f2f5', color: '#333', overflow: 'hidden' }}>
      
      {/* LEFT SIDEBAR: Controls */}
      <div style={{ width: '340px', background: 'white', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '2px 0 10px rgba(0,0,0,0.05)', zIndex: 100 }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>Custom Size</h2>
        
        {/* Unit Toggle */}
        <div style={{ display: 'flex', background: '#f0f2f5', padding: '4px', borderRadius: '8px' }}>
          {['mm', 'in'].map(u => (
            <button key={u} onClick={() => setUnit(u)} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: unit === u ? 'white' : 'transparent', fontWeight: unit === u ? 'bold' : 'normal', boxShadow: unit === u ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}>{u}</button>
          ))}
        </div>

        {/* Inputs */}
        {['length', 'width', 'height'].map(dim => (
          <div key={dim}>
            <label style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{dim} ({unit})</label>
            <input type="number" value={dimensions[dim]} onChange={(e) => handleDimChange(dim, e.target.value)} style={{ width: '100%', padding: '12px', marginTop: '6px', border: '1px solid #dfe3e8', borderRadius: '8px', fontSize: '14px' }} />
          </div>
        ))}

        {/* Thickness */}
        <div>
          <label style={{ fontSize: '11px', color: '#888' }}>THICKNESS: {thickness}mm</label>
          <input type="range" min="0.2" max="5" step="0.1" value={thickness} onChange={(e) => setThickness(e.target.value)} style={{ width: '100%', marginTop: '10px' }} />
        </div>

        {/* Material Selection */}
        <div>
          <label style={{ fontSize: '11px', color: '#888' }}>MATERIAL</label>
          <select value={material} onChange={(e) => setMaterial(e.target.value)} style={{ width: '100%', padding: '12px', marginTop: '6px', border: '1px solid #dfe3e8', borderRadius: '8px', appearance: 'none' }}>
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

        {/* Size Mode */}
        <div>
          <label style={{ fontSize: '11px', color: '#888' }}>SIZE MODE</label>
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            {['Manufacture', 'Inner', 'Outer'].map(mode => (
              <button key={mode} onClick={() => setSizeMode(mode)} style={{ flex: 1, padding: '8px 4px', fontSize: '11px', borderRadius: '6px', border: '1px solid #dfe3e8', background: sizeMode === mode ? '#2563eb' : 'white', color: sizeMode === mode ? 'white' : '#666', cursor: 'pointer' }}>{mode}</button>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', display: 'block', marginBottom: '10px' }}>DOWNLOAD FORMATS</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {['AI', 'PDF', 'DXF', '3D Mockup'].map(fmt => (
              <button key={fmt} onClick={() => downloadFile(fmt)} style={{ padding: '10px', fontSize: '11px', borderRadius: '6px', border: '1px solid #dfe3e8', background: 'white', fontWeight: '600', cursor: 'pointer' }}>{fmt}</button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN VIEWPORT */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        
        {/* 2D CANVAS with Pan/Zoom */}
        <TransformWrapper initialScale={1} centerOnInit>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <div style={{ width: '100%', height: '100%' }}>
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', display: 'flex', gap: '12px', zIndex: 10 }}>
                <div style={{ display: 'flex', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '4px' }}>
                  <button onClick={() => zoomIn()} style={toolBtnStyle}>🔍+</button>
                  <button onClick={() => zoomOut()} style={toolBtnStyle}>🔍-</button>
                  <button onClick={() => resetTransform()} style={toolBtnStyle}>✋</button>
                </div>
                
                {/* 2D Toggles */}
                <div style={{ display: 'flex', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '8px 16px', gap: '16px', alignItems: 'center' }}>
                  <label style={toggleStyle}><input type="checkbox" checked={settings.showBleed} onChange={() => setSettings({...settings, showBleed: !settings.showBleed})} /> Bleed</label>
                  <label style={toggleStyle}><input type="checkbox" checked={settings.showBasicDim} onChange={() => setSettings({...settings, showBasicDim: !settings.showBasicDim})} /> Dimensions</label>
                </div>
              </div>

              <TransformComponent wrapperStyle={{ width: '100%', height: '100%', background: '#e9ecef' }}>
                <Viewer2D dimensions={dimensions} settings={settings} />
              </TransformComponent>
            </div>
          )}
        </TransformWrapper>

        {/* FLOATING 3D WINDOW */}
        <div style={{ position: 'absolute', top: '24px', right: '24px', width: '380px', height: '380px', background: 'rgba(255,255,255,0.95)', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)', border: '1px solid white', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '16px', left: '20px', zIndex: 10, fontSize: '11px', fontWeight: '800', color: '#999', letterSpacing: '1px' }}>3D PREVIEW</div>
          
          <Viewer3D dimensions={dimensions} material={material} foldProgress={foldProgress} thickness={thickness} />
          
          {/* Internal 3D Slider */}
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(255,255,255,0.8)', padding: '12px 20px', borderRadius: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', color: '#666', marginBottom: '8px' }}>
              <span>OPEN</span>
              <span>FOLDED</span>
            </div>
            <input type="range" min="0" max="100" value={foldProgress} onChange={(e) => setFoldProgress(e.target.value)} style={{ width: '100%', cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const toolBtnStyle = {
  width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px'
};

const toggleStyle = {
  fontSize: '12px', fontWeight: '600', color: '#666', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer'
};

export default MainApp;
