import type { ScenarioLevel } from "../types";

export function SettingsModal({
  scenarioLevel,
  setScenarioLevel,
  mapSize,
  setMapSize,
  setShowSettings,
  setSeed,
}: {
  scenarioLevel: ScenarioLevel;
  setScenarioLevel: (level: ScenarioLevel) => void;
  mapSize: string;
  setMapSize: (size: string) => void;
  setShowSettings: (show: boolean) => void;
  setSeed: (seed: number) => void;
}) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        backgroundColor: "#000000a0",
        zIndex: 100,
      }}
      onClick={() => setShowSettings(false)}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ffffff30",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label htmlFor="difficulty">Scenario Level:</label>
          <select
            id="difficulty"
            value={scenarioLevel}
            onChange={(e) =>
              setScenarioLevel(Number(e.target.value) as ScenarioLevel)
            }
          >
            <option value="1">1</option>
            <option value="2" selected>
              2
            </option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label htmlFor="mapSize">Size of Map:</label>
          <select value={mapSize} onChange={(e) => setMapSize(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large" selected>
              Large
            </option>
          </select>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              backgroundColor: "#ffffff90",
              color: "#111",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
            onClick={() => {
              setShowSettings(false);
              setSeed(Math.random());
            }}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
