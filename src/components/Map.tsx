import background from "../assets/background.png";
import obstacle0 from "../assets/obstacles/obstacle0.png";
import obstacle1 from "../assets/obstacles/obstacle1.png";
import obstacle2 from "../assets/obstacles/obstacle2.png";
import obstacle3 from "../assets/obstacles/obstacle3.png";
import obstacle4 from "../assets/obstacles/obstacle4.png";
import obstacle5 from "../assets/obstacles/obstacle5.png";
import obstacle7 from "../assets/obstacles/obstacle7.png";

import heroImg from "../assets/hero.png";
import trapImg from "../assets/trap.png";
import enemyImg from "../assets/14.png";
import { useState } from "react";

const obstacleImages = [
  obstacle0,
  obstacle1,
  obstacle2,
  obstacle3,
  obstacle4,
  obstacle5,
  obstacle7,
];

const WIDTH_ODD = 5;
const WIDTH_EVEN = 4;
// const HEIGHT = 7;
const CELL_SIZE = 80;
const STROKE_WIDTH = 10;
// const MAX_TRAP_COUNT = 3;

const MAP_SIZE_TO_HEIGHT: Record<string, number> = {
  small: 5,
  medium: 6,
  large: 7,
};

const MAP_SIZE_TO_TRAP_COUNT: Record<string, number> = {
  small: 1,
  medium: 2,
  large: 3,
};

const MAP_SIZE_TO_OBSTACLE_PROBABILITY: Record<string, number> = {
  small: 0.1,
  medium: 0.2,
  large: 0.3,
};

export type CellType = "empty" | "hero" | "enemy" | "obstacle" | "trap";

interface Cell {
  row: number;
  col: number;
  isEvenRow: boolean;
  type: CellType;
  variant?: number;
}

const getStrokeWidth = (type: CellType, showSetup: boolean): number => {
  switch (type) {
    case "enemy":
      return showSetup ? STROKE_WIDTH * 2 : STROKE_WIDTH * 0.4;
    case "hero":
    case "empty":
      return STROKE_WIDTH * 0.4;
    default:
      return STROKE_WIDTH;
  }
};

function getDrawProperties(
  type: CellType,
  showSetup: boolean
): { fill: string; stroke: string } {
  const stroke = (() => {
    switch (type) {
      case "obstacle":
        return "url(#green-cell)";
      case "enemy":
        return showSetup ? "url(#enemy-cell)" : "url(#default-cell)";
      case "trap":
        return "url(#trap-cell)";
      default:
        return "url(#default-cell)";
    }
  })();

  const fill = type === "obstacle" ? "url(#green-cell-fill)" : "transparent";

  return { fill, stroke };
}

const generateHexGrid = (enemyCount: number, mapSize: string): Cell[] => {
  const cells: Cell[] = [];
  const allPositions: { row: number; col: number; isEvenRow: boolean }[] = [];

  for (let row = 0; row < MAP_SIZE_TO_HEIGHT[mapSize]; row++) {
    const isEvenRow = row % 2 === 0;
    const cols = isEvenRow ? WIDTH_EVEN : WIDTH_ODD;
    for (let col = 0; col < cols; col++) {
      allPositions.push({ row, col, isEvenRow });
    }
  }

  const shuffled = allPositions.sort(() => Math.random() - 0.5);
  const heroPos = shuffled[0];

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
    } else if (Math.random() < MAP_SIZE_TO_OBSTACLE_PROBABILITY[mapSize]) {
      type = Math.random() < 0.5 ? "obstacle" : "trap";
      if (type === "trap") {
        const trapCount = cells.filter((cell) => cell.type === "trap").length;
        if (trapCount >= MAP_SIZE_TO_TRAP_COUNT[mapSize]) {
          type = "obstacle";
        }
      }
      if (type === "obstacle") {
        variant = Math.floor(Math.random() * (obstacleImages.length - 1)); // 0 to 3
      }
    }

    cells.push({ ...pos, type, variant });
  }

  return cells;
};

export const Map = ({
  showSetup,
  enemyCount,
  mapSize,
}: {
  showSetup: boolean;
  enemyCount: number;
  mapSize: string;
}) => {
  const [cells] = useState(generateHexGrid(enemyCount, mapSize));

  const hexSize = CELL_SIZE / 2;
  const hexWidth = Math.sqrt(3) * hexSize;
  const hexHeight = 2 * hexSize;

  const mapWidth = hexWidth * WIDTH_ODD;
  const mapHeight =
    MAP_SIZE_TO_HEIGHT[mapSize] * (hexHeight * 0.75) + hexHeight / 4;

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
              (hexSize - getStrokeWidth(type, showSetup) / 2) *
                Math.cos(angle_rad);
            const py =
              hexSize +
              (hexSize - getStrokeWidth(type, showSetup) / 2) *
                Math.sin(angle_rad);
            return `${px},${py}`;
          }).join(" ");

          const renderContent = () => {
            if (type === "obstacle" && variant !== undefined) {
              return (
                <image
                  href={obstacleImages[variant]}
                  x={hexSize * 0.1}
                  y={hexSize * 0.1}
                  width={hexSize * 1.7}
                  height={hexSize * 1.7}
                  preserveAspectRatio="xMidYMid meet"
                  opacity={0.8}
                />
              );
            }
            if (type === "trap") {
              return (
                <image
                  href={trapImg}
                  x={hexSize * 0.2}
                  y={hexSize * 0.2}
                  width={hexSize * 1.6}
                  height={hexSize * 1.6}
                  opacity={0.8}
                  preserveAspectRatio="xMidYMid meet"
                />
              );
            }
            if (type === "hero" && showSetup) {
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
            if (type === "enemy" && showSetup) {
              return (
                <g clipPath={`url(#clip-${index})`}>
                  <image
                    href={enemyImg}
                    preserveAspectRatio="xMidYMid meet"
                    opacity={0.8}
                    width={hexSize * 2}
                  />
                </g>
              );
            }
            return null;
          };

          const { fill, stroke } = getDrawProperties(type, showSetup);

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
                strokeWidth={getStrokeWidth(type, showSetup)}
              />
              {renderContent()}
            </svg>
          );
        })}
      </div>
    </div>
  );
};
