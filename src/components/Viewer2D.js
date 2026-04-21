import React from 'react';

const Viewer2D = ({ dimensions, settings }) => {
  const { length: L, width: W, height: H } = dimensions;
  const bleedOffset = 3; // 3mm bleed

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="-150 -150 800 800" style={{ width: '80%', height: '80%' }}>
        <g transform="translate(100, 100)">
          
          {/* GREEN LINE: Bleed Line (Outer boundary) */}
          {settings.showBleed && (
            <rect 
              x={-H - bleedOffset} y={-L - bleedOffset} 
              width={W + (2 * H) + (2 * bleedOffset)} 
              height={(2 * L) + (2 * H) + (2 * bleedOffset)} 
              fill="none" stroke="#10b981" strokeWidth="1" 
            />
          )}

          {/* BLUE LINE: Trim Line (The actual cut) */}
          <path 
            d={`M 0 0 V -${L} H ${W} V 0 H ${W+H} V ${H+L} H ${W} V ${H+L+H} H 0 V ${H+L} H -${H} V 0 Z`} 
            fill="none" stroke="#3b82f6" strokeWidth="2" 
          />

          {/* RED DOTTED: Crease Lines (Fold lines) */}
          <g stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3">
            <line x1="0" y1="0" x2={W} y2="0" />
            <line x1="0" y1={H} x2={W} y2={H} />
            <line x1="0" y1={H+L} x2={W} y2={H+L} />
            <line x1="0" y1="0" x2="0" y2={H+L} />
            <line x1={W} y1="0" x2={W} y2={H+L} />
          </g>

          {/* ANNOTATIONS / DIMENSIONS */}
          {settings.showBasicDim && (
            <g fill="#3b82f6" fontSize="14" fontWeight="bold">
              <text x={W/2} y={H+L+H+40} textAnchor="middle">{W} mm</text>
              <text x={W+H+40} y={H/2} transform={`rotate(90, ${W+H+40}, ${H/2})`}>{L} mm</text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

export default Viewer2D;
