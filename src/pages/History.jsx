import Navbar from "../components/Navbar";
import Header from "../components/Header";
import localforage from "localforage";
import { useState, useEffect } from "preact/hooks";
import styles from "./styles/History.module.css";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    localforage.getItem("history").then((data) => {
      if (data) {
        setHistory(data);
        console.log(data); // ✅ valeur correcte
      }
    });
  }, []);

  const formatDuration = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec.toString().padStart(2, "0")}s`;
  };

  return (
    <main>
      <Header HeaderTitle={"Historique"} />
      <ul className={styles.history_container}>
        {history.map((seance, idx) => (
          <li key={idx} className={styles.history_item}>
            <div className={styles.history_thumbnail}></div>
            <div className={styles.history_content}>
              <p className={styles.history_program_name}>{seance.programName}</p>
              <p className={styles.history_program_date}>{new Date(seance.date).toLocaleDateString("fr-FR")}</p>
              <p className={styles.history_program_stats}>
                {seance.exercises.filter((exo) => exo.done).length} exercices, {formatDuration(seance.duration)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Navbar />
    </main>
  );
}
