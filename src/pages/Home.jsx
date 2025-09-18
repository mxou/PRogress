import Header from "../components/Header";
import { useState } from "preact/hooks";
import localforage from "localforage";
import { Smile } from "lucide-preact";

export default function Home() {
  const [programs, setPrograms] = useState([]);

  // Charger datas existantes render
  useState(() => {
    localforage.getItem("programs").then((data) => {
      if (data) setPrograms(data);
    });
  }, []);
  return (
    <main>
      <Header HeaderTitle={"Programmes"} Return={false} />
      <h1>Home</h1>
      <ul>
        {programs.map((p, index) => (
          <li key={index}>
            <Smile />
            <div className="program_data_container">
              {p.name} - {p.type}
            </div>
            <p>L</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
