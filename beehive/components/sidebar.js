import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { IoIosNotifications } from "react-icons/io";
import { GiBeehive } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { GoSettings } from "react-icons/go";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

import styles from "../styles/Sidebar.module.css";
import { getProjectList } from "../apis/project_manager";

export default function Sidebar() {
  var [projectData, setProjectData] = useState([]);
  var [projectId, setProjectId] = useState(null);
  const router = useRouter();

  const logoutClick = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };
  const { project_id } = router.query;

  if (typeof project_id !== "undefined" && project_id != projectId) {
    setProjectId(project_id);
  }

  const selectProject = async (event) => {
    event.preventDefault();
    if (router.pathname.includes("[project_id]")) {
      router.push({
        pathname: router.pathname,
        query: {
          project_id: event.target.value,
        },
      });
    } else {
      router.push(router.pathname + `/${event.target.value}`);
    }
  };

  useEffect(async () => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.push("/login");
    }
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const [status, result] = await getProjectList(token);

      switch (status) {
        case 200:
          setProjectData(result["results"]);
          break;
        case 400:
          setErrorMessage("Invalid input");
          break;
        case 401:
          localStorage.removeItem("token");
          router.push("/login");
          break;
        default:
          setErrorMessage("Opp's Something went wrong.");
      }
    }
  }, []);

  var projects = [];
  projectData.forEach((project) => {
    projects.push(<option value={project["id"]}>{project["name"]}</option>);
  });

  const boradRoute = async () => {
    if (router.pathname.includes("[project_id]")) {
      router.push({
        pathname: "/board/[project_id]",
        query: {
          project_id: project_id,
        },
      });
    } else if (project_id) {
      router.push("/board" + `/${project_id}`);
    } else {
      router.push("/board");
    }
  };

  return (
    <div className={styles.sidebar__container}>
      <div className={styles.header}>
        <div>
          <div className={styles.home_button}>
            <GiBeehive className={styles.logo} />
            <span>Home</span>
          </div>
          <div className={styles.project_add_button}>
            <AiOutlineAppstoreAdd className={styles.project__add} />
            <span>Add Project</span>
          </div>
          <div className={styles.project_setting_button}>
            <GoSettings className={styles.project__setting} />
            <span>Project Settings</span>
          </div>
        </div>
        <div>
          <div className={styles.notification__button}>
            <IoIosNotifications className={styles.notication__icon} />
            <span>Notifications</span>
          </div>
          <div className={styles.logout__button} onClick={logoutClick}>
            <FiLogOut className={styles.logout__icon}></FiLogOut>
            <span>Logout</span>
          </div>
          <div className={styles.profile_button}>
            <div className={styles.profile}></div>
            <span>Profile</span>
          </div>
        </div>
      </div>
      <div className={styles.menu}>
        <fieldset className={styles.project}>
          <legend>Project</legend>
          <select
            name="project"
            id="project"
            onChange={selectProject}
            value={projectId}
          >
            {!projectId && <option value="">Select Project</option>}
            {projects}
          </select>
        </fieldset>
        <div className={styles.menu__item} onClick={boradRoute}>
          Board
        </div>
        <div className={styles.menu__item}>Sprint</div>
        <div className={styles.menu__item}>Task</div>
        <div className={styles.menu__item}>Status</div>
        <div className={styles.menu__item}>Members</div>
      </div>
    </div>
  );
}
