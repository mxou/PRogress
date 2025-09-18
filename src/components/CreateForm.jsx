import { useState } from "react";
import localforage from "localforage";
import "./styles/CreateForm.css";

export default function CreateForm() {
  const [exoName, setExoName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [workouts, setWorkouts] = useState([]);

  // Charger datas existantes render
  useState(() => {
    localforage.getItem("workouts").then((data) => {
      if (data) setWorkouts(data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWorkout = { exoName, sets, reps, weight };
    const updatedWorkout = [...workouts, newWorkout];

    // Save localforage
    await localforage.setItem("workouts", updatedWorkout);
    setWorkouts(updatedWorkout);

    // Reset formulaire
    setExoName("");
    setSets("");
    setReps("");
    setWeight("");
  };

  return (
    <form className="create_form_container" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nom de l'exercice" className="input_exo_name" required value={exoName} onInput={(e) => setExoName(e.target.value)} />
      <div className="s_r_container">
        <input type="number" placeholder="Séries" required value={sets} onInput={(e) => setSets(e.target.value)} />
        <input type="number" placeholder="Répétitions" required value={reps} onInput={(e) => setReps(e.target.value)} />
      </div>
      <div className="submit_container">
        <input type="number" placeholder="Poids" required value={weight} onInput={(e) => setWeight(e.target.value)} />
        <button type="submit">Ajouter</button>
      </div>

      <ul>
        {workouts.map((w, index) => (
          <li key={index}>
            {w.exoName} — {w.sets}x{w.reps} — {w.weight} kg
          </li>
        ))}
      </ul>
    </form>
  );
}
