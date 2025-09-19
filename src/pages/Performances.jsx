import Navbar from "../components/Navbar";
import localforage from "localforage";
import styles from "./styles/Performances.module.css";

export default function Performances() {
  //   useEffect(() => {
  //     localforage.getItem("programs").then((data) => {
  //       if (data) setPrograms(data);
  //     });
  //   }, []);
  return (
    <main>
      <h1>Perfs</h1>
      <Navbar />
    </main>
  );
}
