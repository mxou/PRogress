import Navbar from "../components/Navbar";
import Header from "../components/Header";
import localforage from "localforage";
import { useState, useEffect } from "preact/hooks";
import "./styles/History.css";

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
      <ul className="history_container">
        {history.map((seance, idx) => (
          <li key={idx} className="history_item">
            <div className="history_thumbnail"></div>
            <div className="history_content">
              <p className="history_program_name">{seance.programName}</p>
              <p className="history_program_date"> {new Date(seance.date).toLocaleDateString("fr-FR")}</p>
              <p className="history_program_stats">
                {seance.exercises.filter((exo) => exo.done).length} exercices, {formatDuration(seance.duration)}
              </p>
            </div>
            {/* <div className="history_arrow">→</div> */}
          </li>
        ))}
      </ul>
      <Navbar />
    </main>
  );
}
