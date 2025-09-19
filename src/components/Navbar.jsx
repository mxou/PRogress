import styles from "./styles/Navbar.module.css";
import { Home, History, ChartNoAxesCombined } from "lucide-preact";
import { Link } from "preact-router/match";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/" activeClassName="active">
            <Home />
            <span>Accueil</span>
          </Link>
        </li>
        <li>
          <Link href="/history" activeClassName="active">
            <History />
            <span>Historique</span>
          </Link>
        </li>
        <li>
          <Link href="/performances" activeClassName="active">
            <ChartNoAxesCombined />
            <span>Performances</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
