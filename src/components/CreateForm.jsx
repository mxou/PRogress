import { useState } from "preact/hooks";
import localforage from "localforage";
import ExoItem from "./ExoItem";
// import "./styles/CreateForm.css";
import styles from "./styles/CreateForm.module.css";

export default function CreateForm({ workouts, setWorkouts }) {
  const [exoName, setExoName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorkout = { exoName, sets, reps, weight };
    setWorkouts([...workouts, newWorkout]);

    // Reset formulaire
    setExoName("");
    setSets("");
    setReps("");
    setWeight("");
  };

  // Supprimer exo
  const handleDelete = (exoToDelete) => {
    setWorkouts(workouts.filter((w) => w !== exoToDelete));
  };

  // Éditer exo
  const handleEdit = (exoToEdit) => {
    setExoName(exoToEdit.exoName);
    setSets(exoToEdit.sets);
    setReps(exoToEdit.reps);
    setWeight(exoToEdit.weight);

    handleDelete(exoToEdit);
  };

  return (
    <form className={styles.create_form_container} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom de l'exercice"
        className={styles.input_exo_name}
        required
        value={exoName}
        onInput={(e) => setExoName(e.target.value)}
      />
      <div className={styles.s_r_container}>
        <input type="number" placeholder="Séries" required value={sets} onInput={(e) => setSets(e.target.value)} />
        <input type="number" placeholder="Répétitions" required value={reps} onInput={(e) => setReps(e.target.value)} />
      </div>
      <div className={styles.submit_container}>
        <input type="number" placeholder="Poids" required value={weight} onInput={(e) => setWeight(e.target.value)} />
        <button type="submit">Ajouter</button>
      </div>

      <ul>
        {workouts.map((w, index) => (
          <li key={index}>
            <ExoItem key={index} exo={w} onDelete={handleDelete} onEdit={handleEdit} />
          </li>
        ))}
      </ul>
    </form>
  );
}
