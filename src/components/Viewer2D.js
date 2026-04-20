const Viewer2D = ({ boxData, template }) => {
  const { length: L, width: W, height: H } = boxData.dimensions;
  const strokeWidth = 1;

  return (
    <div style={{ width: '100%', height: '450px', background: '#ffffff', border: '1px solid #d1d1d1', overflow: 'hidden' }}>
      <svg viewBox={`0 0 ${W * 2 + H * 2 + 100} ${L * 2 + H * 2 + 100}`} style={{ width: '100%', height: '100%' }}>
        <g transform="translate(50, 50)">
          {/* Main Body - Blue lines for Folds, Red for Cuts */}
          <rect x={H} y={L} width={W} height={H} fill="none" stroke="#2ecc71" strokeDasharray="5,5" /> {/* Back */}
          <rect x={H} y={L + H} width={W} height={L} fill="none" stroke="#2ecc71" strokeDasharray="5,5" /> {/* Bottom */}
          
          {/* Outer Cut Lines */}
          <path d={`M ${H} 0 L ${H+W} 0 L ${H+W} ${L} L ${H+W+H} ${L} L ${H+W+H} ${L+H} L ${H} ${L+H} Z`} fill="none" stroke="#e74c3c" strokeWidth={2} />
          
          {/* Side Flaps */}
          <rect x={0} y={L+H} width={H} height={L} fill="#f9f9f9" stroke="#e74c3c" />
          <rect x={H+W} y={L+H} width={H} height={L} fill="#f9f9f9" stroke="#e74c3c" />
        </g>
      </svg>
    </div>
  );
};
