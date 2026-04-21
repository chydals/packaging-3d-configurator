import React from 'react';

const Viewer2D = ({ boxData }) => {
  const { length: L, width: W, height: H } = boxData.dimensions;
  const canvasW = W + (H * 2);
  const canvasH = (L * 2) + (H * 2);
  const margin = 80;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#fff' }}>
      <svg viewBox={`-${margin} -${margin} ${canvasW + margin * 2} ${canvasH + margin * 2}`} style={{ width: '100%', height: '100%' }}>
        <g transform={`translate(${H}, ${L})`}>
          {/* BLEED LINE (Cyan) */}
          <rect x={-H-3} y={-L-3} width={canvasW+6} height={canvasH+6} fill="none" stroke="#00ffff" strokeWidth="1" strokeDasharray="2,2" />
          
          {/* CREASE LINES (Green Dashed) */}
          <g fill="none" stroke="#2ecc71" strokeWidth="1.5" strokeDasharray="5,3">
            <rect x="0" y="0" width={W} height={H} />
            <rect x="0" y={H} width={W} height={L} />
          </g>

          {/* TRIM/CUT LINES (Red Solid) */}
          <path d={`M 0 0 V -${L} H ${W} V 0 H ${W+H} V ${H+L} H ${W} V ${H+L+H} H 0 V ${H+L} H -${H} V 0 Z`} fill="none" stroke="#ef4444" strokeWidth="2" />

          {/* DIMENSION LABELS (Blue) */}
          <g fill="#2563eb" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            <text x={W/2} y={H + L + H + 40}>W: {W} mm</text>
            <text x={W + H + 40} y={H/2} transform={`rotate(90, ${W+H+40}, ${H/2})`}>L: {L} mm</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Viewer2D;
