import { useEffect, useState } from "react";

import styles from "../styles/Board.module.css";
import TaskCard from "./task_card";
import { getTaskList } from "../apis/project_manager";

export default function TaskCategory({ projectId, taskStatus }) {
  console.log(taskStatus);
  const statusHeading = taskStatus["name"];

  useEffect(async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (projectId) {
        const [status, result] = await getTaskList(token, projectId);
        switch (status) {
          case 200:
            setProjectData(result);
            break;
          default:
            console.log("Opp's Something went wrong.");
        }
      }
    }
  });

  return (
    <div className={styles.task__category}>
      <div className={styles.task__status}>{statusHeading}</div>
      <div className={styles.task__list}>
        <TaskCard></TaskCard>
      </div>
      <a className={styles.task__add} href="#">
        + Add new task
      </a>
    </div>
  );
}
