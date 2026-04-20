import React from 'react';

const Viewer2D = ({ boxData }) => {
  const { length: L, width: W, height: H } = boxData.dimensions;
  
  // Calculate total canvas size based on the flat layout
  const totalW = W + (H * 2);
  const totalH = (L * 2) + (H * 2);
  const padding = 50;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#fff' }}>
      <svg 
        viewBox={`-${padding} -${padding} ${totalW + padding * 2} ${totalH + padding * 2}`} 
        style={{ width: '100%', height: '100%' }}
      >
        <g transform={`translate(${H}, ${L})`}>
          {/* Main Dieline - Red Cut Lines */}
          <path 
            d={`M 0 0 H ${W} V -${L} H 0 Z M 0 0 V ${H} H ${W} V 0 M 0 ${H} V ${H+L} H ${W} V ${H} M 0 ${H+L} V ${H+L+H} H ${W} V ${H+L}`}
            fill="none" stroke="#ef4444" strokeWidth="2" 
          />
          {/* Side Flaps */}
          <rect x={-H} y={H} width={H} height={L} fill="none" stroke="#ef4444" strokeWidth="2" />
          <rect x={W} y={H} width={H} height={L} fill="none" stroke="#ef4444" strokeWidth="2" />
          
          {/* Dimension Annotations */}
          <text x={W/2} y={H/2} fontSize="14" fill="#3b82f6" textAnchor="middle">{W}mm</text>
        </g>
      </svg>
    </div>
  );
};

export default Viewer2D;
