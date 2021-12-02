import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { GoSearch } from "react-icons/go";
import { BiAddToQueue } from "react-icons/bi";

import styles from "../../styles/Board.module.css";
import Sidebar from "../../components/sidebar";
import TaskCategory from "../../components/task_category";
import { getProject, getProjectStatusList } from "../../apis/project_manager";

const Boards = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [projectData, setProjectData] = useState(
    JSON.stringify({
      name: "",
      description: "",
    })
  );
  const [projectStatuses, setProjectStatus] = useState([]);
  var [projectId, setProjectId] = useState(null);

  const router = useRouter();
  const { project_id } = router.query;

  useEffect(async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (projectId) {
        var [status, result] = await getProject(token, projectId);
        switch (status) {
          case 200:
            setProjectData(result);
            break;
          default:
            console.log("Opp's Something went wrong.");
        }
        [status, result] = await getProjectStatusList(token, projectId);
        switch (status) {
          case 200:
            var task_categories = [];
            result["results"].forEach((taskStatus) => {
              task_categories.push(
                <TaskCategory
                  projectId={projectId}
                  taskStatus={taskStatus}
                ></TaskCategory>
              );
            });
            setProjectStatus(task_categories);
            break;
          case 400:
            break;
          default:
            console.log("Opp's Something went wrong.");
        }
      }
    }
  }, [projectId]);

  if (project_id != projectId) {
    setProjectId(project_id);
  }

  // var task_categories = [
  //   <div className={styles.task__category}>
  //     <div className={styles.task__status}>To Do</div>
  //     <div className={styles.task__list}>
  //       <div className={styles.task_card}>
  //         <div>
  //           <strong>Task 1</strong>
  //         </div>
  //         <span>description</span>
  //         <div>
  //           <strong>Assignee:</strong> Purnendu Kar
  //         </div>
  //       </div>
  //     </div>
  //     <a className={styles.task__add} href="#">
  //       + Add new task
  //     </a>
  //   </div>,

  //   <div className={styles.task__category}>
  //     <div className={styles.task__status}>In Progress</div>
  //     <div className={styles.task__list}>
  //       <div className={styles.task_card}>
  //         <div>
  //           <strong>Task 1</strong>
  //         </div>
  //         <span>description</span>
  //         <div>
  //           <strong>Assignee:</strong> Purnendu Kar
  //         </div>
  //       </div>
  //       <div className={styles.task_card}>
  //         <div>
  //           <strong>Task 1</strong>
  //         </div>
  //         <span>description</span>
  //         <div>
  //           <strong>Assignee:</strong> Purnendu Kar
  //         </div>
  //       </div>
  //     </div>
  //     <a className={styles.task__add} href="#">
  //       + Add new task
  //     </a>
  //   </div>,

  // <div className={styles.task__category}>
  //   <div className={styles.task__status}>In Dev</div>
  //   <div className={styles.task__list}>
  //     <div className={styles.task_card}>
  //       <div>
  //         <strong>Task 1</strong>
  //       </div>
  //       <span>description</span>
  //       <div>
  //         <strong>Assignee:</strong> Purnendu Kar
  //       </div>
  //     </div>
  //   </div>
  //   <a className={styles.task__add} href="#">
  //     + Add new task
  //   </a>
  // </div>,

  //   <div className={styles.task__category}>
  //     <div className={styles.task__status}>In QA</div>
  //     <div className={styles.task__list}>
  //       <div className={styles.task_card}>
  //         <div>
  //           <strong>Task 1</strong>
  //         </div>
  //         <span>description</span>
  //         <div>
  //           <strong>Assignee:</strong> Purnendu Kar
  //         </div>
  //       </div>
  //       <div className={styles.task_card}>
  //         <div>
  //           <strong>Task 1</strong>
  //         </div>
  //         <span>description</span>
  //         <div>
  //           <strong>Assignee:</strong> Purnendu Kar
  //         </div>
  //       </div>
  //       <div className={styles.task_card}>
  //         <div>
  //           <strong>Task 1</strong>
  //         </div>
  //         <span>description</span>
  //         <div>
  //           <strong>Assignee:</strong> Purnendu Kar
  //         </div>
  //       </div>
  //       <div className={styles.task_card}>
  //         <div>
  //           <strong>Task 1</strong>
  //         </div>
  //         <span>description</span>
  //         <div>
  //           <strong>Assignee:</strong> Purnendu Kar
  //         </div>
  //       </div>
  //     </div>
  //     <a className={styles.task__add} href="#">
  //       + Add new task
  //     </a>
  //   </div>,

  //   <div className={styles.task__category}>
  //     <div className={styles.task__status}>Completed</div>
  //     <div className={styles.task__list}></div>
  //     <a className={styles.task__add} href="#">
  //       + Add new task
  //     </a>
  //   </div>,
  // ];

  return (
    <div className={styles.container}>
      <Sidebar></Sidebar>
      <div className={styles.board}>
        <h1>{projectData["name"]}</h1>
        <span>{projectData["description"]}</span>
        <div className={styles.task_board__header}>
          <div className={styles.search__box}>
            <input type="search" name="search" className={styles.search} />
            <GoSearch size={20} className={styles.search__icon} />
          </div>
          <fieldset className={styles.assignee_filter}>
            <legend>Assignee</legend>
            <select>
              <option>All</option>
            </select>
          </fieldset>
          <div className={styles.add_status}>
            <BiAddToQueue className={styles.add_status__icon} />
            <span>Add Status</span>
          </div>
        </div>
        <div className={styles.task_board}>{projectStatuses}</div>
      </div>
    </div>
  );
};

export default Boards;
