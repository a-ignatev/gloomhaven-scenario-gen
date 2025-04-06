import background from "../assets/background.png";
import obstacle0 from "../assets/obstacles/obstacle0.png";
import obstacle1 from "../assets/obstacles/obstacle1.png";
import obstacle2 from "../assets/obstacles/obstacle2.png";
import obstacle3 from "../assets/obstacles/obstacle3.png";
import heroImg from "../assets/hero.png";
import trapImg from "../assets/trap.png";
import enemyImg from "../assets/14.png";

const obstacleImages = [obstacle0, obstacle1, obstacle2, obstacle3];

const WIDTH_ODD = 5;
const WIDTH_EVEN = 4;
const HEIGHT = 7;
const CELL_SIZE = 80;
const STROKE_WIDTH = 10;
const MAX_TRAP_COUNT = 3;

export type CellType = "empty" | "hero" | "enemy" | "obstacle" | "trap";

interface Cell {
  row: number;
  col: number;
  isEvenRow: boolean;
  type: CellType;
  variant?: number;
}

const getStrokeWidth = (type: CellType): number => {
  switch (type) {
    case "enemy":
      return STROKE_WIDTH * 2;
    case "hero":
    case "empty":
      return STROKE_WIDTH * 0.4;
    default:
      return STROKE_WIDTH;
  }
};

const generateHexGrid = (): Cell[] => {
  const cells: Cell[] = [];
  const allPositions: { row: number; col: number; isEvenRow: boolean }[] = [];

  for (let row = 0; row < HEIGHT; row++) {
    const isEvenRow = row % 2 === 0;
    const cols = isEvenRow ? WIDTH_EVEN : WIDTH_ODD;
    for (let col = 0; col < cols; col++) {
      allPositions.push({ row, col, isEvenRow });
    }
  }

  const shuffled = allPositions.sort(() => Math.random() - 0.5);
  const heroPos = shuffled[0];
  const enemyCount = Math.floor(Math.random() * 4) + 1;
  const enemyPositions = shuffled.slice(1, 1 + enemyCount);

  for (const pos of allPositions) {
    let type: CellType = "empty";
    let variant: number | undefined = undefined;

    if (
      pos.row === heroPos.row &&
      pos.col === heroPos.col &&
      pos.isEvenRow === heroPos.isEvenRow
    ) {
      type = "hero";
    } else if (
      enemyPositions.some(
        (e) =>
          e.row === pos.row &&
          e.col === pos.col &&
          e.isEvenRow === pos.isEvenRow
      )
    ) {
      type = "enemy";
    } else if (Math.random() < 0.1) {
      type = Math.random() < 0.5 ? "obstacle" : "trap";
      if (type === "trap") {
        const trapCount = cells.filter((cell) => cell.type === "trap").length;
        if (trapCount >= MAX_TRAP_COUNT) {
          type = "obstacle";
        }
      }
      if (type === "obstacle") {
        variant = Math.floor(Math.random() * 4); // 0 to 3
      }
    }

    cells.push({ ...pos, type, variant });
  }

  return cells;
};

export const Map = () => {
  const cells = generateHexGrid();

  const hexSize = CELL_SIZE / 2;
  const hexWidth = Math.sqrt(3) * hexSize;
  const hexHeight = 2 * hexSize;

  const mapWidth = hexWidth * WIDTH_ODD;
  const mapHeight = HEIGHT * (hexHeight * 0.75) + hexHeight / 4;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: mapWidth,
          height: mapHeight,
        }}
      >
        {cells.map(({ row, col, isEvenRow, type, variant }, index) => {
          const offsetX = isEvenRow ? hexWidth / 2 : 0;
          const x = col * hexWidth + offsetX;
          const y = row * (hexHeight * 0.8);

          const points = Array.from({ length: 6 }, (_, i) => {
            const angle_deg = 60 * i - 30;
            const angle_rad = (Math.PI / 180) * angle_deg;
            const px =
              hexSize +
              (hexSize - getStrokeWidth(type) / 2) * Math.cos(angle_rad);
            const py =
              hexSize +
              (hexSize - getStrokeWidth(type) / 2) * Math.sin(angle_rad);
            return `${px},${py}`;
          }).join(" ");

          const renderContent = () => {
            if (type === "obstacle" && variant !== undefined) {
              return (
                <image
                  href={obstacleImages[variant]}
                  x={hexSize * 0.1}
                  y={hexSize * 0.1}
                  width={hexSize * 2}
                  height={hexSize * 2}
                  preserveAspectRatio="xMidYMid meet"
                />
              );
            }
            if (type === "trap") {
              return (
                <image
                  href={trapImg}
                  x={hexSize * 0.1}
                  y={hexSize * 0.1}
                  width={hexSize * 2}
                  height={hexSize * 2}
                  preserveAspectRatio="xMidYMid meet"
                />
              );
            }
            if (type === "hero") {
              return (
                <image
                  href={heroImg}
                  x={hexSize * 0.37}
                  y={hexSize * 0.5}
                  width={hexSize * 1}
                  height={hexSize * 1}
                  opacity={0.5}
                  preserveAspectRatio="xMidYMid meet"
                />
              );
            }
            if (type === "enemy") {
              return (
                <g clipPath={`url(#clip-${index})`}>
                  <image
                    href={enemyImg}
                    preserveAspectRatio="xMidYMid meet"
                    width={hexSize * 2}
                  />
                </g>
              );
            }
            return null;
          };

          const stroke =
            type === "obstacle"
              ? "url(#green-cell)"
              : type === "enemy"
              ? "url(#enemy-cell)"
              : type === "trap"
              ? "url(#trap-cell)"
              : "url(#default-cell)";
          const fill =
            type === "obstacle" ? "url(#green-cell-fill)" : "transparent";

          return (
            <svg
              key={index}
              x={x}
              y={y}
              width={hexWidth + 7}
              height={hexHeight + 7}
              style={{
                position: "absolute",
                left: x - 4,
                top: y - 4,
              }}
            >
              <defs>
                <clipPath id={`clip-${index}`}>
                  <polygon points={points} />
                </clipPath>
                <linearGradient
                  id="default-cell"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffffff88" />
                  <stop offset="50%" stopColor="#00000000" />
                  <stop offset="100%" stopColor="#00000088" />
                </linearGradient>
                <linearGradient
                  id="green-cell"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6f8c59" />
                  <stop offset="50%" stopColor="#4e6143" />
                  <stop offset="100%" stopColor="#2d3626" />
                </linearGradient>
                <linearGradient
                  id="green-cell-fill"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6f8c5955" />
                  <stop offset="50%" stopColor="#4e614355" />
                  <stop offset="100%" stopColor="#2d362655" />
                </linearGradient>
                <linearGradient
                  id="enemy-cell"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffffffaa" />
                  <stop offset="50%" stopColor="#ffffff33" />
                  <stop offset="100%" stopColor="#ffffff33" />
                </linearGradient>
                <linearGradient
                  id="trap-cell"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff0000ee" />
                  <stop offset="50%" stopColor="#ff000055" />
                  <stop offset="100%" stopColor="#ff000055" />
                </linearGradient>
              </defs>
              <polygon
                points={points}
                fill={fill}
                stroke={stroke}
                strokeWidth={getStrokeWidth(type)}
              />
              {renderContent()}
            </svg>
          );
        })}
      </div>
    </div>
  );
};
