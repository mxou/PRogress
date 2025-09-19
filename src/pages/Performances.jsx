import Navbar from "../components/Navbar";
import localforage from "localforage";
import Header from "../components/Header";
import { useState } from "preact/hooks";

import styles from "./styles/Performances.module.css";

export default function Performances() {
  //   useEffect(() => {
  //     localforage.getItem("programs").then((data) => {
  //       if (data) setPrograms(data);
  //     });
  //   }, []);

  const [categ, setCateg] = useState(null);

  const handleClickCateg = (name) => {
    setCateg(name);
  };
  return (
    <main>
      <Header HeaderTitle={"Performances"} Return={true} />
      <div className={styles.select_container}>
        <label for="exo_select">Choisir un exercice</label>
        <select>
          <option id="exo_select" value="">
            Choisir un exercice
          </option>
          <option value="developpe_couche_barre">Développé couché barre</option>
          <option value="curl_pupitre">Curls puprite</option>
          <option value="tractions">Tractions</option>
        </select>
      </div>
      <div className={styles.exo_categ}>
        <p className={`${styles.categ} ${categ === "poids" ? styles.active : ""}`} onClick={() => handleClickCateg("poids")}>
          Poids
        </p>
        <p className={`${styles.categ} ${categ === "series" ? styles.active : ""}`} onClick={() => handleClickCateg("series")}>
          Séries
        </p>
        <p className={`${styles.categ} ${categ === "reps" ? styles.active : ""}`} onClick={() => handleClickCateg("reps")}>
          Répétitions
        </p>
      </div>
      <canvas></canvas>
      <Navbar />
    </main>
  );
}
