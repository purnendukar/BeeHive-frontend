import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { GoSearch } from "react-icons/go";
import { BiAddToQueue } from "react-icons/bi";

import styles from "../../styles/Board.module.css";
import Sidebar from "../../components/sidebar";
import TaskCategory from "../../components/board/task_category";

// Backend APIs
import {
  getProject,
  getProjectStatusList,
} from "../../apis/project_manager/projects";
import { getProjectMemberList } from "../../apis/project_manager/members";

const Boards = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [projectData, setProjectData] = useState(
    JSON.stringify({
      name: "",
      description: "",
    })
  );
  const [projectStatuses, setProjectStatus] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  var [projectId, setProjectId] = useState(null);
  var [searchText, setSearchText] = useState("");
  var [assigneeId, setAssigneeId] = useState("");

  const router = useRouter();
  const { project_id } = router.query;

  const searchTask = async (event) => {
    event.preventDefault();
    setSearchText(event.target.value);
  };

  const selectAssignee = (event) => {
    const assignee_id = event.target.value;
    setAssigneeId(assignee_id);
  };

  useEffect(async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (projectId) {
        // Get Project Details
        var [status, result] = await getProject(token, projectId);
        switch (status) {
          case 200:
            setProjectData(result);
            break;
          case 401:
            localStorage.removeItem("token");
            router.push("/login");
            break;
          default:
            console.log("Opp's Something went wrong.");
        }

        // Get Project Status List
        [status, result] = await getProjectStatusList(token, projectId);
        switch (status) {
          case 200:
            var task_categories = [];
            result["results"].forEach((taskStatus) => {
              task_categories.push(
                <TaskCategory
                  projectId={projectId}
                  taskStatus={taskStatus}
                  searchText={searchText}
                  assigneeId={assigneeId}
                ></TaskCategory>
              );
            });
            setProjectStatus(task_categories);
            break;
          case 401:
            localStorage.removeItem("token");
            router.push("/login");
            break;
          case 400:
            break;
          default:
            console.log("Opp's Something went wrong.");
        }

        // Get Project Memebrs List
        [status, result] = await getProjectMemberList(token, projectId);
        switch (status) {
          case 200:
            var project_memebers = [];
            result["results"].forEach((member) => {
              project_memebers.push(
                <option value={member["user"]["id"]}>
                  {member["user"]["first_name"]} {member["user"]["last_name"]}
                </option>
              );
            });
            setProjectMembers(project_memebers);
            break;
          case 401:
            localStorage.removeItem("token");
            router.push("/login");
            break;
          case 400:
            break;
          default:
            console.log("Opp's Something went wrong.");
        }
      }
    }
  }, [projectId, searchText, assigneeId]);

  if (project_id != projectId) {
    setProjectId(project_id);
  }

  return (
    <div className={styles.container}>
      <Sidebar></Sidebar>
      <div className={styles.board}>
        <h1>{projectData["name"]}</h1>
        <span>{projectData["description"]}</span>
        <div className={styles.task_board__header}>
          <div className={styles.search__box}>
            <input
              type="search"
              name="search"
              className={styles.search}
              onChange={searchTask}
            />
            <GoSearch size={20} className={styles.search__icon} />
          </div>
          <fieldset className={styles.assignee_filter}>
            <legend>Assignee</legend>
            <select onChange={selectAssignee}>
              <option value="">All</option>
              {projectMembers}
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
