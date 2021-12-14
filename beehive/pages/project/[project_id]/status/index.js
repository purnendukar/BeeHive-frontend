import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { BiAddToQueue } from "react-icons/bi";
import { GoSearch } from "react-icons/go";

import { getProjectStatusList } from "../../../../apis/project_manager/projects";

import styles from "../../../../styles/Status.module.css";
import Sidebar from "../../../../components/sidebar";
import ProjectStatusCard from "../../../../components/project_status/card";

export default function Board() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [projectId, setProjectId] = useState(null);
  const [searchText, setSearchText] = useState();
  const [statusList, setStatusList] = useState();

  const { project_id } = router.query;

  useEffect(async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (projectId) {
        var [status, result] = await getProjectStatusList(token, projectId, {
          search: searchText ? searchText.target.value : "",
        });
        switch (status) {
          case 200:
            var project_status_list = [];
            result["results"].forEach((project_status) => {
              project_status_list.push(
                <ProjectStatusCard projectStatus={project_status} />
              );
            });
            setStatusList(project_status_list);
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
  }, [projectId, searchText]);

  if (project_id != projectId) {
    setProjectId(project_id);
  }

  return (
    <div className={styles.container}>
      <Sidebar></Sidebar>
      <div className={styles.status__plan}>
        <h1>Project Status</h1>
        <div className={styles.status_header}>
          <div className={styles.search_box}>
            <input
              type="search"
              name="search"
              className={styles.search}
              onChange={setSearchText}
            />
            <GoSearch size={20} className={styles.search_icon} />
          </div>
          <div className={styles.add_status}>
            <BiAddToQueue className={styles.add_status__icon} />
            <span className={styles.add_status__icon_info}>Add Status</span>
          </div>
        </div>
        <div className={styles.status_list}>{statusList}</div>
      </div>
    </div>
  );
}
