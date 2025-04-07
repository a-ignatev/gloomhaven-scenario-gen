import { HEX_SIZE } from "./Map";

export function getHexPoints(drawProps: {
  fill: string;
  stroke: string;
  strokeWidth: number;
}) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle_deg = 60 * i - 30;
    const angle_rad = (Math.PI / 180) * angle_deg;
    const px =
      HEX_SIZE + (HEX_SIZE - drawProps.strokeWidth / 2) * Math.cos(angle_rad);
    const py =
      HEX_SIZE + (HEX_SIZE - drawProps.strokeWidth / 2) * Math.sin(angle_rad);
    return `${px},${py}`;
  }).join(" ");
}

export function getCellGradient(
  id: string,
  color1: string,
  color2: string,
  color3: string
) {
  return (
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor={color1} />
      <stop offset="50%" stopColor={color2} />
      <stop offset="100%" stopColor={color3} />
    </linearGradient>
  );
}

export function getDefinitions(index: number, points: string) {
  return (
    <defs>
      <clipPath id={`clip-${index}`}>
        <polygon points={points} />
      </clipPath>
      {getCellGradient("default-cell", "#ffffff88", "#00000000", "#00000088")}
      {getCellGradient("green-cell", "#6f8c59", "#4e6143", "#2d3626")}
      {getCellGradient(
        "green-cell-fill",
        "#6f8c5955",
        "#4e614355",
        "#2d362655"
      )}
      {getCellGradient("enemy-cell", "#ffffffaa", "#ffffff33", "#ffffff33")}
      {getCellGradient("trap-cell", "#ff0000ee", "#ff000055", "#ff000055")}
    </defs>
  );
}
