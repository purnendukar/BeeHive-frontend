import { useEffect } from "react";
import { useRouter } from "next/router";
import { IoIosNotifications } from "react-icons/io";
import { GiBeehive } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { GoSettings } from "react-icons/go";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

import styles from "../styles/Sidebar.module.css";

export default function Sidebar({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

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
          <div className={styles.logout__button}>
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
        <fieldset className={styles.project} id="project">
          <legend>Project</legend>
          <select name="project" required>
            <option>Select Project</option>
            <option>BeeHive</option>
            <option>Project 1</option>
            <option>Project 2</option>
            <option>
              Project 2 Project 2 Project 2 Project 2 Project 2 Project 2{" "}
            </option>
            <option>Project 3</option>
            <option>Project 4</option>
            <option>Project 5</option>
          </select>
        </fieldset>
        <div className={styles.menu__item}>Board</div>
        <div className={styles.menu__item}>Sprint</div>
        <div className={styles.menu__item}>Task</div>
        <div className={styles.menu__item}>Members</div>
      </div>
    </div>
  );
}
