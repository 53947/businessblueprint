/**
 * Convert a raw Digital IQ score (0-140) to display score (70-140).
 * 70 = floor (you showed up). 140 = perfect.
 * Nobody ever sees a number below 70.
 */
export function getDisplayScore(rawScore: number): number {
  return 70 + Math.round(rawScore / 2);
}

/**
 * Get a descriptive label for a display score (70-140 scale).
 * NO LETTER GRADES. These are encouraging descriptions.
 */
export function getScoreLabel(displayScore: number): string {
  if (displayScore >= 130) return "Exceptional";
  if (displayScore >= 115) return "Strong";
  if (displayScore >= 100) return "Building Momentum";
  if (displayScore >= 85) return "Room to Grow";
  return "Getting Started";
}

/**
 * Get color for a display score (70-140 scale).
 */
export function getScoreColor(displayScore: number): string {
  if (displayScore >= 130) return "#008060";
  if (displayScore >= 115) return "#1844A6";
  if (displayScore >= 100) return "#064A6C";
  if (displayScore >= 85) return "#E9B307";
  return "#F97316";
}
