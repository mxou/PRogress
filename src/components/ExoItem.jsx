import { h } from "preact";
import styles from "./styles/ExoItem.module.css";

export default function ExoItem({ exo, onDelete, onEdit }) {
  return (
    <li>
      <div className={styles.exo_container}>
        <div className={styles.exo_datas_container}>
          <p className={styles.exo_name}>{exo.exoName}</p>
          <div className={styles.exo_datas}>
            <p className={styles.exo_sets}>
              {exo.sets}x{exo.reps}
            </p>
            <p className={styles.exo_weight}> - {exo.weight}Kg</p>
          </div>
        </div>
        <div className={styles.exo_buttons_container}>
          <button className={styles.exo_delete_button} onClick={() => onDelete && onDelete(exo)}>
            x
          </button>
          <button className={styles.exo_edit_button} onClick={() => onEdit && onEdit(exo)}>
            ...
          </button>
        </div>
      </div>
    </li>
  );
}
