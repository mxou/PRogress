import { useState } from "preact/hooks";
import { Router } from "preact-router";
import Home from "./pages/Home";
import CreateProgram from "./pages/CreateProgram";
import Session from "./pages/Session";
import "./app.css";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Home path="/" />
        <CreateProgram path="/createprogram" />
        <Session path="/program/:index" />
      </Router>
    </>
  );
}
