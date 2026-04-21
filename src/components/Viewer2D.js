import React from 'react';

const Viewer2D = ({ boxData }) => {
  const { length: L, width: W, height: H } = boxData.dimensions;
  
  // Dynamic viewbox to ensure the dieline is always large and centered
  const totalWidth = W + (H * 2);
  const totalHeight = (L * 2) + (H * 2);
  const margin = 60;

  return (
    <div style={{ width: '100%', height: '100%', padding: '10px' }}>
      <svg 
        viewBox={`-${margin} -${margin} ${totalWidth + margin * 2} ${totalHeight + margin * 2}`}
        style={{ width: '100%', height: '100%' }}
      >
        <g transform={`translate(${H}, ${L})`}>
          {/* FOLD LINES (Green Dashed) - Pacdora uses specific dash arrays */}
          <g fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="8,5">
            <rect x="0" y="0" width={W} height={H} />
            <rect x="0" y={H} width={W} height={L} />
          </g>

          {/* CUT LINES (Red Solid) */}
          <path 
            d={`M 0 0 V -${L} H ${W} V 0 H ${W+H} V ${H+L} H ${W} V ${H+L+H} H 0 V ${H+L} H -${H} V 0 Z`} 
            fill="none" stroke="#ef4444" strokeWidth="2.5" 
          />

          {/* Dimension Text with Blue Accents */}
          <g fill="#3b82f6" fontWeight="bold" fontSize="16" fontFamily="Inter, sans-serif">
            <text x={W/2} y={H + L + H + 30} textAnchor="middle">W: {W}mm</text>
            <text x={W + H + 30} y={H/2} transform={`rotate(90, ${W+H+30}, ${H/2})`}>L: {L}mm</text>
            <text x={-20} y={H/2} textAnchor="end">H: {H}mm</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Viewer2D;
