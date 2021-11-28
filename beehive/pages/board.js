import { useState } from "react";
import { useRouter } from "next/router";

import { GoSearch } from "react-icons/go";
import { BiAddToQueue } from "react-icons/bi";

import styles from "../styles/Board.module.css";
import Sidebar from "../components/sidebar";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  var task_categories = [
    <div className={styles.task__category}>
      <div className={styles.task__status}>To Do</div>
      <div className={styles.task__list}>
        <div className={styles.task_card}>
          <div>
            <strong>Task 1</strong>
          </div>
          <span>description</span>
          <div>
            <strong>Assignee:</strong> Purnendu Kar
          </div>
        </div>
      </div>
      <a className={styles.task__add} href="#">
        + Add new task
      </a>
    </div>,

    <div className={styles.task__category}>
      <div className={styles.task__status}>In Progress</div>
      <div className={styles.task__list}>
        <div className={styles.task_card}>
          <div>
            <strong>Task 1</strong>
          </div>
          <span>description</span>
          <div>
            <strong>Assignee:</strong> Purnendu Kar
          </div>
        </div>
        <div className={styles.task_card}>
          <div>
            <strong>Task 1</strong>
          </div>
          <span>description</span>
          <div>
            <strong>Assignee:</strong> Purnendu Kar
          </div>
        </div>
      </div>
      <a className={styles.task__add} href="#">
        + Add new task
      </a>
    </div>,

    <div className={styles.task__category}>
      <div className={styles.task__status}>In Dev</div>
      <div className={styles.task__list}>
        <div className={styles.task_card}>
          <div>
            <strong>Task 1</strong>
          </div>
          <span>description</span>
          <div>
            <strong>Assignee:</strong> Purnendu Kar
          </div>
        </div>
      </div>
      <a className={styles.task__add} href="#">
        + Add new task
      </a>
    </div>,

    <div className={styles.task__category}>
      <div className={styles.task__status}>In QA</div>
      <div className={styles.task__list}>
        <div className={styles.task_card}>
          <div>
            <strong>Task 1</strong>
          </div>
          <span>description</span>
          <div>
            <strong>Assignee:</strong> Purnendu Kar
          </div>
        </div>
        <div className={styles.task_card}>
          <div>
            <strong>Task 1</strong>
          </div>
          <span>description</span>
          <div>
            <strong>Assignee:</strong> Purnendu Kar
          </div>
        </div>
        <div className={styles.task_card}>
          <div>
            <strong>Task 1</strong>
          </div>
          <span>description</span>
          <div>
            <strong>Assignee:</strong> Purnendu Kar
          </div>
        </div>
        <div className={styles.task_card}>
          <div>
            <strong>Task 1</strong>
          </div>
          <span>description</span>
          <div>
            <strong>Assignee:</strong> Purnendu Kar
          </div>
        </div>
      </div>
      <a className={styles.task__add} href="#">
        + Add new task
      </a>
    </div>,

    <div className={styles.task__category}>
      <div className={styles.task__status}>Completed</div>
      <div className={styles.task__list}></div>
      <a className={styles.task__add} href="#">
        + Add new task
      </a>
    </div>,
  ];

  return (
    <div className={styles.container}>
      <Sidebar></Sidebar>
      <div className={styles.board}>
        <h1>BeeHive Board</h1>
        <span>
          A beehive is an enclosed structure in which some honey bee species of
          the subgenus Apis live and raise their young. Though the word beehive
          is commonly used to describe the nest of any bee colony, scientific
          and professional literature distinguishes nest from hive.
        </span>
        <div className={styles.task_board__header}>
          <div className={styles.search__box}>
            <input type="search" name="search" className={styles.search} />
            <GoSearch size={20} className={styles.search__icon} />
          </div>
          <fieldset className={styles.assignee_filter}>
            <legend>Assignee</legend>
            <select>
              <option>All</option>
              <option>Purnendu Kar</option>
              <option>Member 1 with extra long name</option>
              <option>Member 2</option>
            </select>
          </fieldset>
          <div className={styles.add_status}>
            <BiAddToQueue className={styles.add_status__icon} />
            <span>Add Status</span>
          </div>
        </div>
        <div className={styles.task_board}>{task_categories}</div>
      </div>
    </div>
  );
}
