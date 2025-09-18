import { h } from "preact";
import "./styles/ExoItem.css";

export default function ExoItem({ exo, onDelete, onEdit }) {
  return (
    <li>
      <div className="exo_container">
        <div className="exo_datas_container">
          <p className="exo_name">{exo.exoName}</p>
          <div className="exo_datas">
            <p className="exo_sets">
              {exo.sets}x{exo.reps}
            </p>
            <p className="exo_weight"> - {exo.weight}Kg</p>
          </div>
        </div>
        <div className="exo_buttons_container">
          <button className="exo_delete_button" onClick={() => onDelete && onDelete(exo)}>
            x
          </button>
          <button className="exo_edit_button" onClick={() => onEdit && onEdit(exo)}>
            ...
          </button>
        </div>
      </div>
    </li>
  );
}
