import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { GoSearch } from "react-icons/go";
import { BiAddToQueue } from "react-icons/bi";

import styles from "../../styles/Board.module.css";
import Sidebar from "../../components/sidebar";
import { getProject } from "../../apis/project_manager";

export default function Board() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Sidebar></Sidebar>
    </div>
  );
}
