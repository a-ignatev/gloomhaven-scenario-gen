import { genericObstacles, specialObstacles } from "../assets/assets";
import { WIDTH_EVEN, WIDTH_ODD } from "../components/Map/Map";
import { type CellType } from "../types";
import type { Cell } from "../types";

export const MAP_SIZE_TO_HEIGHT: Record<string, number> = {
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

export const generateHexGrid = (
  enemyCount: number,
  mapSize: string
): Cell[] => {
  const cells: Cell[] = [];
  const allPositions: { row: number; col: number; isEvenRow: boolean }[] = [];
  const alreadyUsedSpecialObstacles: number[] = [];

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
        const isSpecial =
          Math.random() < MAP_SIZE_TO_OBSTACLE_PROBABILITY[mapSize];
        if (
          isSpecial &&
          alreadyUsedSpecialObstacles.length < specialObstacles.length
        ) {
          variant = Math.floor(Math.random() * specialObstacles.length);
          while (alreadyUsedSpecialObstacles.includes(variant)) {
            variant = Math.floor(Math.random() * specialObstacles.length);
          }
          alreadyUsedSpecialObstacles.push(variant);
          variant = variant + genericObstacles.length;
        } else {
          variant = Math.floor(Math.random() * genericObstacles.length);
        }
      }
    }

    cells.push({ ...pos, type, variant });
  }

  return cells;
};
