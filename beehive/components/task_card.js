import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Board.module.css";
import { getProjectList } from "../apis/project_manager";

export default function TaskCard({ task }) {
  const taskTitle = task["title"];
  const taskAssignee = `${task["assignee"]["first_name"]} ${task["assignee"]["last_name"]}`;
  return (
    <div className={styles.task_card}>
      <div>
        <strong>{taskTitle}</strong>
      </div>
      <div>
        <strong>Assignee:</strong> {taskAssignee}
      </div>
    </div>
  );
}
