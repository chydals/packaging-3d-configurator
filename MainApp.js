import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import Viewer2D from './components/Viewer2D';
import { getMailerBoxDieline } from './logic/boxCalculations';
import { exportDielinePDF, exportDielineAI } from './logic/exportSystem';

const MainApp = () => {
  // 1. Setup State for the inputs
  const [dimensions, setDimensions] = useState({ length: 200, width: 150, height: 60 });
  const [thickness, setThickness] = useState(3);
  const [mode, setMode] = useState("Inner");
  const [isOpen, setIsOpen] = useState(false);

  // 2. Handle input changes
  const updateDim = (key, value) => {
    setDimensions({ ...dimensions, [key]: parseInt(value) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <h1>Packaging 3D Configurator</h1>

      {/* Control Panel */}
      <div style={{ background: '#eee', padding: '15px', borderRadius: '8px' }}>
        <h3>Adjust Dimensions (mm)</h3>
        <label>Length: </label>
        <input type="number" value={dimensions.length} onChange={(e) => updateDim('length', e.target.value)} />
        
        <label> Width: </label>
        <input type="number" value={dimensions.width} onChange={(e) => updateDim('width', e.target.value)} />
        
        <label> Height: </label>
        <input type="number" value={dimensions.height} onChange={(e) => updateDim('height', e.target.value)} />
        
        <button onClick={() => setIsOpen(!isOpen)} style={{ marginLeft: '10px' }}>
          {isOpen ? "Close Box" : "Open Box"}
        </button>
      </div>

      {/* Main Viewport */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3>2D Dieline Template</h3>
          <Viewer2D boxData={{ dimensions, thickness, mode }} />
          <button onClick={() => exportDielineAI(dimensions)}>Download AI</button>
          <button onClick={() => exportDielinePDF(dimensions)}>Download PDF</button>
        </div>
        
        <div>
          <h3>3D Preview</h3>
          <Viewer3D boxData={{ dimensions, thickness, isOpen }} />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
