import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { BiAddToQueue } from "react-icons/bi";
import { GoSearch } from "react-icons/go";

import { getSprintList } from "../../../../apis/project_manager/sprints";
import { getProjectMemberList } from "../../../../apis/project_manager/members";
import { getTaskList } from "../../../../apis/project_manager/tasks";

import styles from "../../../../styles/Task.module.css";
import Sidebar from "../../../../components/sidebar";
import TaskRow from "../../../../components/task/row";

export default function Board() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [projectId, setProjectId] = useState(null);
  const [projectMembers, setProjectMembers] = useState([]);
  const [assigneeId, setAssignee] = useState("");
  const [searchText, setSearchText] = useState();
  const [sprints, setSprints] = useState([]);
  const [sprint, setSprint] = useState(null);
  const [tasks, setTasks] = useState([]);

  const { project_id } = router.query;

  useEffect(async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (projectId) {
        // Get Sprints List
        var [status, result] = await getSprintList(token, projectId, {
          is_complete: false,
        });
        switch (status) {
          case 200:
            var sprint_list = [];
            result["results"].forEach((sprint_obj) => {
              sprint_list.push(
                <option value={sprint_obj["id"]}>
                  Sprint {sprint_obj["number"]}
                </option>
              );
            });
            setSprints(sprint_list);
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
  }, [projectId]);

  useEffect(async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (projectId) {
        // Get Task List
        var [status, result] = await getTaskList(token, {
          project: projectId,
          assignee: assigneeId,
          sprint: sprint,
          search: searchText,
        });
        switch (status) {
          case 200:
            var task_list = Array();
            result["results"].forEach((task) => {
              task_list.push(<TaskRow task={task}></TaskRow>);
            });
            setTasks(task_list);
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
  }, [projectId, sprint, assigneeId, searchText]);

  if (project_id != projectId) {
    setProjectId(project_id);
  }

  return (
    <div className={styles.container}>
      <Sidebar></Sidebar>
      <div className={styles.task__plan}>
        <h1>Task Planning</h1>
        <div className={styles.task_header}>
          <div className={styles.search_box}>
            <input
              type="search"
              name="search"
              className={styles.search}
              onChange={setSearchText}
            />
            <GoSearch size={20} className={styles.search_icon} />
          </div>
          <fieldset className={styles.assignee_filter}>
            <legend>Assignee</legend>
            <select onChange={setAssignee}>
              <option value="">All</option>
              {projectMembers}
            </select>
          </fieldset>
          <fieldset className={styles.assignee_filter}>
            <legend>Sprint</legend>
            <select onChange={setSprint}>
              <option value="">All</option>
              {sprints}
            </select>
          </fieldset>
          <div className={styles.add_task}>
            <BiAddToQueue className={styles.add_task__icon} />
            <span className={styles.add_task__icon_info}>Add Task</span>
          </div>
        </div>
        <table>
          <tr className={styles.task_table__header}>
            <th>Task Id</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Sprint</th>
            <th>Assignee</th>
          </tr>
          {tasks}
        </table>
      </div>
    </div>
  );
}
