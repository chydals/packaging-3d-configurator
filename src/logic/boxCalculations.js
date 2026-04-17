// Basic logic for box dimensions
export const calculateDimensions = (l, w, h, thickness, mode) => {
  if (mode === "Outer") {
    return { length: l, width: w, height: h };
  }
  // Inner dimensions add thickness to the total
  return { length: l + (2 * thickness), width: w + (2 * thickness), height: h + (2 * thickness) };
};
