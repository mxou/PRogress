import styles from "./styles/Session.module.css";
import Header from "../components/Header";
import { useState, useEffect } from "preact/hooks";
import localforage from "localforage";
import { route } from "preact-router";

export default function Session({ index }) {
  const [program, setProgram] = useState(null);
  const [expanded, setExpanded] = useState(null); // exo ouvert
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // Charger le programme
  useEffect(() => {
    localforage.getItem("programs").then((programs) => {
      if (programs && programs[index]) {
        setProgram(programs[index]);
      } else {
        route("/");
      }
    });
  }, [index]);

  // Timer
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleExo = (idx) => {
    setExpanded(expanded === idx ? null : idx);
  };

  const handleUpdateExo = async (idx, newData) => {
    const updatedProgram = { ...program };
    updatedProgram.exercises[idx] = {
      ...updatedProgram.exercises[idx],
      ...newData,
    };
    setProgram(updatedProgram);

    // Sauvegarde
    const programs = await localforage.getItem("programs");
    programs[index] = updatedProgram;
    await localforage.setItem("programs", programs);
  };

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now());
  };

  const handleFinish = async () => {
    setIsRunning(false);

    const endTime = Date.now();
    const duration = Math.floor((endTime - startTime) / 1000); // en secondes
    const date = new Date().toISOString();

    const sessionData = {
      programName: program.name,
      date,
      duration,
      exercises: program.exercises,
    };

    // Sauvegarder dans l'historique
    let history = (await localforage.getItem("history")) || [];
    history.push(sessionData);
    await localforage.setItem("history", history);

    // Retour à l'accueil
    route("/");
  };

  if (!program) return <p>Chargement...</p>;

  return (
    <main>
      <Header HeaderTitle={program.name} Return={true} />

      <div className={styles.session_timer}>
        {isRunning ? (
          <p>
            ⏱ {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
          </p>
        ) : (
          <p>Prêt à démarrer ta séance ?</p>
        )}
      </div>

      <ul className={styles.session_main_container}>
        {program.exercises.map((exo, idx) => (
          <li key={idx} className={styles.session_exo_container}>
            <div className={styles.session_exo_datas_container}>
              <p className={styles.session_exo_name}>{exo.exoName}</p>
              <div className={styles.session_exo_datas}>
                <p className={styles.session_exo_sets}>
                  {exo.sets}x{exo.reps}
                </p>
                <p className={styles.session_exo_weight}> - {exo.weight}Kg</p>
              </div>
              <button className={styles.session_edit_button} onClick={() => toggleExo(idx)}>
                {expanded === idx ? "Fermer" : "Modifier"}
              </button>
            </div>

            {expanded === idx && (
              <div className={styles.session_exo_edit}>
                <input
                  type="number"
                  className={styles.session_edit_sets_input}
                  placeholder="Séries"
                  value={exo.sets}
                  onInput={(e) => handleUpdateExo(idx, { sets: e.target.value })}
                />
                <input
                  type="number"
                  className={styles.session_edit_reps_input}
                  placeholder="Répétitions"
                  value={exo.reps}
                  onInput={(e) => handleUpdateExo(idx, { reps: e.target.value })}
                />
                <input
                  type="number"
                  className={styles.session_edit_weight_input}
                  placeholder="Poids"
                  value={exo.weight}
                  onInput={(e) => handleUpdateExo(idx, { weight: e.target.value })}
                />
                <label>
                  <input type="checkbox" onChange={(e) => handleUpdateExo(idx, { done: e.target.checked })} checked={exo.done || false} />
                  Terminé
                </label>
              </div>
            )}
          </li>
        ))}
      </ul>

      {!isRunning ? (
        <button className={styles.session_start_button} onClick={handleStart}>
          Démarrer
        </button>
      ) : (
        <button className={styles.session_finish_button} onClick={handleFinish}>
          Finir la séance
        </button>
      )}
    </main>
  );
}
