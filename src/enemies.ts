export type Enemy = {
  name: string;
  hp: number;
  def: number;
  ret: number;
  flies: boolean;
  boss?: boolean;
};

const enemies: Enemy[] = [
  { name: "Flame Demon", hp: 12, def: 1, ret: 2, flies: true },
  { name: "Frost Demon", hp: 14, def: 2, ret: 1, flies: false },
  { name: "Earth Demon", hp: 18, def: 0, ret: 0, flies: false },
  { name: "Wind Demon", hp: 8, def: 3, ret: 0, flies: true },
  { name: "Horror Toad", hp: 8, def: 3, ret: 0, flies: false },
  { name: "King Button", hp: 6, def: 3, ret: 0, flies: true, boss: true },
  { name: "Venomous Centipede", hp: 7, def: 0, ret: 0, flies: false },
  { name: "Sewer Rat", hp: 16, def: 0, ret: 0, flies: false },
  {
    name: "Tattered Construct",
    hp: 16,
    def: 1,
    ret: 0,
    flies: false,
    boss: true,
  },
  {
    name: "Stuffed Construct",
    hp: 12,
    def: 3,
    ret: 0,
    flies: false,
    boss: true,
  },
  { name: "Harrowing Infestation", hp: 9, def: 0, ret: 1, flies: false },
  { name: "Rending Beetle", hp: 12, def: 2, ret: 0, flies: false },
  { name: "Arena Sorcerer", hp: 11, def: 0, ret: 1, flies: false },
  { name: "Goring Beetle", hp: 10, def: 3, ret: 1, flies: false },
  { name: "Bandit Guard", hp: 8, def: 1, ret: 0, flies: false },
  { name: "Demon Prince", hp: 18, def: 1, ret: 0, flies: true, boss: true },
  { name: "Mounted Prince", hp: 18, def: 2, ret: 0, flies: false, boss: true },
  { name: "Spitting Moth", hp: 8, def: 0, ret: 0, flies: true },
  { name: "Mouse", hp: 9, def: 0, ret: 1, flies: false },
  { name: "Bandit Archer", hp: 7, def: 0, ret: 0, flies: false },
];

export type ScenarioLevel = 1 | 2 | 3 | 4 | 5;

export const generateEnemyGroup = (level: ScenarioLevel) => {
  const presets = {
    1: { countRange: [2, 4], total: 20, min: 0 }, // easy: often multiple weak units
    2: { countRange: [3, 4], total: 32, min: 7 }, // normal: up to mid-tier units
    3: { countRange: [3, 4], total: 40, min: 10 }, // hard: mix of mid and strong
    4: { countRange: [2, 4], total: 52, min: 12 }, // elite: multiple strong units
    5: { countRange: [1, 3], total: 65, min: 18 }, // boss: strong/boss-level unit(s)
  } as const;

  const preset = presets[level];
  const candidates = enemies.filter((e) => getEnemyDifficulty(e) >= preset.min);
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  const count =
    Math.floor(
      Math.random() * (preset.countRange[1] - preset.countRange[0] + 1)
    ) + preset.countRange[0];

  const result = [];
  let total = 0;
  for (const enemy of shuffled) {
    const score = getEnemyDifficulty(enemy);
    if (result.length < count && total + score <= preset.total) {
      result.push(enemy);
      total += score;
    }
  }
  return result;
};

function getEnemyDifficulty(enemy: Enemy) {
  let score = 0;
  score += enemy.hp;
  score += enemy.def * 2;
  score += enemy.ret * 3;
  if (enemy.flies) score += 4;
  if (enemy.boss) score += 8;
  return score;
}
