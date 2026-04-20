import React from 'react';

const Viewer2D = ({ boxData }) => {
  const { length: L, width: W, height: H } = boxData.dimensions;
  
  // Dynamic scaling to keep the drawing inside the box
  const viewBoxW = W + (H * 2) + 100;
  const viewBoxH = (L * 2) + (H * 2) + 100;

  return (
    <div style={{ width: '100%', height: '450px', background: '#ffffff', border: '1px solid #d1d1d1', borderRadius: '8px', overflow: 'hidden' }}>
      <svg 
        viewBox={`0 0 ${viewBoxW} ${viewBoxH}`} 
        style={{ width: '100%', height: '100%', padding: '20px' }}
      >
        <g transform="translate(50, 50)">
          {/* FOLD LINES (Green Dashed) */}
          <g stroke="#2ecc71" strokeWidth="2" strokeDasharray="5,5" fill="none">
            <rect x={H} y={L} width={W} height={H} /> {/* Back Fold */}
            <rect x={H} y={L + H} width={W} height={L} /> {/* Bottom Fold */}
            <line x1={H} y1={L+H} x2={H} y2={L+H+L} /> {/* Left Flap Fold */}
            <line x1={H+W} y1={L+H} x2={H+W} y2={L+H+L} /> {/* Right Flap Fold */}
          </g>

          {/* CUT LINES (Red Solid) */}
          <g stroke="#e74c3c" strokeWidth="2" fill="none">
            {/* Lid & Top Flap */}
            <path d={`M ${H} 0 L ${H+W} 0 L ${H+W} ${L} L ${H+W+H} ${L} L ${H+W+H} ${L+H} L ${H+W} ${L+H} L ${H+W} ${L+H+L+H} L ${H} ${L+H+L+H} L ${H} ${L+H} L 0 ${L+H} L 0 ${L} L ${H} ${L} Z`} />
            
            {/* Front Panel Bottom Cut */}
            <line x1={H} y1={L+H+L+H} x2={H+W} y2={L+H+L+H} />
          </g>
          
          {/* Dimensions Labels */}
          <text x={H + W/2} y={L + H + L/2} fontSize="12" fill="#7f8c8d" textAnchor="middle">
            {W}mm x {L}mm
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Viewer2D;
