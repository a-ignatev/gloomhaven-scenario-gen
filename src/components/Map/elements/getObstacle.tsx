import { genericObstacles, specialObstacles } from "../../../assets/assets";
import { HEX_SIZE } from "../Map";

export function getObstacle(variant: number) {
  return (
    <image
      href={
        variant < genericObstacles.length
          ? genericObstacles[variant]
          : specialObstacles[variant - genericObstacles.length]
      }
      x={HEX_SIZE * 0.1}
      y={HEX_SIZE * 0.1}
      width={HEX_SIZE * 1.7}
      height={HEX_SIZE * 1.7}
      preserveAspectRatio="xMidYMid meet"
      opacity={0.8}
    />
  );
}
