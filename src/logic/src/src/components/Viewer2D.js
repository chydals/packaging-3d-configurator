import React from 'react';

const Viewer2D = ({ boxData }) => {
  const { length, width, height, thickness } = boxData.dimensions;
  
  // To make the SVG viewable, we define a viewBox that fits the flat template
  // A Mailer box flat layout is roughly: (Width * 2 + Height * 2) by (Length + Height * 2)
  const totalWidth = (width * 2) + (height * 2) + 40; // 40 is padding
  const totalHeight = (length) + (height * 2) + 40;

  return (
    <div style={{ width: '100%', border: '1px solid #ccc', background: '#fff', overflow: 'auto' }}>
      <svg 
        viewBox={`0 0 ${totalWidth} ${totalHeight}`} 
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Main Panel - Bottom */}
        <rect 
          x={height + 20} 
          y={height + 20} 
          width={width} 
          height={length} 
          fill="none" 
          stroke="red" 
          strokeWidth="1" 
        />
        
        {/* Fold Lines (Dashed) */}
        <line 
          x1={height + 20} y1={height + 20} 
          x2={height + 20 + width} y2={height + 20} 
          stroke="blue" 
          strokeDasharray="5,5" 
        />
        
        {/* Label for the client */}
        <text x="25" y="20" fontSize="12" fill="#333">
          Dieline View (Red = Cut, Blue = Fold)
        </text>
      </svg>
    </div>
  );
};

export default Viewer2D;
