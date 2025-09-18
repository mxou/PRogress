import "./styles/Session.css";
import Header from "../components/Header";
import { useState, useEffect } from "preact/hooks";
import localforage from "localforage";
import ExoItem from "../components/ExoItem";

export default function Session({ index }) {
  const [program, setProgram] = useState(null);

  useEffect(() => {
    localforage.getItem("programs").then((programs) => {
      if (programs && programs[index]) {
        setProgram(programs[index]);
      } else {
        // Si l'index est invalide, retour à Home
        route("/");
      }
    });
  }, [index]);

  if (!program) return <p>Chargement...</p>;

  return (
    <main>
      <Header HeaderTitle={program.name} Return={true} />
      <ul>
        {program.exercises.map((exo, i) => (
          <ExoItem key={i} exo={exo} />
        ))}
      </ul>
    </main>
  );
}
