import styles from "../../styles/Task.module.css";

export default function TaskRow({ task }) {
  return (
    <tr className={styles.task_row}>
      <td className={styles.task_row__id}>{task["task_id"]}</td>
      <td className={styles.task_row__title}>{task["title"]}</td>
      <td className={styles.task_row__priority}>{task["priority"]}</td>
      <td className={styles.task_row__status}>{task["status"]["name"]}</td>
      <td className={styles.task_row__sprint}>
        Sprint {task["sprint"]["number"]}
      </td>
      <td className={styles.task_row__assignee}>
        {task["assignee"]["first_name"]} {task["assignee"]["last_name"]}
      </td>
    </tr>
  );
}
