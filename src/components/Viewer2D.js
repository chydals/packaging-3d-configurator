import React from 'react';

const Viewer2D = ({ boxData }) => {
  const { length: L, width: W, height: H } = boxData.dimensions;
  const padding = 20;

  return (
    <div style={{ width: '100%', border: '1px solid #ccc', background: '#fff', padding: '10px' }}>
      <svg viewBox={`0 0 ${W + H * 2 + 100} ${L * 2 + H * 2 + 100}`} style={{ width: '100%', height: '400px' }}>
        <g transform={`translate(${padding}, ${padding})`}>
          {/* Main Body Panels */}
          <rect x={H} y={0} width={W} height={L} fill="none" stroke="blue" /> {/* Lid */}
          <rect x={H} y={L} width={W} height={H} fill="none" stroke="blue" strokeDasharray="4" /> {/* Back */}
          <rect x={H} y={L + H} width={W} height={L} fill="none" stroke="blue" /> {/* Bottom */}
          <rect x={H} y={L * 2 + H} width={W} height={H} fill="none" stroke="blue" /> {/* Front */}
          
          {/* Side Flaps */}
          <rect x={0} y={L + H} width={H} height={L} fill="none" stroke="blue" /> {/* Left */}
          <rect x={H + W} y={L + H} width={H} height={L} fill="none" stroke="blue" /> {/* Right */}
        </g>
      </svg>
    </div>
  );
};

export default Viewer2D;
