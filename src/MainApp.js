import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import Viewer2D from './components/Viewer2D';
import { getMailerBoxDieline } from './logic/boxCalculations';
import { exportDielinePDF, exportDielineAI } from './logic/exportSystem';

const [template, setTemplate] = useState("mailer"); // New state for library

// Add this dropdown inside your Control Panel div:
<label> Select Template: </label>
<select value={template} onChange={(e) => setTemplate(e.target.value)}>
  <option value="mailer">Flip Top Mailer</option>
  <option value="shipping">Standard Shipping Box</option>
  <option value="folder">Flat Presentation Folder</option>
</select>

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
