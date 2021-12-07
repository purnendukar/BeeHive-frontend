import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { BiAddToQueue } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";

import { getSprintList } from "../../../../apis/project_manager/sprints";

import styles from "../../../../styles/Sprint.module.css";
import Sidebar from "../../../../components/sidebar";
import SprintCard from "../../../../components/sprint/card";

export default function Board() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [projectId, setProjectId] = useState(null);
  const [searchText, setSearchText] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [sprints, setSprints] = useState([]);

  const { project_id } = router.query;

  useEffect(async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (projectId) {
        const from_date = fromDate
          ? `${fromDate.getFullYear()}-${
              fromDate.getMonth() + 1
            }-${fromDate.getDate()}`
          : "";
        const to_date = toDate
          ? `${toDate.getFullYear()}-${
              toDate.getMonth() + 1
            }-${toDate.getDate()}`
          : "";

        // Get Sprints List
        var [status, result] = await getSprintList(token, projectId, {
          start_date__gte: from_date,
          end_date__gte: from_date,
          start_date__lte: to_date,
          end_date__lte: to_date,
          search: searchText ? searchText.target.value : "",
        });
        switch (status) {
          case 200:
            var sprint_list = [];
            result["results"].forEach((sprint) => {
              sprint_list.push(<SprintCard sprint={sprint}></SprintCard>);
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
      }
    }
  }, [fromDate, toDate, searchText, projectId]);

  if (project_id != projectId) {
    setProjectId(project_id);
  }

  return (
    <div className={styles.container}>
      <Sidebar></Sidebar>
      <div className={styles.sprint__plan}>
        <h1>Sprint Planning</h1>
        <div className={styles.sprint_header}>
          <div className={styles.search_box}>
            <input
              type="search"
              name="search"
              className={styles.search}
              onChange={setSearchText}
            />
            <GoSearch size={20} className={styles.search_icon} />
          </div>
          <div className={styles.duration}>
            <span>From </span>
            <DatePicker onChange={setFromDate} value={fromDate} />
            <span> To </span>
            <DatePicker onChange={setToDate} value={toDate} />
          </div>
          <div className={styles.add_sprint}>
            <BiAddToQueue className={styles.add_sprint__icon} />
            <span className={styles.add_sprint__icon_info}>Add Sprint</span>
          </div>
        </div>
        <div className={styles.sprint_list}>{sprints}</div>
      </div>
    </div>
  );
}
