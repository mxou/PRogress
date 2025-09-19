import Navbar from "../components/Navbar";
import localforage from "localforage";
import Header from "../components/Header";
import { useState, useEffect, useRef } from "preact/hooks";
import { Chart, registerables } from "chart.js";

import styles from "./styles/Performances.module.css";

Chart.register(...registerables);

export default function Performances() {
  const [history, setHistory] = useState([]);
  const [exoSelected, setExoSelected] = useState("");
  const [categ, setCateg] = useState("reps");
  const [exoOptions, setExoOptions] = useState([]); // liste d’exos uniques
  const chartRef = useRef(null); // référence au canvas
  const chartInstance = useRef(null); // instance du chart

  // Charger l’historique
  useEffect(() => {
    localforage.getItem("history").then((data) => {
      if (data) {
        setHistory(data);

        // extraire tous les exos et enlever les doublons
        const allExos = data.flatMap((s) => s.exercises.map((exo) => exo.exoName));
        const uniqueExos = [...new Set(allExos)];
        setExoOptions(uniqueExos);
      }
    });
  }, []);

  // Mettre à jour le graphique quand exo/catégorie changent
  useEffect(() => {
    if (!exoSelected || history.length === 0 || !chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    // extraire toutes les perfs de l'exo choisi
    const perfs = history.flatMap((s) =>
      s.exercises
        .filter((exo) => exo.exoName === exoSelected && exo.done)
        .map((exo) => ({
          date: new Date(s.date).toLocaleDateString("fr-FR"),
          value: categ === "reps" ? exo.reps : categ === "series" ? exo.sets : exo.weight,
        }))
    );

    // détruire l'ancien chart si nécessaire
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // créer un nouveau chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: perfs.map((p) => p.date),
        datasets: [
          {
            label: `${exoSelected} (${categ})`,
            data: perfs.map((p) => p.value),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            tension: 0.3,
          },
        ],
      },
    });

    // cleanup au démontage
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [exoSelected, categ, history]);

  return (
    <main>
      <Header HeaderTitle={"Performances"} Return={true} />

      <div className={styles.select_container}>
        <label htmlFor="exo_select">Choisir un exercice</label>
        <select id="exo_select" onChange={(e) => setExoSelected(e.target.value)} value={exoSelected}>
          <option value="">Choisir un exercice</option>
          {exoOptions.map((exo, idx) => (
            <option key={idx} value={exo}>
              {exo}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.exo_categ}>
        <p className={`${styles.categ} ${categ === "poids" ? styles.active : ""}`} onClick={() => setCateg("poids")}>
          Poids
        </p>
        <p className={`${styles.categ} ${categ === "series" ? styles.active : ""}`} onClick={() => setCateg("series")}>
          Séries
        </p>
        <p className={`${styles.categ} ${categ === "reps" ? styles.active : ""}`} onClick={() => setCateg("reps")}>
          Répétitions
        </p>
      </div>

      <canvas ref={chartRef}></canvas>

      <Navbar />
    </main>
  );
}
