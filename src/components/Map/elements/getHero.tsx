import { heroImg } from "../../../assets/assets";
import { HEX_SIZE } from "../Map";

export function getHero() {
  return (
    <image
      href={heroImg}
      x={HEX_SIZE * 0.37}
      y={HEX_SIZE * 0.5}
      width={HEX_SIZE * 1}
      height={HEX_SIZE * 1}
      opacity={0.5}
      preserveAspectRatio="xMidYMid meet"
      style={{
        opacity: 0,
        animation: "fadeIn 1s ease forwards",
      }}
    />
  );
}
