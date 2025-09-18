import { useState } from "preact/hooks";
import { Router } from "preact-router";
import Home from "./pages/Home";
import CreateProgram from "./pages/CreateProgram";
import "./app.css";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Home path="/" />
        <CreateProgram path="/createprogram" />
      </Router>
    </>
  );
}
