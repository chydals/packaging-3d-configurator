import React from 'react';

const Viewer2D = ({ dimensions, settings }) => {
  const { length: L, width: W, height: H } = dimensions;
  const bleed = 3; // 3mm standard

  // Calculate viewBox to ensure the drawing isn't cut off
  const viewBoxW = W + (H * 2) + 100;
  const viewBoxH = (L * 2) + (H * 2) + 100;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg 
        viewBox={`-${H + 50} -${L + 50} ${viewBoxW} ${viewBoxH}`} 
        style={{ width: '90%', height: '90%' }}
      >
        <g fill="none"> {/* Global fill none prevents the black blocks */}
          
          {/* 1. GREEN: BLEED LINE */}
          {settings.showBleed && (
            <rect 
              x={-H - bleed} y={-L - bleed} 
              width={W + (H * 2) + (bleed * 2)} 
              height={(L * 2) + (H * 2) + (bleed * 2)} 
              stroke="#10b981" strokeWidth="1" 
            />
          )}

          {/* 2. BLUE: TRIM / CUT LINE */}
          <path 
            d={`M 0 0 V -${L} H ${W} V 0 H ${W+H} V ${H+L} H ${W} V ${H+L+H} H 0 V ${H+L} H -${H} V 0 Z`} 
            stroke="#2563eb" strokeWidth="2" 
          />

          {/* 3. RED DOTTED: CREASE / FOLD LINES */}
          <g stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,4">
            {/* Horizontal Creases */}
            <line x1="0" y1="0" x2={W} y2="0" />
            <line x1="0" y1={H} x2={W} y2={H} />
            <line x1="0" y1={H+L} x2={W} y2={H+L} />
            {/* Vertical Creases */}
            <line x1="0" y1="0" x2="0" y2={H+L} />
            <line x1={W} y1="0" x2={W} y2={H+L} />
          </g>

          {/* 4. ANNOTATIONS */}
          {settings.showBasicDim && (
            <g fill="#2563eb" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
              <text x={W/2} y={H + L + H + 40} textAnchor="middle">W: {W} mm</text>
              <text x={W + H + 40} y={H/2} transform={`rotate(90, ${W+H+40}, ${H/2})`}>L: {L} mm</text>
              <text x={-H - 40} y={H/2} textAnchor="end">H: {H} mm</text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

export default Viewer2D;
