import Header from "../components/Header";
import CreateForm from "../components/CreateForm";
import { useState } from "preact/hooks";
import localforage from "localforage";
import "./styles/CreateProgram.css";

export default function CreateProgram() {
  const [programName, setProgramName] = useState("");
  const [programType, setProgramType] = useState("");

  const [workouts, setWorkouts] = useState([]);

  const handleCreateProgram = async () => {
    if (!programName && !programType) return alert("Donne un nom à ton programme");
    if (workouts.length === 0) return alert("Ajoute au moins un exercice");

    const program = {
      name: programName,
      type: programType,
      date: new Date().toISOString(),
      exercises: workouts,
    };

    // Sauvegarde programme dans localForage
    const existingPrograms = (await localforage.getItem("programs")) || [];
    await localforage.setItem("programs", [...existingPrograms, program]);

    // Reset
    setProgramName("");
    setProgramType("");
    setWorkouts([]);
    alert("Programme créé ✅");
  };

  return (
    <main>
      <Header HeaderTitle={"Créer un programme"} Return={true} />
      <div style={{ margin: "1rem 0" }}>
        <input className="data_program_input" type="text" placeholder="Nom du programme" value={programName} onInput={(e) => setProgramName(e.target.value)} />
        <input className="data_program_input" type="text" placeholder="Type de programme" value={programType} onInput={(e) => setProgramType(e.target.value)} />
      </div>
      <CreateForm workouts={workouts} setWorkouts={setWorkouts} />
      <button type="button" onClick={handleCreateProgram} className="create_program_button">
        Créer
      </button>
    </main>
  );
}
