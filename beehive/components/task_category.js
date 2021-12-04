import { useEffect, useState } from "react";

import styles from "../styles/Board.module.css";
import TaskCard from "./task_card";
import { getTaskList } from "../apis/project_manager";

export default function TaskCategory({ projectId, taskStatus }) {
  const statusHeading = taskStatus["name"];

  const [taskList, setTaskList] = useState([]);

  useEffect(async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (projectId) {
        const [status, result] = await getTaskList(token, {
          sprint__project: projectId,
          status: taskStatus["id"],
        });
        switch (status) {
          case 200:
            var task_card_list = [];
            result["results"].forEach((task) => {
              task_card_list.push(<TaskCard task={task}></TaskCard>);
            });
            setTaskList(task_card_list);
            break;
          case 401:
            localStorage.removeItem("token");
            router.push("/login");
            break;
          default:
            console.log("Opp's Something went wrong.");
        }
      }
    }
  }, [projectId, taskStatus]);

  return (
    <div className={styles.task__category}>
      <div className={styles.task__status}>{statusHeading}</div>
      <div className={styles.task__list}>{taskList}</div>
      <a className={styles.task__add} href="#">
        + Add new task
      </a>
    </div>
  );
}
