import { HEX_SIZE, HEX_WIDTH, HEX_HEIGHT } from "../Map";

export const HexIcon = ({ text, color }: { text: string; color: string }) => {
  return (
    <>
      <polygon
        points={Array.from({ length: 6 }, (_, i) => {
          const angle = (Math.PI / 180) * (60 * i - 30);
          const r = HEX_SIZE * 0.3;
          const cx = HEX_WIDTH - r * 2 - 5;
          const cy = HEX_HEIGHT - r * 1.5 - 5;
          const px = cx + r * Math.cos(angle);
          const py = cy + r * Math.sin(angle);
          return `${px},${py}`;
        }).join(" ")}
        fill={color}
        stroke="white"
        strokeWidth="1"
      />
      <text
        x={HEX_WIDTH - HEX_SIZE * 0.3 - 17}
        y={HEX_HEIGHT - HEX_SIZE * 0.3 - 10}
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
      >
        {text}
      </text>
    </>
  );
};
