export const generateDXF = (dimensions) => {
  const { length: L, width: W, height: H } = dimensions;

  let dxf = `0\nSECTION\n2\nENTITIES\n`;

  // Helper to add a line to DXF
  const addLine = (x1, y1, x2, y2, layer = "0") => {
    return `0\nLINE\n8\n${layer}\n10\n${x1}\n20\n${y1}\n11\n${x2}\n21\n${y2}\n`;
  };

  // --- TRIM LAYER (Layer: CUT) ---
  // Main Outer Perimeter
  dxf += addLine(0, 0, 0, -L, "CUT");
  dxf += addLine(0, -L, W, -L, "CUT");
  dxf += addLine(W, -L, W, 0, "CUT");
  dxf += addLine(W, 0, W + H, 0, "CUT");
  dxf += addLine(W + H, 0, W + H, H + L, "CUT");
  dxf += addLine(W + H, H + L, W, H + L, "CUT");
  dxf += addLine(W, H + L, W, H + L + H, "CUT");
  dxf += addLine(W, H + L + H, 0, H + L + H, "CUT");
  dxf += addLine(0, H + L + H, 0, H + L, "CUT");
  dxf += addLine(0, H + L, -H, H + L, "CUT");
  dxf += addLine(-H, H + L, -H, 0, "CUT");
  dxf += addLine(-H, 0, 0, 0, "CUT");

  // --- CREASE LAYER (Layer: FOLD) ---
  dxf += addLine(0, 0, W, 0, "FOLD");
  dxf += addLine(0, H, W, H, "FOLD");
  dxf += addLine(0, H + L, W, H + L, "FOLD");
  dxf += addLine(0, 0, 0, H + L, "FOLD");
  dxf += addLine(W, 0, W, H + L, "FOLD");

  dxf += `0\nENDSEC\n0\nEOF`;
  return dxf;
};
