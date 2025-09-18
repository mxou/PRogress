import { useState } from "preact/hooks";
import { Router } from "preact-router";
import Home from "./pages/Home";
import CreateProgram from "./pages/CreateProgram";
import Session from "./pages/Session";
import History from "./pages/History";
import Performances from "./pages/Performances";
import "./app.css";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Home path="/" />
        <CreateProgram path="/createprogram" />
        <History path="/history" />
        <Performances path="/performances" />
        <Session path="/program/:index" />
      </Router>
    </>
  );
}
