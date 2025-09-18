import { Link } from "preact-router/match";
import "./styles/Header.css";

export default function Header({ HeaderTitle, Return }) {
  return (
    <header className="header_container">
      <h1>{HeaderTitle}</h1>

      {Return ? (
        <button className="header_back_button" onClick={() => window.history.back()}>
          &lt;-
        </button>
      ) : (
        <Link href="/createprogram">
          <button className="header_add_button">+</button>
        </Link>
      )}
    </header>
  );
}
