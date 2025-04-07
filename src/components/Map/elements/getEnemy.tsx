import { enemyImg } from "../../../assets/assets";
import { HexIcon } from "./HexIcon";
import { HEX_SIZE } from "../Map";

const ENEMY_COLORS = ["", "#00aa00", "#0000aa", "#aa0000", "#BF40BF"];

export function getEnemy(index: number) {
  return (
    <g
      clipPath={`url(#clip-${index})`}
      style={{
        opacity: 0,
        animation: "fadeIn 1s ease forwards",
      }}
    >
      <image
        href={enemyImg}
        preserveAspectRatio="xMidYMid meet"
        opacity={0.7}
        width={HEX_SIZE * 2}
      />
      <HexIcon text={String(index)} color={ENEMY_COLORS[index]} />
    </g>
  );
}
