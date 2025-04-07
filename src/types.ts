export type ScenarioLevel = 1 | 2 | 3 | 4 | 5;

export type Enemy = {
  name: string;
  hp: number;
  def: number;
  ret: number;
  flies: boolean;
  boss?: boolean;
};

export interface Cell {
  row: number;
  col: number;
  isEvenRow: boolean;
  type: CellType;
  variant?: number;
}

export type CellType = "empty" | "hero" | "enemy" | "obstacle" | "trap";
