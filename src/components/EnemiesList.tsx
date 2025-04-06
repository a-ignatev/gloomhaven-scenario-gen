import type { Enemy } from "../enemies";

export function EnemiesList({ chosenEnemies }: { chosenEnemies: Enemy[] }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff30",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "4px",
        }}
      >
        {chosenEnemies.map((enemy, index) => (
          <div
            key={index}
            style={{
              padding: "5px",
              borderRadius: "5px",
              width: "100%",
            }}
          >
            {index + 1}: {enemy.name}
          </div>
        ))}
      </div>
    </div>
  );
}
