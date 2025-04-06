import { useMemo, useState } from "react";
import { Map } from "./components/Map";
import { generateEnemyGroup, type ScenarioLevel } from "./enemies";
import { EnemiesList } from "./components/EnemiesList";
import { Actions } from "./components/Actions";

function App() {
  const [showSetup, setShowSetup] = useState(true);
  const [scenarioLevel, setScenarioLevel] = useState<ScenarioLevel>(2);
  const [mapSize, setMapSize] = useState("large");
  const [seed, setSeed] = useState(Math.random());

  const chosenEnemies = useMemo(
    () => generateEnemyGroup(scenarioLevel as ScenarioLevel),
    [seed, scenarioLevel]
  );

  return (
    <div>
      <Actions
        showSetup={showSetup}
        setShowSetup={setShowSetup}
        scenarioLevel={scenarioLevel}
        setScenarioLevel={setScenarioLevel}
        mapSize={mapSize}
        setMapSize={setMapSize}
        setSeed={setSeed}
      />
      <Map
        key={seed}
        showSetup={showSetup}
        enemyCount={chosenEnemies.length}
        mapSize={mapSize}
      />
      {showSetup && <EnemiesList chosenEnemies={chosenEnemies} />}
    </div>
  );
}

export default App;
