import React from 'react';

const Viewer2D = ({ dimensions, settings }) => {
  const { length: L, width: W, height: H } = dimensions;
  const bleed = 3; // 3mm standard

  return (
    <svg viewBox={`-${H + 50} -${L + 50} ${W + (H * 2) + 100} ${(L * 2) + (H * 2) + 100}`} style={{ width: '100%', height: '100%' }}>
      <g transform="translate(0, 0)">
        
        {/* 1. GREEN: BLEED LINE (3mm outside the cut) */}
        {settings.showBleed && (
          <rect 
            x={-H - bleed} y={-L - bleed} 
            width={W + (H * 2) + (bleed * 2)} 
            height={(L * 2) + (H * 2) + (bleed * 2)} 
            fill="none" stroke="#10b981" strokeWidth="1" 
          />
        )}

        {/* 2. BLUE: TRIM / CUT LINE (The actual size) */}
        <path 
          d={`M 0 0 V -${L} H ${W} V 0 H ${W+H} V ${H+L} H ${W} V ${H+L+H} H 0 V ${H+L} H -${H} V 0 Z`} 
          fill="rgba(255,255,255,0.5)" stroke="#2563eb" strokeWidth="2" 
        />

        {/* 3. RED DOTTED: CREASE / FOLD LINES */}
        <g stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,4">
          <rect x="0" y="0" width={W} height={H} />
          <rect x="0" y={H} width={W} height={L} />
        </g>

        {/* 4. DIMENSION ANNOTATIONS */}
        {settings.showBasicDim && (
          <g fill="#2563eb" fontSize="12" fontWeight="bold">
            <text x={W/2} y={H + L + H + 30} textAnchor="middle">W: {W}mm</text>
            <text x={W + H + 30} y={H/2} transform={`rotate(90, ${W+H+30}, ${H/2})`}>L: {L}mm</text>
          </g>
        )}
      </g>
    </svg>
  );
};

export default Viewer2D;
