import { trapImg } from "../../../assets/assets";
import { HexIcon } from "./HexIcon";
import { HEX_SIZE } from "../Map";

export function getTrap() {
  return (
    <>
      <image
        href={trapImg}
        x={HEX_SIZE * 0.2}
        y={HEX_SIZE * 0.2}
        width={HEX_SIZE * 1.6}
        height={HEX_SIZE * 1.6}
        opacity={0.8}
        preserveAspectRatio="xMidYMid meet"
      />
      <HexIcon text="1" color={"red"} />
    </>
  );
}
