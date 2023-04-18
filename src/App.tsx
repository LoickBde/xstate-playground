import { useState } from "react";
import { useMachine } from "@xstate/react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { promiseMachine } from "./machines/promiseMachine";
import { clickMachine } from "./machines/clickMachine";
import { Todos } from "./components/Todos";

function App() {
  const [statePromise, sendPromise] = useMachine(promiseMachine);
  const [stateClick, sendClick] = useMachine(clickMachine);

  return (
    <div className="App">
      {statePromise.matches("pending") && <p>Loading...</p>}
      {statePromise.matches("rejected") && <p>Promise Rejected</p>}
      {statePromise.matches("resolved") && <p>Promise Resolved</p>}
      <button onClick={() => sendPromise("RESOLVE")}>Resolve</button>
      <button onClick={() => sendPromise("REJECT")}>Reject</button>
      <hr />
      <p>{JSON.stringify(stateClick.value)}</p>
      <button onClick={() => sendClick("PRESS")}>Press button</button>
      <hr />
      <Todos />
    </div>
  );
}

export default App;
