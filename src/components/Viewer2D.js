import React from 'react';

const Viewer2D = ({ boxData }) => {
  const { length: L, width: W, height: H } = boxData.dimensions;
  
  // Logical bounding box for dieline
  const canvasW = W + (H * 2);
  const canvasH = (L * 2) + (H * 2);
  const padding = 100; // Extra space for dimensions

  return (
    <svg 
      viewBox={`-${padding} -${padding} ${canvasW + padding * 2} ${canvasH + padding * 2}`} 
      style={{ width: '90%', height: '90%', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.1))' }}
    >
      <g transform={`translate(${H}, ${L})`}>
        {/* 1. BLEED LINE (Cyan) - Offset by 3mm */}
        <rect x={-H - 3} y={-L - 3} width={canvasW + 6} height={canvasH + 6} fill="none" stroke="#00ffff" strokeWidth="1" strokeDasharray="4,2" />

        {/* 2. CREASE/FOLD LINES (Green Dashed) */}
        <g fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="10,5">
          <rect x="0" y="0" width={W} height={H} />
          <rect x="0" y={H} width={W} height={L} />
        </g>

        {/* 3. TRIM/CUT LINES (Red Solid) */}
        <path 
          d={`M 0 0 V -${L} H ${W} V 0 H ${W+H} V ${H+L} H ${W} V ${H+L+H} H 0 V ${H+L} H -${H} V 0 Z`} 
          fill="#fff" stroke="#ef4444" strokeWidth="3" 
        />

        {/* 4. DIMENSIONS (Pacdora Style) */}
        <g fill="#3b82f6" fontSize="18" fontWeight="bold" fontFamily="sans-serif">
          <text x={W/2} y={H + L + H + 50} textAnchor="middle">W: {W} mm</text>
          <text x={W + H + 50} y={H/2} transform={`rotate(90, ${W+H+50}, ${H/2})`}>L: {L} mm</text>
          <text x={-20} y={H/2} textAnchor="end">H: {H} mm</text>
        </g>
      </g>
    </svg>
  );
};

export default Viewer2D;
