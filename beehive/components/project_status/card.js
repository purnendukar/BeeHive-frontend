import { BiEdit } from "react-icons/bi";

import styles from "../../styles/Status.module.css";

export default function ProjectStatusCard({ projectStatus }) {
  return (
    <div className={styles.status_card}>
      <div className={styles.status_detail}>
        <div className={styles.status_heading}>{projectStatus["title"]}</div>
        <span className={styles.status_description}>
          {projectStatus["description"]}
        </span>
      </div>
      <div className={styles.status_action}>
        <div className={styles.status_edit}>
          <BiEdit className={styles.status_edit__icon}></BiEdit>
          <span className={styles.status_edit__icon_info}>Edit Status</span>
        </div>
      </div>
    </div>
  );
}
