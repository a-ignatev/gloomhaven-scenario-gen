import { useMemo, useState } from "react";
import { Map } from "./components/Map";
import { generateEnemyGroup } from "./enemies";

function App() {
  const [showSetup, setShowSetup] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [scenarioLevel, setScenarioLevel] = useState("2");
  const [mapSize, setMapSize] = useState("large");
  const [seed, setSeed] = useState(Math.random());

  const chosenEnemies = useMemo(
    () => generateEnemyGroup(Number(scenarioLevel) as 1 | 2 | 3 | 4 | 5),
    [seed, scenarioLevel]
  );

  return (
    <div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          padding: "14px 0",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: "4px",
        }}
      >
        <button
          style={{ backgroundColor: "#ffffff30", color: "#111" }}
          onClick={() => setShowSetup((show) => !show)}
        >
          Setup {showSetup ? "ON" : "OFF"}
        </button>
        <button
          style={{ backgroundColor: "#ffffff30", color: "#111" }}
          onClick={() => setShowSettings((show) => !show)}
        >
          Settings
        </button>
        <button
          style={{
            backgroundColor: "#ffffff30",
            color: "#111",
          }}
          onClick={() => setSeed(Math.random())}
        >
          New
        </button>
      </div>
      {showSettings && (
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
              alignItems: "center",
              gap: "10px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <label htmlFor="difficulty">Scenario Level:</label>
              <select
                id="difficulty"
                value={scenarioLevel}
                onChange={(e) => setScenarioLevel(e.target.value)}
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
              <select
                value={mapSize}
                onChange={(e) => setMapSize(e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large" selected>
                  Large
                </option>
              </select>
            </div>
            <div style={{ marginTop: "20px" }}>
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
      )}
      <Map
        key={seed}
        showSetup={showSetup}
        enemyCount={chosenEnemies.length}
        mapSize={mapSize}
      />
      {showSetup && (
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
      )}
    </div>
  );
}

export default App;
