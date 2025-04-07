import { useState, type Dispatch, type SetStateAction } from "react";
import { SettingsModal } from "./SettingsModal";
import type { ScenarioLevel } from "../types";

export function Actions({
  showSetup,
  setShowSetup,
  setSeed,
  scenarioLevel,
  setScenarioLevel,
  mapSize,
  setMapSize,
}: {
  showSetup: boolean;
  setShowSetup: Dispatch<SetStateAction<boolean>>;
  setSeed: Dispatch<SetStateAction<number>>;
  scenarioLevel: ScenarioLevel;
  setScenarioLevel: Dispatch<SetStateAction<ScenarioLevel>>;
  mapSize: string;
  setMapSize: Dispatch<SetStateAction<string>>;
}) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
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
        <SettingsModal
          scenarioLevel={scenarioLevel}
          setScenarioLevel={setScenarioLevel}
          mapSize={mapSize}
          setMapSize={setMapSize}
          setShowSettings={setShowSettings}
          setSeed={setSeed}
        />
      )}
    </>
  );
}
