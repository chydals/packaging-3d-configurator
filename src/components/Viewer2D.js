import React from 'react';

const Viewer2D = ({ boxData }) => {
  const { length: L, width: W, height: H } = boxData.dimensions;
  
  // Calculate total bounding box for the dieline
  const canvasW = W + (H * 2);
  const canvasH = (L * 2) + (H * 2);
  const padding = 40;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg 
        viewBox={`-${padding} -${padding} ${canvasW + padding * 2} ${canvasH + padding * 2}`} 
        style={{ width: '100%', height: '100%', maxHeight: '400px' }}
      >
        <g transform={`translate(${H}, ${L})`}>
          {/* FOLD LINES (Green Dashed) */}
          <rect x="0" y="0" width={W} height={H} fill="none" stroke="#2ecc71" strokeDasharray="5,5" />
          <rect x="0" y={H} width={W} height={L} fill="none" stroke="#2ecc71" strokeDasharray="5,5" />

          {/* CUT LINES (Red Solid) */}
          <path 
            d={`M 0 0 V -${L} H ${W} V 0 H ${W+H} V ${H+L} H ${W} V ${H+L+H} H 0 V ${H+L} H -${H} V 0 Z`} 
            fill="none" stroke="#ef4444" strokeWidth="2" 
          />

          {/* Pacdora-style Dimension Labels */}
          <text x={W/2} y={H + L/2} fontSize="12" fill="#3b82f6" textAnchor="middle" fontWeight="bold">{W}mm</text>
          <text x={W + 20} y={H/2} fontSize="12" fill="#3b82f6" transform={`rotate(90, ${W+20}, ${H/2})`}>{L}mm</text>
        </g>
      </svg>
    </div>
  );
};

export default Viewer2D;
