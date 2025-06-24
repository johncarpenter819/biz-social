// Returns true if color is light, false if dark
export function isLightColor(hex) {
  // Remove #
  const c = hex.substring(1);
  // Convert to RGB
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  // Calculate luminance (sRGB)
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 186; // threshold, adjust if needed
}

// Returns black or white depending on contrast
export function getContrastColor(hex) {
  return isLightColor(hex) ? "#000000" : "#ffffff";
}
