import Header from "../components/Header";
import { useState } from "preact/hooks";
import localforage from "localforage";
import { Smile, ChevronRight } from "lucide-preact";
import "./styles/Home.css";

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
      <ul className="program_main_container">
        {programs.map((p, index) => (
          <li key={index} className="programs_container">
            <Smile className="program_icon" />
            <div className="program_data_container">
              <p className="program_data_name">{p.name}</p>
              <p className="program_data_type">{p.type}</p>
            </div>
            <ChevronRight className="program_chevron" />
          </li>
        ))}
      </ul>
    </main>
  );
}
