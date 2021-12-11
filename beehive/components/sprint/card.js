import { BiEdit } from "react-icons/bi";

import styles from "../../styles/Sprint.module.css";

export default function SprintCard({ sprint }) {
  return (
    <div className={styles.sprint_card}>
      <div className={styles.sprint_detail}>
        <div className={styles.sprint_heading}>Sprint {sprint["number"]}</div>
        <span className={styles.sprint_description}>
          {sprint["description"]}
        </span>
        <div className={styles.sprint_duration}>
          <strong>Duration:</strong> {sprint["start_date"]} to{" "}
          {sprint["end_date"]}
        </div>
      </div>
      <div className={styles.sprint_action}>
        <div className={styles.sprint_edit}>
          <BiEdit className={styles.sprint_edit__icon}></BiEdit>
          <span className={styles.sprint_edit__icon_info}>Edit Sprint</span>
        </div>
      </div>
    </div>
  );
}
