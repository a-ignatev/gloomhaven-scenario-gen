import { useState } from "react";
import {
  generateHexGrid,
  MAP_SIZE_TO_HEIGHT,
} from "../../services/generateHexGrid";
import { background } from "../../assets/assets";
import type { CellType } from "../../types";
import { getHexPoints, getDefinitions } from "./svg-utils";
import { getObstacle } from "./elements/getObstacle";
import { getEnemy } from "./elements/getEnemy";
import { getTrap } from "./elements/getTrap";
import { getHero } from "./elements/getHero";
import { getDrawProperties, switchCellType } from "./utils";

export const WIDTH_ODD = 5;
export const WIDTH_EVEN = 4;
const CELL_SIZE = 80;
export const STROKE_WIDTH = 6;
export const HEX_SIZE = CELL_SIZE / 2;
export const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
export const HEX_HEIGHT = 2 * HEX_SIZE;

export const Map = ({
  showSetup,
  enemyCount,
  mapSize,
}: {
  showSetup: boolean;
  enemyCount: number;
  mapSize: string;
}) => {
  const [cells, setCells] = useState(generateHexGrid(enemyCount, mapSize));

  const mapWidth = HEX_WIDTH * WIDTH_ODD;
  const mapHeight =
    MAP_SIZE_TO_HEIGHT[mapSize] * (HEX_HEIGHT * 0.75) + HEX_HEIGHT / 4;

  const renderContent = (
    type: CellType,
    variant: number | undefined,
    index: number
  ) => {
    if (type === "obstacle" && variant !== undefined) {
      return getObstacle(variant);
    }
    if (type === "trap") {
      return getTrap();
    }
    if (type === "hero" && showSetup) {
      return getHero();
    }
    if (type === "enemy" && showSetup) {
      return getEnemy(index);
    }

    return null;
  };

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
          const offsetX = isEvenRow ? HEX_WIDTH / 2 : 0;
          const x = col * HEX_WIDTH + offsetX;
          const y = row * (HEX_HEIGHT * 0.8);
          const drawProps = getDrawProperties(type, showSetup);
          const points = getHexPoints(drawProps);

          return (
            <svg
              key={index}
              x={x}
              y={y}
              width={HEX_WIDTH + 7}
              height={HEX_HEIGHT + 7}
              style={{
                position: "absolute",
                left: x - 4,
                top: y - 4,
              }}
              onClick={() => switchCellType(setCells, showSetup, index, type)}
            >
              {getDefinitions(index, points)}
              <polygon
                points={points}
                fill={drawProps.fill}
                stroke={drawProps.stroke}
                strokeWidth={drawProps.strokeWidth}
              />
              {renderContent(type, variant, index)}
            </svg>
          );
        })}
      </div>
    </div>
  );
};
