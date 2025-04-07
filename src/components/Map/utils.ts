import type { Dispatch, SetStateAction } from "react";
import { specialObstacles, genericObstacles } from "../../assets/assets";
import type { Cell, CellType } from "../../types";
import { STROKE_WIDTH } from "./Map";

export function getDrawProperties(
  type: CellType,
  showSetup: boolean
): { fill: string; stroke: string; strokeWidth: number } {
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

  const strokeWidth = ((): number => {
    switch (type) {
      case "enemy":
        return showSetup ? STROKE_WIDTH * 2 : STROKE_WIDTH * 0.4;
      case "hero":
      case "empty":
        return STROKE_WIDTH * 0.4;
      default:
        return STROKE_WIDTH;
    }
  })();

  const fill = type === "obstacle" ? "url(#green-cell-fill)" : "transparent";

  return { fill, stroke, strokeWidth };
}
export function switchCellType(
  setCells: Dispatch<SetStateAction<Cell[]>>,
  showSetup: boolean,
  index: number,
  type: string
) {
  return setCells((prev) =>
    prev.map((cell, i) =>
      showSetup && i === index && type !== "hero" && type !== "enemy"
        ? {
            ...cell,
            type:
              cell.type === "empty"
                ? "trap"
                : cell.type === "trap"
                ? "obstacle"
                : "empty",
            variant: Math.floor(
              Math.random() *
                (specialObstacles.length + genericObstacles.length)
            ),
          }
        : cell
    )
  );
}
