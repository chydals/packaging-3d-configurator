import React from 'react';

const Viewer2D = ({ boxData }) => {
  const { length: L, width: W, height: H } = boxData.dimensions;
  const offset = 80;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg viewBox={`0 0 ${W + H * 2 + 160} ${L * 2 + H * 2 + 160}`} style={{ width: '90%', height: '90%' }}>
        <g transform={`translate(${offset}, ${offset})`}>
          {/* FOLD LINES - Green Dashed */}
          <g fill="none" stroke="#2ecc71" strokeWidth="1.5" strokeDasharray="6,4">
            <rect x={H} y={L} width={W} height={H} /> {/* Back */}
            <rect x={H} y={L + H} width={W} height={L} /> {/* Bottom */}
          </g>

          {/* CUT LINES - Red Solid */}
          <path 
            d={`M ${H} 0 H ${H+W} V ${L} H ${H+W+H} V ${L+H+L} H ${H+W} V ${L+H+L+H} H ${H} V ${L+H+L} H 0 V ${L+H} H ${H} Z`} 
            fill="none" stroke="#ef4444" strokeWidth="2" 
          />

          {/* DIMENSION LABELS */}
          <g fill="#6b7280" fontSize="14" textAnchor="middle" fontFamily="sans-serif">
            <text x={H + W/2} y={L + H + L/2}>{W} mm</text>
            <text x={H + W + 30} y={L + H + L/2} transform={`rotate(90, ${H+W+30}, ${L+H+L/2})`}>{L} mm</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Viewer2D;
