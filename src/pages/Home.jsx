import Header from "../components/Header";
import { useState, useEffect } from "preact/hooks";
import localforage from "localforage";
import { Smile, ChevronRight } from "lucide-preact";
import { route } from "preact-router";
import Navbar from "../components/Navbar";

import styles from "./styles/Home.module.css";

export default function Home() {
  const [programs, setPrograms] = useState([]);

  // Charger datas existantes render

  useEffect(() => {
    localforage.getItem("programs").then((data) => {
      if (data) setPrograms(data);
    });
  }, []);

  const handleClickProgram = (index) => {
    route(`/program/${index}`);
  };

  return (
    <main>
      <Header HeaderTitle={"Programmes"} Return={false} />

      <ul className={styles.program_main_container}>
        {programs.map((p, index) => (
          <li key={index} className={styles.programs_container} onClick={() => handleClickProgram(index)}>
            <Smile className={styles.program_icon} />
            <div className={styles.program_data_container}>
              <p className={styles.program_data_name}>{p.name}</p>
              <p className={styles.program_data_type}>{p.type}</p>
            </div>
            <ChevronRight className={styles.program_chevron} />
          </li>
        ))}
      </ul>
      <Navbar />
    </main>
  );
}
