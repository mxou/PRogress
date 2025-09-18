import { Link } from "preact-router/match";
import "./styles/Header.css";
import { ArrowLeft, CirclePlus } from "lucide-preact";

export default function Header({ HeaderTitle, Return }) {
  return (
    <header className="header_container">
      <h1>{HeaderTitle}</h1>

      {Return ? (
        <button className="header_back_button" onClick={() => window.history.back()}>
          <ArrowLeft />
        </button>
      ) : (
        <Link href="/createprogram">
          <button className="header_add_button">
            <CirclePlus />
          </button>
        </Link>
      )}
    </header>
  );
}
