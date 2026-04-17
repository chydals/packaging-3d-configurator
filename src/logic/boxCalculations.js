/**
 * Calculates coordinates for a Mailer Box Dieline.
 * All units are in millimeters (mm).
 */

export const getMailerBoxDieline = (L, W, H, thickness, mode) => {
  // 1. Adjust for Dimension Mode
  // If user selects 'Inner', we add thickness to L, W, and H to get the outer cut lines
  let adjL = L;
  let adjW = W;
  let adjH = H;

  if (mode === "Inner") {
    adjL = L + 2 * thickness;
    adjW = W + 2 * thickness;
    adjH = H + 2 * thickness;
  }

  // 2. Define the Panels
  // A standard mailer box has: Front, Bottom, Back, Lid, and Flaps.
  return {
    panels: {
      bottom: { width: adjL, height: adjW },
      front:  { width: adjL, height: adjH },
      back:   { width: adjL, height: adjH },
      lid:    { width: adjL, height: adjW },
      dustFlaps: { width: adjH * 0.8, height: adjW } // Side flaps
    },
    
    // 3. Folding Coordinates (Simple simplified layout)
    // This provides the 'Y' positions where the cardboard should fold
    folds: {
      fold1: adjH,              // Top of Front panel
      fold2: adjH + adjW,       // Top of Bottom panel
      fold3: adjH + adjW + adjH,// Top of Back panel
      fold4: adjH + adjW + adjH + adjW // Top of Lid
    }
  };
};

/**
 * Logic for the 3D rotation limits (Open/Close)
 */
export const getFoldRotation = (isOpen) => {
  return isOpen ? 0 : Math.PI / 2; // 0 degrees vs 90 degrees in radians
};// Basic logic for box dimensions
export const calculateDimensions = (l, w, h, thickness, mode) => {
  if (mode === "Outer") {
    return { length: l, width: w, height: h };
  }
  // Inner dimensions add thickness to the total
  return { length: l + (2 * thickness), width: w + (2 * thickness), height: h + (2 * thickness) };
};
