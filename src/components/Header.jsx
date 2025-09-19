import { Link } from "preact-router/match";
import styles from "./styles/Header.module.css";
import { ArrowLeft, CirclePlus } from "lucide-preact";

export default function Header({ HeaderTitle, Return }) {
  return (
    <header className={styles.header_container}>
      <h1>{HeaderTitle}</h1>

      {Return ? (
        <button className={styles.header_back_button} onClick={() => window.history.back()}>
          <ArrowLeft />
        </button>
      ) : (
        <Link href="/createprogram">
          <button className={styles.header_add_button}>
            <CirclePlus />
          </button>
        </Link>
      )}
    </header>
  );
}
