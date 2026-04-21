import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import Viewer2D from './components/Viewer2D';
import { generateDXF } from './utils/dxfGenerator';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const MainApp = () => {
  const [dimensions, setDimensions] = useState({ length: 315, width: 202, height: 62 });
  const [thickness, setThickness] = useState(1.5);
  const [material, setMaterial] = useState('white-cardboard');
  const [foldProgress, setFoldProgress] = useState(50);
  const [settings, setSettings] = useState({ showBleed: true, showBasicDim: true });

  const downloadFile = (format) => {
    if (format === 'DXF') {
      const data = generateDXF(dimensions);
      const blob = new Blob([data], { type: 'application/dxf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `dieline_${dimensions.length}x${dimensions.width}.dxf`;
      link.click();
    } else {
      alert(`${format} export triggered. (Requires backend/PDF library)`);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#ffffff', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      
      {/* SIDEBAR */}
      <div style={{ width: '320px', borderRight: '1px solid #e0e0e0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', zIndex: 10, background: '#fff' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Dieline Settings</h2>
        
        {['length', 'width', 'height'].map(dim => (
          <div key={dim}>
            <label style={{ fontSize: '12px', color: '#666', textTransform: 'capitalize' }}>{dim} (mm)</label>
            <input type="number" value={dimensions[dim]} onChange={(e) => setDimensions({...dimensions, [dim]: parseFloat(e.target.value)})} style={inputStyle} />
          </div>
        ))}

        <div>
          <label style={{ fontSize: '12px', color: '#666' }}>Thickness: {thickness}mm</label>
          <input type="range" min="0.2" max="5" step="0.1" value={thickness} onChange={(e) => setThickness(e.target.value)} style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#666' }}>Material</label>
          <select value={material} onChange={(e) => setMaterial(e.target.value)} style={inputStyle}>
            <option value="white-cardboard">White Cardboard</option>
            <option value="dark-kraft">Dark Kraft Paper</option>
            <option value="e-flute">E-Flute Corrugated</option>
          </select>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold' }}>DOWNLOADS</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
            {['AI', 'PDF', 'DXF'].map(fmt => (
              <button key={fmt} onClick={() => downloadFile(fmt)} style={btnStyle}>{fmt}</button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEWPORT AREA */}
      <div style={{ flex: 1, position: 'relative', background: '#f5f5f5' }}>
        
        {/* 2D CANVAS (Large Hero View) */}
        <TransformWrapper initialScale={1} centerOnInit>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <div style={{ width: '100%', height: '100%' }}>
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 20, display: 'flex', gap: '10px' }}>
                <button onClick={() => zoomIn()} style={circleBtn}>+</button>
                <button onClick={() => zoomOut()} style={circleBtn}>-</button>
                <button onClick={() => resetTransform()} style={circleBtn}>Reset</button>
              </div>

              <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                <Viewer2D dimensions={dimensions} settings={settings} />
              </TransformComponent>
            </div>
          )}
        </TransformWrapper>

        {/* RESIZABLE 3D WINDOW (Floating) */}
        <div style={{ 
          position: 'absolute', top: '20px', right: '20px', 
          width: '400px', height: '400px', 
          minWidth: '250px', minHeight: '250px',
          background: 'white', borderRadius: '15px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
          zIndex: 50, resize: 'both', overflow: 'hidden', 
          border: '1px solid #ddd', display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ background: '#fafafa', padding: '10px', fontSize: '10px', fontWeight: 'bold', color: '#aaa', borderBottom: '1px solid #eee' }}>
             3D VIEW (DRAG CORNER TO RESIZE)
          </div>
          
          <div style={{ flex: 1 }}>
            <Viewer3D dimensions={dimensions} material={material} foldProgress={foldProgress} thickness={thickness} />
          </div>

          <div style={{ padding: '15px', background: '#fff' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '5px' }}>
                <span>OPEN</span><span>FOLDED</span>
             </div>
             <input type="range" value={foldProgress} onChange={(e) => setFoldProgress(e.target.value)} style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' };
const btnStyle = { padding: '8px', cursor: 'pointer', background: '#eee', border: 'none', borderRadius: '4px', fontWeight: 'bold' };
const circleBtn = { width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', cursor: 'pointer' };

export default MainApp;
